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
    .items(Joi.number()) 
    .length(2)
    .required(),
}).required(),
  isProfileComplete: Joi.boolean().optional(),
});

export default validateVendor;
