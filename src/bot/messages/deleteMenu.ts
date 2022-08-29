import debugFactory from 'debug';
import * as monitorTemplates from '../../templates/monitor';
import { selectMonitor } from '../session/session';
import { TContext } from '../types';

const debug = debugFactory('lihkg-monitor-bot:bot:messages:deleteMenu');

export const renderDeleteMenuMessage = (context: TContext) => {
  const { state } = context.session;
  const { monitorId } = state;
  const monitor = selectMonitor(monitorId!)(context.session);
  const message = monitorTemplates.renderDeleteMonitorConfirmMessage(monitor!);
  return message;
};
