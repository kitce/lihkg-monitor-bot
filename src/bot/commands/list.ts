import debugFactory from 'debug';
import type { CommandMiddleware } from 'grammy';
import monitorListMenu from '../menus/monitorList';
import { renderMonitorListMenuMessage } from '../messages/monitorListMenu';
import type { TContext } from '../types';

const debug = debugFactory('lihkg-monitor-bot:bot:commands:list');

export const handler: CommandMiddleware<TContext> = (context) => {
  debug('start');
  const { monitors } = context.session;
  const message = renderMonitorListMenuMessage(context);
  if (monitors.length > 0) {
    /* open monitor list menu */
    return context.reply(message, { reply_markup: monitorListMenu });
  }
  /* no monitors */
  return context.reply(message);
};

export { monitorListMenu };

