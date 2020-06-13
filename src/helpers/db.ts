import mongoose from 'mongoose';
import options from '../config';

export const connect = (
  url = options.dbUrl || 'mongodb://localhost:27017/crtest',
  opts = {},
) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useMongoClient: true,
  });
};
