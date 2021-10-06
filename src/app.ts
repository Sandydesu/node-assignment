import { Express, Router } from 'express';
import * as bodyParser from 'body-parser';

import { DBService } from './services';

import routes from './api-routes';
import { logger, HttpHandler } from './helper';

export default class App {
  app: Express;
  port = process.env.PORT || 3000;

  constructor(expressApp: Express) {
    this.app = expressApp;
  }

  init(): void {
    this.connectToDb();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded());
    this.routes(routes);
    this.app.listen(this.port, () => logger.console.info(`Server started at http://localhost:${this.port}`));
  }

  routes(routes: Router): void {
    this.app.use((req, res, next) => {
      HttpHandler.log(req);
      next();
    });
    this.app.use(routes);
  }

  connectToDb(): void {
    DBService.connectDB();
  }
}
