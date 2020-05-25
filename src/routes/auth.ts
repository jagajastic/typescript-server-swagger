import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import * as auth from '../controllers/auth';
import authentication from '../API/auth';
import authValidation from '../validations/auth';

// extract validate
const authRoute = authValidation;

// validate users route
const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys(authRoute.login.body),
});

// validate verify route
const validateVerifyRoute = celebrate({
  [Segments.BODY]: Joi.object().keys(authRoute.verify.body),
});

// validate resend verificaation code route
const validateResendRoute = celebrate({
  [Segments.BODY]: Joi.object().keys(authRoute.resendVerification.body),
});

// validate forgot password route
const validateResetRoute = celebrate({
  [Segments.BODY]: Joi.object().keys(authRoute.resetPassword.body),
});

// validate forgot password route
const validateForgotPasswordRoute = celebrate({
  [Segments.BODY]: Joi.object().keys(authRoute.forgotPassword.body),
});

// instantiate express router
const router = Router();

// aappend route "/" to router
router.route('/login').post(validateLogin, auth.login);

// verification route
router.route('/verify').post(validateVerifyRoute, auth.verify);

// resend verification email
router
  .route('/resend-verification-code')
  .post(validateResendRoute, auth.resendVerification);

// forgot password route
router
  .route('/forgot-password')
  .post(validateForgotPasswordRoute, auth.forgotPassword);

// reste password route
router
  .route('/reset-password')
  .post(validateResetRoute, authentication, auth.resetPaassword);

// export auth router
export default router;
