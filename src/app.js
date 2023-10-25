import express from 'express';
import { router } from './routes/route.js';
import { AppError } from './erros/index.js';

import { envs } from './config/enviroments/enviroment.js';
import { globalErrorHandler } from './erros/error.controller.js';
import { enableCors } from './config/plugins/cors.plugin.js';

import { enableMorgan } from './config/plugins/morgan.plugin.js';


const app = express();
const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:4200']

app.use(express.json());
if(envs.NODE_ENV === 'development'){
    enableMorgan(app)
  }

  enableCors(app, ACCEPTED_ORIGINS )



app.use('/api/v1', router);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
  })


  app.use(globalErrorHandler)

export default app;
