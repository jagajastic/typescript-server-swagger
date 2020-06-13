import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { connect } from './helpers/db';
import { errors } from 'celebrate';

import apiRouter from './routes/index';
import userRouter from './routes/user';
import authRouter from './routes/auth';

import schema from './schema';

import swaggerDocument from './swagger.json';

require('dotenv').config();

const app = express();

// Setup Request logging
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
console.log('env values  ->>', process.env);
app.use(
  morgan(logFormat, {
    skip: function(_req, res) {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }

      return res.statusCode < 400;
    },
    stream: process.stderr,
  }),
);

app.use(
  morgan(logFormat, {
    skip: function(_req, res) {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }

      return res.statusCode >= 400;
    },
    stream: process.stdout,
  }),
);

// db connection
connect();

app.disable('x-powered-by');
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', apiRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

app.use(
  '/graphql',
  graphQLHTTP({
    schema,
    graphiql: true,
  }),
);

// swagger endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// add errors call to the app for it to return a jsonlied object
app.use(errors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../', 'client/build')));
  app.get('/*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client/build/index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function(
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: express.Request, res: express.Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
