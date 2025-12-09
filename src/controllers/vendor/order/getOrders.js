import Order from "../../../models/order";
const getVendorOrders = async (req, res) => {
  const vendorId = req.user.vendorId;

  const orders = await Order.find({ vendor: vendorId })
    .populate("customer", "name") 
    .populate("items.dish", "name") 
    .sort({ pickupTime: 1 });

  res.json({ success: true, orders });
};
export default getVendorOrders;