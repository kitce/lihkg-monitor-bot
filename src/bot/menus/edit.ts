import { Menu } from '@grammyjs/menu';
import debugFactory from 'debug';
import * as texts from '../../constants/texts';
import { updateSetupStep } from '../helpers/route';
import { renderEditMenuMessage } from '../messages/editMenu';
import { renderKeywordsRouteMessage } from '../messages/keywordsRoute';
import { renderMonitorItemMenuMessage } from '../messages/monitorItemMenu';
import { renderNameRouteMessage } from '../messages/nameRoute';
import { renderSelectCategoriesMenuMessage } from '../messages/selectCategoriesMenu';
import { selectMonitorIndex } from '../session/session';
import { MenuId, SetupMode, SetupStep, TContext } from '../types';
import { createSelectCategoriesMenu } from './selectCategories';

const debug = debugFactory('lihkg-monitor-bot:bot:menus:edit');

const mode = SetupMode.Edit;

/** edit monitor menu */
const menu = new Menu<TContext>(MenuId.MonitorItemEdit);

/* edit categories */
menu.text(texts.buttons.editCategories, updateSetupStep(mode, SetupStep.Categories), (context) => {
  debug('edit categories');
  const message = renderSelectCategoriesMenuMessage();
  context.editMessageText(message, { reply_markup: selectCategoriesMenu });
});

/** select categories menu */
const selectCategoriesMenu = createSelectCategoriesMenu(mode, SetupStep.Categories);

/** select categories confirm button */
selectCategoriesMenu.row().text(texts.buttons.confirm, updateSetupStep(mode, SetupStep.Idle), (context) => {
  const { state, monitors } = context.session;
  const setup = state[mode];
  const { monitor } = setup!;
  debug('categories', monitor.categoryIds);
  /* save the monitor to session */
  const index = selectMonitorIndex(monitor.id)(context.session);
  monitors[index] = monitor;
  const message = renderEditMenuMessage(context);
  context.editMessageText(message, { parse_mode: 'MarkdownV2' });
  context.menu.back();
});

/** select categories menu back button */
selectCategoriesMenu.row().back(texts.buttons.back, updateSetupStep(mode, SetupStep.Idle), (context, next) => {
  const message = renderEditMenuMessage(context);
  context.editMessageText(message, { parse_mode: 'MarkdownV2' });
  return next();
});

/* edit keywords */
menu.text(texts.buttons.editKeywords, updateSetupStep(mode, SetupStep.Keywords), (context) => {
  debug('edit keywords');
  const keywordsRouteMessage = renderKeywordsRouteMessage();
  context.reply(keywordsRouteMessage);
});

/* edit name */
menu.row().text(texts.buttons.editName, updateSetupStep(mode, SetupStep.Name), (context) => {
  debug('edit name');
  const nameRouteMessage = renderNameRouteMessage();
  context.reply(nameRouteMessage);
});

/* enable/disable */
menu.text(
  (context) => {
    const { state } = context.session;
    const { monitor } = state[mode]!;
    return monitor.disabled ? texts.buttons.enable : texts.buttons.disable;
  },
  (context) => {
    const { state, monitors } = context.session;
    const { monitor } = state[mode]!;
    monitor.disabled = !monitor.disabled;
    /* save the monitor to session */
    const index = selectMonitorIndex(monitor.id)(context.session);
    monitors[index] = monitor;
    const message = renderEditMenuMessage(context);
    context.editMessageText(message, { parse_mode: 'MarkdownV2' });
  }
);

/* back button */
menu.row().back(texts.buttons.back, (context, next) => {
  const { state } = context.session;
  delete state[mode];
  const message = renderMonitorItemMenuMessage(context);
  context.editMessageText(message, { parse_mode: 'MarkdownV2' });
  return next();
});

menu.register(selectCategoriesMenu);

export default menu;
