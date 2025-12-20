import Order from "../../models/order.js";
import createHttpError from "http-errors";
import validateOrder from "../joi/customer/order/validateOrder.js";

const saveOrderToDB = async (orderData) => {
  try {
    const { error } = validateOrder(orderData);
    if (error) throw createHttpError.BadRequest(error.details[0].message);

    const newOrder = new Order({
      ...orderData,
    });
    console.log(newOrder, "new order to be saved");

    await newOrder.save();
    return newOrder;
  } catch (error) {
    // Log the internal error and throw a generic server error
    console.error("Error saving order to database:", error);
    throw createHttpError.InternalServerError(
      "Failed to save the order due to a database error."
    );
  }
};

export default saveOrderToDB;
