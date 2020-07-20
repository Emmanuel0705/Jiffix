import crypto from 'crypto';
const createToken = (): string => {
    const token = crypto.randomBytes(32).toString('hex');
    return token;
};

export default createToken;
