import { User } from "../../../models/user.js";
import createHttpError from "http-errors";

const chooseRoleController = async (req, res) => {
  const rawRole = req.body.role;
  console.log("Received role:", rawRole);
  if (!rawRole) {
    throw createHttpError.BadRequest("Role is required.");
  }
  const role = rawRole.trim().toLowerCase();
  if (!["customer", "vendor"].includes(role)) {
    throw createHttpError.BadRequest(
      "Invalid role specified. Choose either 'customer' or 'provider'."
    );
  }

  const userId = req.user._id;
  if (!userId) {
    throw createHttpError.Unauthorized("User not authenticated.");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError.NotFound("User not found.");
  }
  user.role = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  await user.save();
  res.status(200).json({
    message: `Role set to ${user.role} successfully.`,
    user:{
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};
export default chooseRoleController;
