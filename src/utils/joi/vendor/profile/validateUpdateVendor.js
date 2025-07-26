import Joi from "joi";

const validateUpdateVendor = Joi.object({
  businessName: Joi.string().optional(),
  address: Joi.string().optional(),
  description: Joi.string().optional(),
  cuisineType: Joi.string().optional(),
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
    .optional(),
  location: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }).optional(),
  isProfileComplete: Joi.boolean().optional(),
});

export default validateUpdateVendor;
