import { Router } from 'express';
import * as auth from '../controllers/auth';
import authentication from '../API/auth';

// instantiate express router
const router = Router();

// aappend route "/" to router
router.route('/login').post(auth.login);

// forgot password route
router.route('/forgot-password').post(auth.forgotPassword);

// reste password route
router.route('/reset-password').post(authentication, auth.resetPaassword);

// export auth router
export default router;
