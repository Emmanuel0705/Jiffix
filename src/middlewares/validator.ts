import bcrypt from 'bcryptjs';
import * as userModel from '../models/userModel';
import { message } from '../utils/constant';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

export const validateRegisterInput = catchAsync(async (req, res, next) => {
    const { name, email, phone, password } = req.body;
    if (name && email && phone && password) {
        if (await userModel.getUserByEmail(email))
            throw new AppError(message.usedEmail, 409);

        if (await userModel.getUserByPhone(phone))
            throw new AppError(message.usedPhone, 409);

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        req.body.password = hash;
        return next();
    }
    throw new AppError(message.invalidData, 400);
});

export const validateLoginInput = catchAsync(async (req, res, next) => {
    const { email, phone, password } = req.body;
    if (password && (email || phone)) {
        let userDetials;
        if (email) userDetials = await userModel.getUserByEmail(email);
        if (phone) userDetials = await userModel.getUserByPhone(phone);

        if (!userDetials) throw new AppError(message.invalidLogin, 404);

        if (!(await bcrypt.compare(password, userDetials.password)))
            throw new AppError(message.invalidLogin, 404);

        req.body.isValidated = true;
        req.body.userId = userDetials.id;
        return next();
    }
    throw new AppError(message.invalidData, 400);
});

export const validatePhone = catchAsync(async (req, res, next) => {
    const { phone } = req.body;
    if (!phone.trim() || isNaN(phone * 1) || phone.length !== 11)
        throw new AppError(message.invalidData, 400);
    next();
});
