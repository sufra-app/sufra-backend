import Stripe from "stripe";
import createHttpError from "http-errors";
import { Customer } from "../../../models/customer.js";
import Cart from "../../../models/cart.js";
import Dish from "../../../models/dish.js";
import placeOrder from "../../../utils/helpers/placeOrder.js";
import clearCartHelper from "../../../utils/helpers/clearCart.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const payForProduct = async (req, res) => {
  const userId = req.user.id;
  const { paymentMethodId, pickupSlotId } = req.body;

  if (!paymentMethodId || !pickupSlotId) {
    throw createHttpError.BadRequest(
      "Payment method and pickup slot are required."
    );
  }
  const customer = await Customer.findOne({ user: userId });
  if (!customer) {
    console.log("heyy");
    throw createHttpError.NotFound("Customer not found");
  }
  // Fetch the cart and populate dish details to get current prices
  const cart = await Cart.findOne({ customer: customer._id }).populate({
    path: "dishes.dish",
    model: Dish,
    select: "name price vendor",
  });

  if (!cart || cart.dishes.length === 0) {
    throw createHttpError.BadRequest("Cannot checkout an empty cart.");
  }

  // Fetch customer profile for Stripe address details
  const customerProfile = await Customer.findOne({ user: userId }).populate(
    "user",
    "email name"
  );
  if (!customerProfile || !customerProfile.address) {
    throw createHttpError.NotFound(
      "Customer profile or address details missing."
    );
  }
  console.log(cart);
  // Calculate Total Amount Securely

  let totalAmountCents = 0;
  const orderItems = [];
  const vendorId = cart.vendor.toString();

  for (const cartItem of cart.dishes) {
    // Loop through cart items
    const dish = cartItem.dish; // Populated Dish document

    if (!dish || dish.vendor.toString() !== vendorId) {
      throw createHttpError.Conflict(
        "Cart contains invalid items or vendor mismatch."
      );
    }

    // Calculation for cents (round to avoid floating point precision issues)
    totalAmountCents += Math.round(dish.price * cartItem.quantity * 100);

    // Prepare items for the new Order document
    orderItems.push({
      dish: dish._id,
      quantity: cartItem.quantity,
      priceAtOrder: dish.price,
      dishName: dish.name,
    });
  }

  if (totalAmountCents <= 0) {
    throw createHttpError.BadRequest(
      "Total order amount must be greater than zero."
    );
  }

  //Prepare Stripe Customer and Payment Intent
  try {
    // Stripe requires address details broken down (using your new structured customer schema)
    const stripeCustomer = await stripe.customers.create({
      email: customerProfile.user.email,
      name: customerProfile.user.name,
      address: {
        line1: customerProfile.address.street,
        city: customerProfile.address.city,
        state: customerProfile.address.state,
        postal_code: customerProfile.address.zipCode || undefined,
        country: customerProfile.address.country || "Palestine",
      },
      payment_method: paymentMethodId,
    });

    // Create and Confirm PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmountCents),
      currency: "usd",
      customer: stripeCustomer.id,
      payment_method: paymentMethodId,
      confirm: true,
      metadata: {
        user_id: userId,
        vendor_id: vendorId,
        pickup_slot_id: pickupSlotId,
      },
      automatic_payment_methods: {
        enabled: true,
        // --- ADD THIS LINE TO FIX THE ERROR ---
        allow_redirects: "never",
      },
    });

    // Finalize Order on Successful Payment
    if (paymentIntent.status === "succeeded") {
      const orderData = {
        customer: customer._id,
        vendor: vendorId,
        totalPrice: totalAmountCents / 100,
        pickupSlot: pickupSlotId,
        paymentStatus: "succeeded",
        orderStatus: "Pending",
        paymentIntentId: "TEMP_ID_SENT_FROM_CLIENT",
        paymentMethodId: paymentMethodId,
        dishes: orderItems,
        paymentMethod: "stripe",
      };

      const newOrder = await placeOrder(orderData);

      // 3. Clear the Cart
      await clearCartHelper(userId);

      return res.status(201).json({
        message: "Order placed successfully! Payment confirmed.",
        order: newOrder,
      });
    } else {
      console.warn("Payment required action or failed:", paymentIntent.status);
      throw createHttpError.PaymentRequired(
        `Payment failed or requires action: ${paymentIntent.status}`
      );
    }
  } catch (error) {
    console.error("Payment Processing Error:", error.message);
    throw createHttpError.InternalServerError(
      `Payment processing failed. Please check card details. Error: ${
        error.raw?.message || error.message
      }`
    );
  }
};

export default payForProduct;
