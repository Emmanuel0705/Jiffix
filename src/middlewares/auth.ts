import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError';
import * as userModel from '../models/userModel';
import { message } from '../utils/constant';
import catchAsync from '../utils/catchAsync';

export const protectedRoute = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new AppError(message.notLoggedIn, 404);
    }

    // 2) Verification token
    const decoded: any = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET || 'eue33'
    );

    if (!decoded.id) {
        throw new AppError(message.userNotExist, 404);
    }

    // 3) Check if user still exists
    const currentUser = await userModel.findUserById(decoded.id);
    if (!currentUser) {
        throw new AppError(message.userNotExist, 404);
    }
    req.body.id = currentUser.id;
    next();
});
