// payRoute.js
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const payForProduct = async (req, res) => {
  const { product, customerInfo, paymentMethodId } = req.body;

  try {
    // Create a Stripe Customer
    const customer = await stripe.customers.create({
      email: customerInfo.email,
      name: customerInfo.name,
      address: customerInfo.address,
      shipping: {
        name: customerInfo.name,
        address: customerInfo.address,
      },
    });

    // Create and confirm a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price * 100, // in cents
      currency: "usd",
      customer: customer.id,
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // avoids redirect errors in Postman
      },
    });

    res.status(200).json({
      message: "Payment successful",
      payment: paymentIntent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default payForProduct;
