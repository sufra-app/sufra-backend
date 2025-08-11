import createHttpError from "http-errors";
import { User } from "../../models/user.js";

const createProfileFactory = ({
  ProfileModel,
  validateSchema,
  profileName,
}) => {
  return async (req, res) => {
    const { error } = validateSchema.validate(req.body);
    if (error) throw createHttpError.BadRequest(error.details[0].message);

    const user = await User.findById(req.user._id);
    if (!user) throw createHttpError.NotFound("User not found");

    const existing = await ProfileModel.findOne({ user: req.user._id });
    if (existing) {
      throw createHttpError.Conflict(`${profileName} profile already exists.`);
    }

    const profile = new ProfileModel({
      user: req.user._id,
      ...req.body,
      isProfileComplete: true,
    });

    const savedProfile = await profile.save();
    const fullProfile = await ProfileModel.findById(savedProfile._id);

    res.status(201).json({
      success: true,
      message: `${profileName} profile created.`,
      [profileName.toLowerCase()]: fullProfile,
    });
  };
};

export default createProfileFactory;
