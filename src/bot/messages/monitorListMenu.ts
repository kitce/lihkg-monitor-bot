import debugFactory from 'debug';
import * as monitorTemplates from '../../templates/monitor';
import type { TContext } from '../types';

const debug = debugFactory('lihkg-monitor-bot:bot:messages:monitorListMenu');

export const renderMonitorListMenuMessage = (context: TContext) => {
  const { monitors } = context.session;
  if (monitors.length === 0) {
    return monitorTemplates.renderNoMonitorsHintMessage();
  }
  return monitorTemplates.renderMonitorListMessage();
};
