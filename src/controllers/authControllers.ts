import { Request, Response } from 'express';
import db from '../db';
import * as UserModel from '../models/userModel';
import jwt from 'jsonwebtoken';

export const registerUser = async (
    req: Request,
    res: Response
): Promise<any | void> => {
    const { name, password, email, phone } = req.body;
    const userId = await UserModel.insertNewUser([
        { name, password, phone, email },
    ]);
    if (userId) {
        const token = jwt.sign(
            { id: userId },
            process.env.JWT_SECRET || '12wedr'
        );
        return res.json({ status: 'success', token });
    }
    res.json({ status: 'error', message: 'something went horribly wrong' });
};

export const LoginUser = async (
    req: Request,
    res: Response
): Promise<void | any> => {
    const { isValidated, userId } = req.body;
    if (isValidated) {
        const token = jwt.sign(
            { id: userId },
            process.env.JWT_SECRET || '12wedr'
        );
        return res.json({ status: 'success', token });
    }
};

export const userAuth = async (req: Request, res: Response): Promise<void> => {
    const user = await UserModel.findUserById(req.body.id);
    res.json(user);
};
export const forgotPassword = async (
    req: Request,
    res: Response
): Promise<void> => {
    const users = await db.select('*').from('users');
    res.json(users);
};
export const resetPassword = async (
    req: Request,
    res: Response
): Promise<void> => {
    const users = await db.select('*').from('users');
    res.json(users);
};
