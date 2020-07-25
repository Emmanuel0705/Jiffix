import bcrypt from 'bcryptjs';
import * as userModel from '../../models/userModel';
import { message, status } from '../../utils/constant';
import AppError from '../../utils/appError';
import catchAsync from '../../utils/catchAsync';
import createToken from '../../helper/createToken';
import hashToken from '../../helper/hashToken';
import trimInput from '../../utils/trimInput';

export const register = catchAsync(async (req, res, next) => {
    const { name, email, phone, password } = req.body;
    //validate req.body
    const valid = trimInput([name, email, phone, password]);
    if (!valid) return new AppError(message.invalidData, 400);
    //check if email already exist
    if (await userModel.getUserByEmail(email))
        throw new AppError(message.usedEmail, 409);
    //check if phone already exist
    if (await userModel.getUserByPhone(phone))
        throw new AppError(message.usedPhone, 409);

    //generate token, hash it and set expiration time
    req.body.verToken = createToken();
    req.body.hashToken = hashToken(req.body.verToken);
    req.body.tokenExpTime = Date.now() + 10 * 60 * 1000;

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    req.body.password = hash;
    return next();
});

export const login = catchAsync(async (req, res, next) => {
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

export const verifyPhone = catchAsync(async (req, res, next) => {
    const { phone } = req.body;
    if (!phone.trim() || isNaN(phone * 1) || phone.length !== 11)
        throw new AppError(message.invalidData, 400);
    next();
});

export const emailVerification = catchAsync(async (req, res, next) => {
    const { token } = req.query;
    if (!token) return next();

    const user = await userModel.findUserByToken(hashToken(token));
    if (!user) return next();
    if (user.secure_token === 'verified' || Date.now() > user.token_expire_time)
        return next();

    if (user.secure_token) {
        await userModel.VerifyUser(user.id);
        req.body.status = status.success;
    }

    next();
});

export const forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    if (!email.trim()) throw new AppError(message.invalidData, 400);
    if (!(await userModel.getUserByEmail(email)))
        throw new AppError(message.emailNotExist, 404);

    //generate token, hash it and set expiration time
    req.body.verToken = createToken();
    req.body.hashToken = hashToken(req.body.verToken);
    req.body.tokenExpTime = Date.now() + 10 * 60 * 1000;

    return next();
});
