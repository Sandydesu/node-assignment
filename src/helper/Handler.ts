/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';

import { HttpError, logger } from './index';

import { STATUS_CODES } from '../constants/api.constants';

class HttpHandler {
  sendError(req: Request, res: Response, status: number, message: string) {
    this.logError(req, message, status);
    return res.status(status).send(new HttpError(status, message));
  }

  send(req: Request, res: Response, message: string, data?: any) {
    this.logSuccess(req.url, message, data);
    res.send({
      statusCode: STATUS_CODES.Success,
      message: message,
      data: data,
    });
  }

  log(req: Request) {
    logger.app.info(`Request to an api ${req.method} ${req.path}`, {
      transactionId: this.getTransId(req.headers),
      url: req.url,
      headers: req.headers,
      params: req.params,
      reqBody: req.body,
    });
  }

  logError(req: Request, error: any | HttpError, status?: number) {
    logger.app.error(`Error occured at ${req.method} ${req.path}`, {
      transactionId: this.getTransId(req.headers),
      host: req.hostname,
      url: req.url,
      reqBody: req.body,
      error: error,
      status: status,
    });
  }

  logSuccess(url: string, message: string, data = {}) {
    logger.app.info(`Response from an api ${url}`, {
      message: message,
      data: data,
    });
  }

  getTransId(headers: IncomingHttpHeaders) {
    return headers['transaction-id'];
  }
}

export default new HttpHandler();
