import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import hpp from 'hpp';
import AppError from './utils/appError';
import userRoutes from './routes/usersRoutes';

// Start express app
const app = express();

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  ROUTES
app.use('/api/users', userRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, '404'));
});

export default app;
