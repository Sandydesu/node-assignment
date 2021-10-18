import * as express from 'express';
import * as bodyParser from 'body-parser';

// import { DBService } from '../../../services';

import routes from '../../../api-routes';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createServer = () => {
  const app = express();
  // DBService.connectDB();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(routes);
  return app;
};

// export const closeMongooseConnection = ():void => {
//   DBService.closeDb()
// }
