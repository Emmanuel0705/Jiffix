import express from 'express';
import * as userController from '../controllers/usersControllers';

const router = express.Router();

router.get('/auth', userController.userAuth);
router.get('/register', userController.registerUser);
router.get('/login', userController.LoginUser);
router.get('/password/forget', userController.forgotPassword);
router.get('/password/reset', userController.resetPassword);

export default router;
