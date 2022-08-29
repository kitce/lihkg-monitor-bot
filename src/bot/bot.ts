import debugFactory from 'debug';
import { Bot } from 'grammy';
import config from '../config/config';
import * as botTemplates from '../templates/bot';
import * as commands from './commands';
import * as modules from './modules';
import session from './session/session';
import { TContext } from './types';

const debug = debugFactory('lihkg-monitor-bot:bot');

const bot = new Bot<TContext>(config.token);

bot.use(session);

bot.use(commands.new.newMonitorMenu);
bot.use(commands.list.monitorListMenu);

bot.command('new', commands.new.handler);
bot.command('list', commands.list.handler);
bot.command('cancel', commands.cancel.handler);

bot.use(modules.new.newSetupStepRouter);
bot.use(modules.edit.editSetupStepRouter);

bot.catch((error) => {
  debug('error', error);
  const { ctx: context } = error;
  const message = botTemplates.renderInvalidActionMessage();
  context.answerCallbackQuery(message);
});

export default bot;
