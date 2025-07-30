import createHttpError from "http-errors";

const updateProfileFactory = ({
  ProfileModel,
  validateSchema,
  profileName,
}) => {
  return async (req, res) => {
    const { error } = validateSchema.validate(req.body);
    if (error) throw createHttpError.BadRequest(error.details[0].message);

    const updates = req.body;
    const userId = req.user._id;
    if (!userId) {
      throw createHttpError.Unauthorized("User not authenticated.");
    }
    const profile = await ProfileModel.findOneAndUpdate(
      { user: userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!profile) {
      throw createHttpError.NotFound(`${profileName} profile not found.`);
    }

    res.status(200).json({
      success: true,
      message: `${profileName} profile updated successfully.`,
      [profileName]: profile,
    });
  };
};

export default updateProfileFactory;
