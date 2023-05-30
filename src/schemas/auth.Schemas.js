import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password'))
});

export const sessionSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})