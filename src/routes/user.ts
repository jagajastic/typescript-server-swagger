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

const { validateNewUser } = JoiValidationSchema;

const reqBodyValidation = celebrate({
  [Segments.BODY]: Joi.object().keys(validateNewUser.body),
});

const router = Router();

router
  .route('/')
  .get(getAllUser)
  .post(reqBodyValidation, createUser);

router.route('/email/:email').get(getAUserByEmail);
router.route('/id/:_id').get(getAUserById);

// route
router
  .route('/:id')
  .put(updateUserInfo)
  .delete(deleteUser);

export default router;
