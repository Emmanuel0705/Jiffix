import db from '../db';

export const getUserByEmail = async (email: string): Promise<any> => {
    const user = await db.select('*').from('users').where({ email });
    return user[0];
};
export const getUserByPhone = async (phone: string): Promise<any> => {
    const user = await db.select('*').from('users').where({ phone });
    return user[0];
};

export const insertNewUser = async (data: any[]): Promise<any> => {
    const user = await db.insert(data).into('users');
    return user[0];
};

export const findUserById = async (id: any): Promise<any> => {
    const user = await db.select('*').from('users').where({ id });
    user[0].password = undefined;
    return user[0];
};
