import { NextFunction, Request, Response } from 'express';
import { ValidationErrorItem } from 'joi';

import { HttpError, HttpHandler } from '../helper';

import { STATUS_CODES } from '../constants/api.constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorMiddleware(error: any | HttpError, req: Request, res: Response, next: NextFunction): void {
  HttpHandler.logError(req, error);

  if (error && error.type) {
    res.status(400).send(reqValidation(error.type, error.error.details));
  } else {
    res.status(error.statusCode).send(resValidation(error));
  }
  next();
}

function reqValidation(type: string, errDetails: ValidationErrorItem[]) {
  const status = 400;
  return {
    statusCode: status,
    message: `${type}: ${errDetails.map((x) => x.message).join(', ')}`,
    errorType: `${status} ${STATUS_CODES[status]}`,
  };
}

function resValidation(error: HttpError) {
  return {
    statusCode: error.statusCode || 500,
    message: error.message || 'Something went wrong',
    errorType: error.errorType || '500 Internal server error',
  };
}

export default errorMiddleware;
