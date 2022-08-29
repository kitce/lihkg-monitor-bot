import debugFactory from 'debug';
import * as setupTemplates from '../../templates/setup';

const debug = debugFactory('lihkg-monitor-bot:bot:messages:newMonitorMenu');

export const renderNewMonitorMessage = () => {
  return setupTemplates.renderNewMonitorMessage();
};
