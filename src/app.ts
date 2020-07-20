import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import hpp from 'hpp';
import userRoutes from './routes/usersRoutes';
import { status } from './utils/constant';

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

app.all('*', (req: Request, res: Response) => {
    return res.status(404).json({
        status: status.error,
        message: `Can't find ${req.originalUrl} on this server!`,
    });

    // new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

export default app;
