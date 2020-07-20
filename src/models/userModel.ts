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

export const VerifyUser = async (id: any): Promise<any> => {
    const user = await db('users')
        .update({
            account_status: 'verified',
            secure_token: null,
            email_verified_at: new Date(),
        })
        .where('id', '=', id);
    return user;
};
interface setToken {
    secure_token: string;
    token_expire_time: string;
}

export const setToken = async (email: any, data: setToken): Promise<any> => {
    const user = await db('users').update(data).where('email', '=', email);
    return user;
};

export const findUserById = async (id: any): Promise<any> => {
    const user = await db.select('*').from('users').where({ id });
    if (user.length > 0) {
        user[0].password = undefined;
    }
    return user[0];
};

export const findUserByToken = async (token: any): Promise<any> => {
    const user = await db
        .select('*')
        .from('users')
        .where({ secure_token: token });
    if (user.length > 0) {
        user[0].password = undefined;
    }
    return user[0];
};
