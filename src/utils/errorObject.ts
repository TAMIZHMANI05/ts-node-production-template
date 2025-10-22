import { Request } from 'express';
import { THttpError } from '../types/types';
import responseMessage from '../constants/responseMessage';
import config from '../configs/config';
import { EApplicationEnvironment } from '../constants/application';
import logger from './logger';

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (err: Error | unknown, req: Request, statusCode: number = 500) => {
    const errorObj: THttpError = {
        success: false,
        statusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: err instanceof Error ? err.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null
    };

    logger.error(`CONTROLLER_ERROR`, { meta: errorObj });

    //Production check
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete errorObj.request.ip;
        delete errorObj.trace;
    }

    return errorObj;
};
