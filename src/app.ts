import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import graphQLHTTP from 'express-graphql';
import path from 'path';

import apiRouter from './routes/index';
import userRouter from './routes/user';

import schema from './schema';
import mongoose from 'mongoose';

// swager doc import
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

require('dotenv').config();

const app = express();

// Setup Request logging
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

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

const env = process.env.NODE_ENV;
const dbURI: string =
  env === 'test' ? process.env.MONGO_URI_TEST!! : process.env.MONGO_URI!!;
// mongoose db connection
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  // console.log('MongoDB database connection established successfully!');
  // seed();
});
connection.once('open', () => {});
connection.once('error', err => {
  console.log('error from Mongoose', err);
}); // end of mongoose connection

app.disable('x-powered-by');
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/', apiRouter);
app.use('/api/user', userRouter);

app.use(
  '/graphql',
  graphQLHTTP({
    schema,
    graphiql: true,
  }),
);

// swagger endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
