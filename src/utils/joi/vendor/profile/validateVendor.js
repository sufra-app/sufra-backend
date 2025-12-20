import Joi from "joi";

const validateVendor = Joi.object({
  businessName: Joi.string().required(),
  address: Joi.string().required(),
  description: Joi.string().required(),
  cuisineType: Joi.string().required(),
  logo: Joi.string().uri().optional(),
  workingDays: Joi.array()
    .items(
      Joi.string().valid(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      )
    )
    .required(),
  location: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array()
      .items(
        //  Longitude (lng). Must be between -180 and 180.
        Joi.number().min(-180).max(180).required(),
        // Latitude (lat). Must be between -90 and 90.
        Joi.number().min(-90).max(90).required()
      )
      .length(2)
      .required()
      .messages({
        "array.includesRequiredKnowns":
          "Coordinates array must be [Longitude, Latitude] with valid geographical boundaries.",
      }),
  }).required(),
  isProfileComplete: Joi.boolean().optional(),
});

export default validateVendor;
