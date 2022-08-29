import { Menu } from '@grammyjs/menu';
import debugFactory from 'debug';
import { renderMonitorItemMenuMessage } from '../messages/monitorItemMenu';
import { MenuId, TContext } from '../types';
import monitorItemMenu from './monitorItem';

const debug = debugFactory('lihkg-monitor-bot:bot:menus:monitorList');

const maxNumMonitorsPerRow = 2;

/** monitor list menu */
const menu = new Menu<TContext>(MenuId.MonitorList);

/* monitors */
menu.dynamic((context, range) => {
  const { monitors } = context.session;
  monitors.forEach((monitor, index) => {
    range.text(monitor.name, async (context) => {
      const { state } = context.session;
      state.monitorId = monitor.id;
      /* open monitor item menu */
      const message = renderMonitorItemMenuMessage(context);
      context.editMessageText(message, { reply_markup: monitorItemMenu, parse_mode: 'MarkdownV2'});
    });
    if ((index !== monitors.length - 1) && ((index + 1) % maxNumMonitorsPerRow === 0)) {
      range.row();
    }
  });
});

menu.register(monitorItemMenu);

export default menu;
