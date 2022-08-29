import { Menu } from '@grammyjs/menu';
import debugFactory from 'debug';
import * as texts from '../../constants/texts';
import * as monitorTemplates from '../../templates/monitor';
import { renderMonitorItemMenuMessage } from '../messages/monitorItemMenu';
import { selectMonitor } from '../session/session';
import { MenuId, TContext } from '../types';

const debug = debugFactory('lihkg-monitor-bot:bot:menus:delete');

/** delete menu */
const menu = new Menu<TContext>(MenuId.MonitorItemDelete);

/* delete button */
menu.text(texts.buttons.delete, (context) => {
  const { state, monitors } = context.session;
  const { monitorId } = state;
  const monitor = selectMonitor(monitorId!)(context.session);
  const index = monitors.indexOf(monitor);
  monitors.splice(index, 1);
  delete state.monitorId;
  const message = monitorTemplates.renderDeleteMonitorSuccessMessage(monitor);
  context.menu.close();
  context.editMessageText(message);
});

/* back button */
menu.row().back(texts.buttons.back, (context, next) => {
  const message = renderMonitorItemMenuMessage(context);
  context.editMessageText(message, { parse_mode: 'MarkdownV2' });
  next();
});

export default menu;
