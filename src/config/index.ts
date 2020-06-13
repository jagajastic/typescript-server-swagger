import { merge } from 'lodash';
const env = process.env.NODE_ENV || 'development';

interface IConfig {
  [key: string]: any;
}

// default if all other db setup is not giving or defined
const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d',
  },
};

// environmental configuration
let envConfig = {};

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev').config;
    break;
  case 'test':
  case 'testing':
    envConfig = require('./testing').config;
    break;
  case 'prod':
  case 'production':
    envConfig = require('./prod').config;
    break;
  default:
    envConfig = require('./dev').config;
}

export default merge(baseConfig, envConfig) as IConfig;
