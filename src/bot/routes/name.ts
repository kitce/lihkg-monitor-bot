import type { Router } from '@grammyjs/router';
import debugFactory from 'debug';
import type { MiddlewareFn } from 'grammy';
import { getSetupStepRoutePath } from '../helpers/route';
import type { SetupMode, SetupStep, TContext } from '../types';

const debug = debugFactory('lihkg-monitor-bot:bot:routes:name');

/** name route factory */
export const createNameRoute = (mode: SetupMode, router: Router<TContext>, step: SetupStep, ...middleware: MiddlewareFn<TContext>[]) => {
  const path = getSetupStepRoutePath(mode, step);
  const route = router.route(path);
  route.on('message:text', async (context, next) => {
    const { state } = context.session;
    const { monitor } = state[mode]!;
    const { text: name } = context.message;
    debug('name', name);
    monitor.name = name;
    return next();
  }, ...middleware);
  return route;
};
