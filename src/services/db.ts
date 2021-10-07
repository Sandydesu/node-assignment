import { connect } from 'mongoose';

import { logger } from '../helper/log4j';

import { DbConfig } from '../constants/db.constants';

class DBService {
  connectDB(): void {
    connect(this.getConnectionString(), DbConfig.connection_options)
      .then(() => logger.console.info('Connected to DB.'))
      .catch((err) => logger.app.error(err));
  }

  getConnectionString(): string {
    return `mongodb+srv://${DbConfig.db.username}:${DbConfig.db.password}@cluster0.ggwrp.mongodb.net/${DbConfig.db.database}?retryWrites=true&w=majority`;
  }
}

export default new DBService();
