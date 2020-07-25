import express from 'express';
import * as authContr from '../controllers/authController';
import * as VL from '../middlewares/validators/authValidator';
import * as auth from '../middlewares/auth';
import * as userContr from '../controllers/userController';

const router = express.Router();

router.get('/auth', auth.protectedRoute, authContr.userAuth);
router.post('/register', VL.register, authContr.registerUser);
router.post('/login', VL.login, authContr.LoginUser);
router.post('/verify/phone', VL.verifyPhone, userContr.verifyNumber);
router.get('/verify/email', VL.emailVerification, authContr.verifyEmail);
router.post('/password/forget', VL.forgotPassword, authContr.forgotPassword);
router.post('/password/reset', authContr.resetPassword);

export default router;
