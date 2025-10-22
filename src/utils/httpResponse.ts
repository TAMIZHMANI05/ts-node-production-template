import { Request, Response } from 'express';
import { THttpResponse } from '../types/types';
import config  from '../configs/config';
import { EApplicationEnvironment } from '../constants/application';
import logger from './logger';

export default (req: Request, res: Response, statusCode: number, message: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message,
        data
    };

    // Log
    logger.info(`CONTROLLER_RESPONSE`, { meta: response });

    //Production check
    if(config.ENV===EApplicationEnvironment.PRODUCTION){
        delete response.request.ip;
    }

    res.status(statusCode).json(response);
};
