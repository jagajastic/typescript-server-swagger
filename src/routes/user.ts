import { Router } from 'express';
import {
  getAlluser,
  getAUserByEmail,
  createUser,
  updateUserInfo,
  deleteUser,
  getAUserById,
} from '../controllers/user';

const router = Router();

router
  .route('/')
  .get(getAlluser)
  .post(createUser);

router.route('/email/:email').get(getAUserByEmail);
router.route('/id/:_id').get(getAUserById);

// route
router
  .route('/:id')
  .put(updateUserInfo)
  .delete(deleteUser);

export default router;
