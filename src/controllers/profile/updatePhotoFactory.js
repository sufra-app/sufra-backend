import createHttpError from "http-errors";

const updatePhotoFactory = ({
  ProfileModel,
  validateSchema,
  profileName,
  fieldName,
}) => {
  return async (req, res) => {
    const { error } = validateSchema.validate(req.body);
    if (error) {
      throw createHttpError.BadRequest(error.details[0].message);
    }

    const { photoUrl } = req.body;
    const userId = req.user._id;

    if (!userId) {
      throw createHttpError.Unauthorized("User not authenticated.");
    }

    if (!photoUrl) {
      throw createHttpError.BadRequest("Photo URL is required.");
    }

    const updatedProfile = await ProfileModel.findOneAndUpdate(
      { user: userId },
      { [fieldName]: photoUrl },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      throw createHttpError.NotFound(`${profileName} not found.`);
    }

    res.status(200).json({
      success: true,
      message: `${profileName} ${fieldName} updated successfully.`,
      [profileName.toLowerCase()]: updatedProfile,
    });
  };
};

export default updatePhotoFactory;
