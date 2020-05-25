import { Joi } from 'celebrate';

const authValidation = {
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

  verify: {
    body: {
      token: Joi.string()
        .required()
        .error(new Error('Token is required')),
      isVerified: Joi.boolean()
        .required()
        .error(new Error('isVerified is required')),
    },
  },
  resendVerification: {
    body: {
      email: Joi.string()
        .required()
        .error(new Error('Email is required')),
    },
  },
  resetPassword: {
    body: {
      email: Joi.string()
        .required()
        .error(new Error('Email is required')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required')),
      confirmPassword: Joi.string()
        .required()
        .error(new Error('Confirm is required')),
    },
  },
  forgotPassword: {
    body: {
      email: Joi.string()
        .required()
        .error(new Error('Email is required')),
    },
  },
};

export default authValidation;
