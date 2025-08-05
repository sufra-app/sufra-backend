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
  type: Joi.string().valid("Point").required(),
  coordinates: Joi.array()
    .items(Joi.number()) 
    .length(2)
    .required(),
}).optional(),
  isProfileComplete: Joi.boolean().optional(),
});

export default validateUpdateVendor;
