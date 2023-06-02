import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  picture_url: Joi.string().uri().required()
});

export const sessionSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})