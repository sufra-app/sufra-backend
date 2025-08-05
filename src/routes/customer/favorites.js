import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import checkRole from "../../middlewares/checkRole.js";

import { addToFavorites,deleteFromFavorites,getFavorites } from "../../controllers/customer/favorites/index.js";
const router = express.Router();

router.use(authMiddleware, checkRole("Customer"));
router.post("/dish/add",addToFavorites("dish"));
router.delete("/dish/delele/:id",deleteFromFavorites("dish"));
router.get("/dish", getFavorites("dish"));

router.post("/vendor/add", addToFavorites("vendor"));
router.delete("/vendor/delete/:id", deleteFromFavorites("vendor"));
router.get("/vendor", getFavorites("vendor"));

export default router;
