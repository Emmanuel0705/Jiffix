import db from '../db';
import * as UserModel from '../models/userModel';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import { status, message } from '../utils/constant';
import AppError from '../utils/appError';

const signToken = (id: number | string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET || '12wedr', {
        expiresIn: process.env.JWT_EXP,
    });
};

export const registerUser = catchAsync(async (req, res) => {
    const { name, password, email, phone } = req.body;
    const userId = await UserModel.insertNewUser([
        { name, password, phone, email },
    ]);
    if (userId) {
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
    const users = await db.select('*').from('users');
    res.json(users);
});
export const resetPassword = catchAsync(async (req, res) => {
    const users = await db.select('*').from('users');
    res.json(users);
});
