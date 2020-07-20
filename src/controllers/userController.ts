import axios from 'axios';
import catchAsync from '../utils/catchAsync';

export const verifyNumber = catchAsync(async (req, res) => {
    const OTP = Math.floor(Math.random() * (90000 - 10000)) + 10000;
    const payload = {
        sender: 'Jiffix Tech',
        to: req.body.phone,
        message: `Welcome to Jiffix, Kindly continue your registration with your OTP ${OTP} `,
        type: '0',
        routing: 3,
        token: process.env.SMS_TOKEN,
    };
    const { sender, to, message, type, routing, token } = payload;
    const smsRes = await axios.get(
        `https://smartsmssolutions.com/api/json.php?message=${message}&to=${to}&sender=${sender}&type=${type}&routing=${routing}&token=${token}`
    );

    res.send(smsRes.data);
});
