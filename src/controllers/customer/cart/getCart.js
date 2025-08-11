import { getCartHelper } from "../../../utils/helpers/getCart.js";
const getCartController = async (req, res) => {
  const cart = await getCartHelper(req.user.id);
  res.status(200).json({ message: "Cart got successfully", cart });
};
export default getCartController;
