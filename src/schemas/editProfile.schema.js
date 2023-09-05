import Joi from "joi";
import { nameSchema } from "./auth.schemas.js";

const editProfileSchema = Joi.object({
  name: nameSchema,
  bio: Joi.string().max(1500).allow(""),
});

export default editProfileSchema;
