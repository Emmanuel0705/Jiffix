import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import * as userModel from '../models/userModel';
import { status, message } from '../utils/constant';

export const validateRegisterInput = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { name, email, phone, password } = req.body;

    if (name && email && phone && password) {
        if (await userModel.getUserByEmail(email))
            return res.json({
                status: status.error,
                message: message.usedEmail,
            });

        if (await userModel.getUserByPhone(phone))
            return res.json({
                status: status.error,
                message: message.usedPhone,
            });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        req.body.password = hash;
        return next();
    }

    res.json({ status: status.error, message: message.invalidData });
};
export const validateLoginInput = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { email, phone, password } = req.body;
    if (password && (email || phone)) {
        let userDetials;
        if (email) userDetials = await userModel.getUserByEmail(email);
        if (phone) userDetials = await userModel.getUserByPhone(phone);

        if (!userDetials)
            return res.json({
                status: status.error,
                message: message.invalidLogin,
            });

        if (!(await bcrypt.compare(password, userDetials.password)))
            return res.json({
                status: status.error,
                message: message.invalidLogin,
            });

        req.body.isValidated = true;
        req.body.userId = userDetials.id;
        return next();
    }

    res.json({ status: status.error, message: message.invalidData });
};
