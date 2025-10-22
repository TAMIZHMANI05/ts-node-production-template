import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import router from './router/apiRouter';
import globalErrorHandler from './middlewares/globalErrorHandler';
import httpError from './utils/httpError';
import responseMessage from './constants/responseMessage';
import helmet from 'helmet';

const app: Application = express();

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to static files
app.use(express.static(path.join(__dirname, '../', 'public')));
// Security Middleware
app.use(helmet());

// Routes
app.use('/api/v1', router);

// 404 Handler
app.use((req: Request, _res: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOTFOUND('Route'));
    } catch (error) {
        httpError(next, error, req, 404);
    }
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
