import debugFactory from 'debug';
import * as setupTemplates from '../../templates/setup';
import { selectMonitor } from '../session/session';
import type { TContext } from '../types';

const debug = debugFactory('lihkg-monitor-bot:bot:messages:editMenu');

export const renderEditMenuMessage = (context: TContext) => {
  const { state } = context.session;
  const { monitorId } = state;
  const monitor = selectMonitor(monitorId!)(context.session);
  const message = setupTemplates.renderEditMonitorMessage(monitor!);
  return message;
};
