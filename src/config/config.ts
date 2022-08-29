import debugFactory from 'debug';
import dotenv from 'dotenv';

dotenv.config();

const debug = debugFactory('config');

const {
  NODE_ENV,
  BOT_TOKEN,
  GOOGLE_PROJECT_ID,
  GOOGLE_APPLICATION_CREDENTIALS
} = process.env;

const config = {
  dev: NODE_ENV !== 'production',
  token: BOT_TOKEN!,
  google: {
    projectId: GOOGLE_PROJECT_ID!,
    applicationCredentials: GOOGLE_APPLICATION_CREDENTIALS!
  }
};

debug('config', config);

const envs = [
  'BOT_TOKEN',
  // 'GOOGLE_PROJECT_ID',
  // 'GOOGLE_APPLICATION_CREDENTIALS'
];
for (const key of envs) {
  if (!process.env[key]) {
    throw new Error(`Environment variable "${key}" is not defined`);
  }
}

export default config;
