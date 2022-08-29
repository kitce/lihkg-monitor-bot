import { Menu } from '@grammyjs/menu';
import debugFactory from 'debug';
import * as texts from '../../constants/texts';
import Monitor from '../../models/Monitor';
import * as setupTemplates from '../../templates/setup';
import { updateSetupStep } from '../helpers/route';
import { renderKeywordsRouteMessage } from '../messages/keywordsRoute';
import { renderSelectCategoriesMenuMessage } from '../messages/selectCategoriesMenu';
import { initializeNewSetupState } from '../session/slices/setup';
import { MenuId, SetupMode, SetupStep, TContext } from '../types';
import { createCompleteMenu } from './complete';
import { createSelectCategoriesMenu } from './selectCategories';

const debug = debugFactory('lihkg-monitor-bot:bot:menus:new');

const mode = SetupMode.New;

/** new monitor menu */
const menu = new Menu<TContext>(MenuId.NewMonitor);

/* by category and keywords */
menu.text(texts.buttons.byCategoryAndKeywords, (context) => {
  const { state, metadata } = context.session;
  const id = metadata.lastMonitorId + 1;
  const monitor = Monitor.factory(id);
  state[SetupMode.New] = initializeNewSetupState(monitor);
  /* open categories menu */
  const message = renderSelectCategoriesMenuMessage();
  context.editMessageText(message, { reply_markup: selectCategoriesMenu });
});

/** select categories menu */
const selectCategoriesMenu = createSelectCategoriesMenu(mode, MenuId.Categories);

/** select categories confirm button */
selectCategoriesMenu.row().text(texts.buttons.confirm, updateSetupStep(mode, SetupStep.Keywords), (context) => {
  const { state } = context.session;
  const setup = state[mode]!;
  const { monitor } = setup;
  debug('categories', monitor.categoryIds);
  context.menu.close();
  const message = setupTemplates.renderSelectCategoriesAcknowledgementMessage(monitor);
  context.editMessageText(message, { parse_mode: 'MarkdownV2' });
  const keywordsRouteMessage = renderKeywordsRouteMessage();
  context.reply(keywordsRouteMessage);
});

/** complete setup */
export const completeMenu = createCompleteMenu(mode, SetupStep.Complete);

/* done button */
completeMenu.text(texts.buttons.done, (context) => {
  const { session } = context;
  const { state, metadata, monitors } = session;
  const setup = state[mode]!;
  const { monitor } = setup;
  delete state[mode]; // reset setup state
  monitors.push(monitor);
  metadata.lastMonitorId = monitor.id;
  context.menu.close();
  const message = setupTemplates.renderSuccessMessage();
  context.reply(message);
});

menu.register(selectCategoriesMenu);
menu.register(completeMenu);

export default menu;
