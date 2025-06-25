import express from "express";
import bcrypt from "bcrypt";
import { User, validateRegister } from "../models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(409).send({ message: "User already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
