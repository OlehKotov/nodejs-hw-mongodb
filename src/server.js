import { env } from './utils/env.js';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import rootRouter from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );
  app.use(cors());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(rootRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);



  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
