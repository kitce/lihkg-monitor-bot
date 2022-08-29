import { Menu } from '@grammyjs/menu';
import debugFactory from 'debug';
import * as texts from '../../constants/texts';
import * as setupTemplates from '../../templates/setup';
import type { SetupMode, SetupStep, TContext } from '../types';

const debug = debugFactory('lihkg-monitor-bot:bot:menus:complete');

/** complete menu factory */
export const createCompleteMenu = (mode: SetupMode, id: SetupStep) => {
  const completeMenu = new Menu<TContext>(id);
  /* cancel button */
  completeMenu.text(texts.buttons.cancel, (context) => {
    debug('cancel');
    const { state } = context.session;
    delete state[mode]; // reset setup state
    context.menu.close();
    const message = setupTemplates.renderCancelMessage();
    context.editMessageText(message);
  });
  return completeMenu;
};

