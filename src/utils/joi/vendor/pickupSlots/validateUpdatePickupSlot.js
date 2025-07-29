import Joi from "joi";

const timePattern = /^([1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

const validateUpdatePickupSlot = Joi.object({
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
    .optional(),

  startTime: Joi.string().pattern(timePattern).optional().messages({
    "string.pattern.base": "Start time must be in the format HH:MM AM/PM",
  }),

  endTime: Joi.string().pattern(timePattern).optional().messages({
    "string.pattern.base": "End time must be in the format HH:MM AM/PM",
  }),

  maxOrders: Joi.number().integer().min(1).optional(),
});

export default validateUpdatePickupSlot;
