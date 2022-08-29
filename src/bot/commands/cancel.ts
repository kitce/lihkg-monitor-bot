import debugFactory from 'debug';
import type { CommandMiddleware } from 'grammy';
import * as botTemplates from '../../templates/bot';
import { createInitialState } from '../session/state';
import { TContext } from '../types';

const debug = debugFactory('lihkg-monitor-bot:bot:commands:cancel');

export const handler: CommandMiddleware<TContext> = async (context) => {
  debug('start');
  const { session } = context;
  session.state = createInitialState();
  const message = botTemplates.renderCancelActionMessage();
  return context.reply(message);
};
