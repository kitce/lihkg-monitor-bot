import { Router } from '@grammyjs/router';
import debugFactory from 'debug';
import { getSetupStepRoutePath, updateSetupStep } from '../helpers/route';
import editMenu from '../menus/edit';
import { renderEditMenuMessage } from '../messages/editMenu';
import { renderKeywordsRouteMessage } from '../messages/keywordsRoute';
import { createKeywordsRoute } from '../routes/keywords';
import { createNameRoute } from '../routes/name';
import { selectMonitorIndex } from '../session/session';
import { SetupMode, SetupStep, TContext } from '../types';

const debug = debugFactory('lihkg-monitor-bot:bot:modules:edit');

const mode = SetupMode.Edit;

export const editSetupStepRouter = new Router<TContext>((context) => {
  const { state } = context.session;
  const { step } = state[mode] || {};
  return step && getSetupStepRoutePath(mode, step);
});

/** edit monitor keywords */
const keywordsRoute = createKeywordsRoute(mode, editSetupStepRouter, SetupStep.Keywords, updateSetupStep(mode, SetupStep.Idle), (context) => {
  const { state, monitors } = context.session;
  const setup = state[mode]!;
  const { monitor } = setup;
  debug('enter keywords', monitor.keywords);
  if (monitor.keywords.length > 0) {
    /* save the monitor to session */
    const index = selectMonitorIndex(monitor.id)(context.session);
    monitors[index] = monitor;
    const message = renderEditMenuMessage(context);
    return context.reply(message, { reply_markup: editMenu, parse_mode: 'MarkdownV2' });
  }
  /* no keywords, probably won't happen */
  const keywordsRouteMessage = renderKeywordsRouteMessage();
  return context.reply(keywordsRouteMessage);
});

/** edit monitor name */
const nameRoute = createNameRoute(mode, editSetupStepRouter, SetupStep.Name, updateSetupStep(mode, SetupStep.Idle), (context) => {
  const { state, monitors } = context.session;
  const setup = state[mode]!;
  const { monitor } = setup;
  debug('enter name', monitor.name);
  /* save the monitor to session */
  const index = selectMonitorIndex(monitor.id)(context.session);
  monitors[index] = monitor;
  const message = renderEditMenuMessage(context);
  return context.reply(message, { reply_markup: editMenu, parse_mode: 'MarkdownV2' });
});
