import { NextFunction, Request, Response } from 'express';
import * as OktaJwtVerifier from '@okta/jwt-verifier';

import { HttpHandler } from '../helper';

import { oktaConfig } from '../constants/okta.constants';
import { STATUS_CODES } from '../constants/api.constants';
import { ERROR_MSGS } from '../constants/message.constants';

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: oktaConfig.issuer,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  const authToken = authorization.match(/Bearer (.+)/);

  if (!authToken) {
    return HttpHandler.sendError(STATUS_CODES.Unauthorized, ERROR_MSGS.Unauthorized, next);
  }

  const accessToken = authToken[1];
  return oktaJwtVerifier
    .verifyAccessToken(accessToken, oktaConfig.audience)
    .then((token) => {
      req['authorization'] = token;
      return next();
    })
    .catch((err) => {
      return HttpHandler.sendError(STATUS_CODES.Unauthorized, err, next);
    });
};

export default authMiddleWare;
