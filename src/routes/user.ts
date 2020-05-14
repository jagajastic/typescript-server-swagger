import { Router } from 'express';
import {
  getAlluser,
  getAUser,
  createUser,
  updateUserInfo,
  deleteUser,
} from '../controllers/user';

const router = Router();

router
  .route('/')
  .get(getAlluser)
  .post(createUser);

router.route('/:email').get(getAUser);

// route
router
  .route('/:id')
  .put(updateUserInfo)
  .delete(deleteUser);

export default router;
