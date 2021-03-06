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
  /** byPassAuth Only for test cases */
  const { byPassAuth } = req.query;
  if (byPassAuth) {
    return next();
  } else {
    const { authorization } = req.headers;

    const authToken = authorization.match(/Bearer (.+)/);

    if (!authToken) {
      return HttpHandler.sendError(req, res, STATUS_CODES.Unauthorized, ERROR_MSGS.Unauthorized);
    }

    const accessToken = authToken[1];
    return oktaJwtVerifier
      .verifyAccessToken(accessToken, oktaConfig.audience)
      .then((token) => {
        req['authorization'] = token;
        return next();
      })
      .catch((err) => {
        return HttpHandler.sendError(req, res, STATUS_CODES.Unauthorized, err);
      });
  }
};

export default authMiddleWare;
