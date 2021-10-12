import { Express, Router } from 'express';
import * as bodyParser from 'body-parser';

import { DBService } from './services';

import errorMiddleware from './middlewares/error';

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
    this.initilizeBodyParser();
    this.initializeErrorHandling();
    this.routes(routes);
    this.app.listen(this.port, () => logger.console.info(`Server started at http://localhost:${this.port}`));
  }

  private initilizeBodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
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
