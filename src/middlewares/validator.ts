import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import * as userModel from '../models/userModel';

export const validateRegisterInput = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { name, email, phone, password } = req.body;

    if (name && email && phone && password) {
        if (await userModel.getUserByEmail(email))
            return res.json({
                status: 'error',
                message: 'Email address has already been used',
            });

        if (await userModel.getUserByPhone(phone))
            return res.json({
                status: 'error',
                message: 'Phone Number has already been used',
            });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        req.body.password = hash;
        return next();
    }

    res.json({ status: 'error', message: 'invalid data received' });
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
                status: 'error',
                message: 'Invalid login Details',
            });

        if (!(await bcrypt.compare(password, userDetials.password)))
            return res.json({
                status: 'error',
                message: 'Invalid login Details',
            });

        req.body.isValidated = true;
        req.body.userId = userDetials.id;
        return next();
    }

    res.json({ status: 'error', message: 'invalid data received' });
};
