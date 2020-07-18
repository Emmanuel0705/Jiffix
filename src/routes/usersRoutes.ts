import express from 'express';
import * as authController from '../controllers/authControllers';
import * as validator from '../middlewares/validator';
import * as auth from '../middlewares/auth';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/auth', auth.protectedRoute, authController.userAuth);
router.post(
    '/register',
    validator.validateRegisterInput,
    authController.registerUser
);
router.post('/login', validator.validateLoginInput, authController.LoginUser);
router.post(
    '/verify-phone',
    validator.validatePhone,
    userController.verifyNumber
);
router.get('/password/forget', authController.forgotPassword);
router.get('/password/reset', authController.resetPassword);

export default router;
