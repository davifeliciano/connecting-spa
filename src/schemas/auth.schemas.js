import Joi from "joi";

const messages = {
  username:
    '"username" must have between 3 and 32 characters (letters, numbers, - and _ are allowed)',
  password:
    '"password" must have at least 8 characters, at least one letter, one number and one special character (@$!%*#?&)',
};

const nameSchema = Joi.string().trim().max(255).required();

const emailSchema = Joi.string().email({ tlds: false }).required();
const usernameSchema = Joi.string()
  .pattern(/^[\w-]{3,32}$/)
  .message(messages.username)
  .required();

const passwordSchema = Joi.string()
  .pattern(/^(?=.+[A-Za-z])(?=.+\d)(?=.+[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  .message(messages.password)
  .required();

const signUpSchema = Joi.object({
  name: Joi.string().trim().max(255).required(),
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
  passwordConfirm: Joi.valid(Joi.ref("password")).messages({
    "any.only": "The passwords do not match",
  }),
});

const loginSchema = Joi.object({
  emailOrUsername: Joi.alternatives().try(emailSchema, usernameSchema),
  password: passwordSchema,
});

export { nameSchema, signUpSchema, loginSchema };
