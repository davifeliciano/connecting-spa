import Joi from "joi";

export const commentSchema = Joi.string().max(256).trim().required();
