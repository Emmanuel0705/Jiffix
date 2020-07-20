import * as UserModel from '../models/userModel';
import jwt from 'jsonwebtoken';
import path from 'path';
import catchAsync from '../utils/catchAsync';
import { status, message } from '../utils/constant';
import AppError from '../utils/appError';
import Email from './email';
import verErrorMSG from '../view/Message/verificationError';
import verifiedMSG from '../view/Message/verified';

const signToken = (id: number | string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET || '12wedr', {
        expiresIn: process.env.JWT_EXP,
    });
};

export const registerUser = catchAsync(async (req, res) => {
    const {
        name,
        password,
        email,
        phone,
        verToken,
        hashToken,
        tokenExpTime,
    } = req.body;
    const userId = await UserModel.insertNewUser([
        {
            name,
            password,
            phone,
            email,
            secure_token: hashToken,
            token_expire_time: tokenExpTime,
        },
    ]);
    if (userId) {
        const url = `${req.protocol}://${req.get(
            'host'
        )}/api/users/verify/email?token=${verToken}`;
        const UserData = {
            email: req.body.email,
            name: req.body.name.split(' ')[0],
        };
        await new Email(UserData, url).emailVerification();
        const token = signToken(userId);
        return res.json({ status: status.success, token });
    }
    throw new AppError(message.errorOccurred, 500);
});

export const LoginUser = catchAsync(async (req, res) => {
    const { isValidated, userId } = req.body;
    if (isValidated && userId) {
        const token = signToken(userId);
        return res.json({ status: status.success, token });
    }
    throw new AppError(message.errorOccurred, 500);
});

export const userAuth = catchAsync(async (req, res) => {
    const user = await UserModel.findUserById(req.body.id);
    res.json(user);
});
export const forgotPassword = catchAsync(async (req, res) => {
    const { email, verToken, hashToken, tokenExpTime } = req.body;

    await UserModel.setToken(email, {
        secure_token: hashToken,
        token_expire_time: tokenExpTime,
    });

    const url = `${req.protocol}://${req.get(
        'host'
    )}/api/users/password/reset?token=${verToken}`;
    const UserData = {
        email: req.body.email,
        name: '',
    };
    await new Email(UserData, url).forgotPassword();

    return res.json({ status: status.success, message: message.mailSent });
});
export const resetPassword = catchAsync(async (req, res) => {
    return res.json({ status: status.success, message: message.passwordreset });
});
export const verifyEmail = catchAsync(async (req, res) => {
    if (req.body.status === status.success) return res.send(verifiedMSG);

    return res.send(verErrorMSG);
});
