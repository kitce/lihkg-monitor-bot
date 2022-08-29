import { FileAdapter } from '@grammyjs/storage-file';
import debugFactory from 'debug';
import { session as createSessionMiddleware } from 'grammy';
import type { ISession } from '../types';
import { createInitialMetadata } from './meta';
import { createInitialState } from './state';
// import { adapter } from '@grammyjs/storage-firestore';
// import { Firestore } from '@google-cloud/firestore';
// import config from '../config/config';
// import path from 'path';

const debug = debugFactory('lihkg-monitor-bot:bot:session');

const createInitialSession = (): ISession => {
  return {
    state: createInitialState(),
    metadata: createInitialMetadata(),
    monitors: []
  };
};

const fileAdapter = new FileAdapter();

// const firestore = new Firestore({
//   projectId: config.google.projectId,
//   keyFilename: path.resolve(config.google.applicationCredentials)
// });

const session = createSessionMiddleware({
  initial: () => createInitialSession(),
  storage: fileAdapter
});

export const selectMonitor = (id: number) => (session: ISession) => {
  const { monitors } = session;
  return monitors.find((monitor) => monitor.id === id)!;
};

export const selectMonitorIndex = (id: number) => (session: ISession) => {
  const { monitors } = session;
  return monitors.findIndex((monitor) => monitor.id === id);
};

export default session;
