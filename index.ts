import * as express from 'express';

import App from './src/app';

const expApp = express();
const app = new App(expApp);

app.init();
