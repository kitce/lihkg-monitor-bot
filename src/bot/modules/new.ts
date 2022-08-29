import { Router } from '@grammyjs/router';
import debugFactory from 'debug';
import * as setupTemplates from '../../templates/setup';
import { getSetupStepRoutePath, updateSetupStep } from '../helpers/route';
import { completeMenu } from '../menus/newMonitor';
import { renderKeywordsRouteMessage } from '../messages/keywordsRoute';
import { renderNameRouteMessage } from '../messages/nameRoute';
import { createKeywordsRoute } from '../routes/keywords';
import { createNameRoute } from '../routes/name';
import { SetupMode, SetupStep, TContext } from '../types';

const debug = debugFactory('lihkg-monitor-bot:bot:modules:new');

const mode = SetupMode.New;

export const newSetupStepRouter = new Router<TContext>((context) => {
  const { state } = context.session;
  const { step } = state[mode] || {};
  return step && getSetupStepRoutePath(mode, step);
});

/** new monitor keywords */
const keywordsRoute = createKeywordsRoute(mode, newSetupStepRouter, SetupStep.Keywords, updateSetupStep(mode, SetupStep.Name), (context) => {
  const { state } = context.session;
  const setup = state[mode]!;
  const { monitor } = setup;
  if (monitor.keywords.length > 0) {
    const nameRouteMessage = renderNameRouteMessage();
    return context.reply(nameRouteMessage);
  }
  /* no keywords, probably won't happen */
  const keywordsRouteMessage = renderKeywordsRouteMessage();
  return context.reply(keywordsRouteMessage);
});

/** new monitor name */
const nameRoute = createNameRoute(mode, newSetupStepRouter, SetupStep.Name, updateSetupStep(mode, SetupStep.Complete), (context) => {
  const { state } = context.session;
  const setup = state[mode]!;
  const { monitor } = setup;
  /* open complete menu */
  const message = setupTemplates.renderCompleteMessage(monitor);
  context.reply(message, { reply_markup: completeMenu, parse_mode: 'MarkdownV2' });
});
