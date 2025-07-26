import Joi from "joi";

const validateVendor = Joi.object({
  user: Joi.string().required(),
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
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }).required(),
  isProfileComplete: Joi.boolean().optional(),
});

export default validateVendor;
