import crypto from 'crypto';
const hashToken = (token: any): string => {
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    return hash;
};
export default hashToken;
