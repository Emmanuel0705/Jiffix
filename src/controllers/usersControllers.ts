import { Request, Response } from 'express';
import db from '../db';

export const registerUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const users = await db.select('*').from('users');
    res.json(users);
};

export const LoginUser = async (req: Request, res: Response): Promise<void> => {
    const users = await db.select('*').from('users');
    res.json(users);
};

export const userAuth = async (req: Request, res: Response): Promise<void> => {
    const users = await db.select('*').from('users');
    res.json(users);
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
