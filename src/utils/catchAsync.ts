import { Request, Response, NextFunction } from 'express';
import { status } from './constant';
export default (
    fn: (req: Request, res: Response, next: NextFunction) => any
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        fn(req, res, next).catch((err: any) => {
            return res.status(err.statusCode || 500).json({
                status: err.status || status.error,
                message: err.message,
            });
        });
    };
};
