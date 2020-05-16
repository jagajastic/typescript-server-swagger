import { Joi } from 'celebrate';

const JoiValidationSchema = {
  validateNewUser: {
    body: {
      email: Joi.string()
        .email()
        .required()
        .error(new Error('Email is required')),
      firstName: Joi.string()
        .required()
        .error(new Error('Firstname is required')),
      lastName: Joi.string()
        .required()
        .error(new Error('Lastname is required')),
      password: Joi.string()
        .min(6)
        .max(20)
        .required()
        .error(new Error('Password does not meet requirements')),
      DOB: Joi.date(),
      phone: Joi.string(),
      zip: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      address: Joi.string(),
    },
  },
  login: {
    body: {
      email: Joi.string()
        .email()
        .required()
        .error(new Error('Email is required')),
      password: Joi.string()
        .min(6)
        .max(20)
        .required()
        .error(new Error('Password is required')),
    },
  },
};
export default JoiValidationSchema;
