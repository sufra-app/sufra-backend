import Joi from "joi";

const timePattern = /^([1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

const pickupSlotSchema = Joi.object({
  day: Joi.string()
    .valid(
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    )
    .required(),

  startTime: Joi.string().pattern(timePattern).required().messages({
    "string.pattern.base": "Start time must be in the format HH:MM AM/PM",
  }),

  endTime: Joi.string().pattern(timePattern).required().messages({
    "string.pattern.base": "End time must be in the format HH:MM AM/PM",
  }),

  maxOrders: Joi.number().integer().min(1).default(10),
});

const validatePickupSlot = (data) =>
  pickupSlotSchema.validate(data, { abortEarly: false });

export default validatePickupSlot;
