import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import checkRole from "../../middlewares/checkRole.js";
import createVendorProfileController from "../../controllers/vendor/profile/createVendorProfile.js";
import updateVendorProfileController from "../../controllers/vendor/profile/updateVendorProfile.js";
import updateVendorLogoController from "../../controllers/vendor/profile/updateVendorLogo.js";
const router = express.Router();

router.use(authMiddleware, checkRole("Vendor"));

router.post("/create", createVendorProfileController);
router.put("/update", updateVendorProfileController);
router.put("/logo", updateVendorLogoController);

export default router;
