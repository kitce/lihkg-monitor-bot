import debugFactory from 'debug';
import type { CommandMiddleware } from 'grammy';
import newMonitorMenu from '../menus/newMonitor';
import { renderNewMonitorMessage } from '../messages/newMonitorMenu';
import type { TContext } from '../types';

const debug = debugFactory('lihkg-monitor-bot:bot:commands:new');

export const handler: CommandMiddleware<TContext> = (context) => {
  debug('start');
  /* open new monitor menu */
  const message = renderNewMonitorMessage();
  return context.reply(message, { reply_markup: newMonitorMenu });
};

export { newMonitorMenu };
