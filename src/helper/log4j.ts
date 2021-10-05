import { configure, getLogger, connectLogger } from 'log4js';
const logPath = process.env.LOG_DIR || './logs';

configure({
  appenders: {
    console: { type: 'stdout', layout: { type: 'colored' } },
    dateFile: {
      type: 'dateFile',
      filename: `${logPath}/app.log`,
      layout: { type: 'basic' },
      pattern: '-yyyy-MM-dd',
      compress: true,
      daysToKeep: 14,
      keepFileExt: true,
    },
  },
  categories: {
    console: { appenders: ['console', 'dateFile'], level: 'INFO' },
    default: { appenders: ['dateFile'], level: 'ALL' },
  },
});

export const logger = {
  console: getLogger('console'),
  app: getLogger('app'),
  express: connectLogger(getLogger('access'), {
    level: 'INFO',
  }),
};
