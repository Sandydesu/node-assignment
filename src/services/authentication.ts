import { NextFunction, Request, Response } from 'express';
import * as btoa from 'btoa';
import * as request from 'request-promise';

import { HttpHandler } from '../helper';

import { oktaConfig } from '../constants/okta.constants';
import { STATUS_CODES } from '../constants/api.constants';

class AuthenticateService {
  public async getAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = btoa(`${oktaConfig.clientId}:${oktaConfig.clientSecret}`);
      const auth = await request({
        uri: `${oktaConfig.issuer}/v1/token`,
        json: true,
        method: 'POST',
        headers: {
          authorization: `Basic ${token}`,
        },
        form: {
          grant_type: oktaConfig.grantType,
          scope: oktaConfig.scope,
        },
      });
      return res.status(200).json(auth);
    } catch (err) {
      HttpHandler.sendError(STATUS_CODES.InternalServerError, err.message, next);
    }
  }
}
export default new AuthenticateService();
