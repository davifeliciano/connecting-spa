import Joi from "joi";

const message = "Non empty caption is required (up to 1500 characteres).";

const captionSchema = Joi.string().max(1500).required().messages({
  "string.empty": message,
  "any.required": message,
});

export default captionSchema;
