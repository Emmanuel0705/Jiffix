import AppError from '../utils/appError';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import * as userModel from '../models/userModel';
export const protectedRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new AppError(
                'You are not logged in! Please log in to get access.',
                '401'
            )
        );
    }
    interface Dtype {
        id: string;
    }

    // 2) Verification token
    const decoded: any = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET || 'eue33'
    );

    // 3) Check if user still exists
    const currentUser = await userModel.findUserById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                '401'
            )
        );
    }
    req.body.id = currentUser.id;
    next();
};
