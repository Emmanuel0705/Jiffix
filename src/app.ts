import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import hpp from 'hpp';
import AppError from '../src/utils/appError';

// Start express app
const app: any = express();

app.enable('trust proxy');

/*  GLOBAL MIDDLEWARES
 Implement CORS */
app.use(cors());
app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Prevent parameter pollution
app.use(
    hpp({
        whitelist: [],
    })
);

//  ROUTES
// app.use('/api/v1/users', userRouter);

app.all('*', (req: { originalUrl: string }, res: any, next: Function) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, '404'));
});

export default app;
