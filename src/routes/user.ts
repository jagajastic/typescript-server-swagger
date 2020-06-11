import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import JoiValidationSchema from '../validations/user';
import {
  getAllUser,
  getAUserByEmail,
  createUser,
  updateUserInfo,
  deleteUser,
  getAUserById,
} from '../controllers/user';

import authRoute from '../API/auth';

// extract the validators from the object
const { validateNewUser } = JoiValidationSchema;

// validate user object body
const reqBodyValidation = celebrate({
  [Segments.BODY]: Joi.object().keys(validateNewUser.body),
});

// instantiate router
const router = Router();

// get and create user route
router
  .route('/')
  .get(authRoute, getAllUser)
  .post(reqBodyValidation, createUser);

// get user by email
router.route('/email/:email').get(authRoute, getAUserByEmail);

// get user by id
router.route('/id/:_id').get(authRoute, getAUserById);

// update and delete route
router
  .route('/:id')
  .put(authRoute, updateUserInfo)
  .delete(authRoute, deleteUser);

export default router;
