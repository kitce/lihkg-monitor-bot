import { Menu } from '@grammyjs/menu';
import debugFactory from 'debug';
import * as texts from '../../constants/texts';
import { renderDeleteMenuMessage } from '../messages/deleteMenu';
import { renderEditMenuMessage } from '../messages/editMenu';
import { renderMonitorListMenuMessage } from '../messages/monitorListMenu';
import { selectMonitor } from '../session/session';
import { initializeEditSetupState } from '../session/slices/setup';
import { MenuId, SetupMode, TContext } from '../types';
import deleteMenu from './delete';
import editMenu from './edit';

const debug = debugFactory('lihkg-monitor-bot:bot:menus:monitorItem');

/** monitor item menu */
const menu = new Menu<TContext>(MenuId.MonitorItem);

/* delete menu */
menu.text(texts.buttons.delete, (context) => {
  const message = renderDeleteMenuMessage(context);
  context.editMessageText(message, { reply_markup: deleteMenu, parse_mode: 'MarkdownV2' });
});

/* edit menu */
menu.text(texts.buttons.edit, (context) => {
  const { state } = context.session;
  const { monitorId } = state;
  const monitor = selectMonitor(monitorId!)(context.session);
  state[SetupMode.Edit] = initializeEditSetupState(monitor);
  const message = renderEditMenuMessage(context);
  context.editMessageText(message, { reply_markup: editMenu, parse_mode: 'MarkdownV2' });
});

/* back button */
menu.row().back(texts.buttons.back, (context, next) => {
  const { state } = context.session;
  delete state.monitorId;
  const message = renderMonitorListMenuMessage(context);
  context.editMessageText(message);
  next();
});

menu.register(deleteMenu);
menu.register(editMenu);

export default menu;
