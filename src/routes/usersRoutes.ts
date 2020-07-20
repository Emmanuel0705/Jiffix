import express from 'express';
import * as authController from '../controllers/authControllers';
import {
    login,
    register,
    emailVerification,
    verifyPhone,
    forgotPassword,
} from '../middlewares/validators/authValidator';
import * as auth from '../middlewares/auth';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/auth', auth.protectedRoute, authController.userAuth);
router.post('/register', register, authController.registerUser);
router.post('/login', login, authController.LoginUser);
router.post('/verify/phone', verifyPhone, userController.verifyNumber);
router.get('/verify/email', emailVerification, authController.verifyEmail);
router.post('/password/forget', forgotPassword, authController.forgotPassword);
router.post('/password/reset', authController.resetPassword);

export default router;
