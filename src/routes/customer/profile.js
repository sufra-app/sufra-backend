import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import checkRole from "../../middlewares/checkRole.js";
import createCustomerProfileController from "../../controllers/customer/profile/createCustomerProfile.js";
import updateCustomerPhotoController from "../../controllers/customer/profile/updateCustomerPhoto.js";
import updateCustomerProfileController from "../../controllers/customer/profile/updateCustomerProfile.js";
const router = express.Router();

router.use(authMiddleware, checkRole("Customer"));

router.post("/create", createCustomerProfileController);
router.put("/update", updateCustomerProfileController);
router.put("/profilePhoto", updateCustomerPhotoController);

export default router;
