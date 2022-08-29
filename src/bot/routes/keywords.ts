import type { Router } from '@grammyjs/router';
import debugFactory from 'debug';
import type { MiddlewareFn } from 'grammy';
import { deduplicate } from '../../helpers/array';
import { getSetupStepRoutePath } from '../helpers/route';
import type { SetupMode, SetupStep, TContext } from '../types';

const debug = debugFactory('lihkg-monitor-bot:bot:routes:keywords');

const mapTextToKeywords = (text: string) => {
  const keywords = text.replace(/\n/, '').split(/[,\s]/).filter((keyword) => !!keyword);
  return deduplicate(keywords);
};

/** keywords route factory */
export const createKeywordsRoute = (mode: SetupMode, router: Router<TContext>, step: SetupStep, ...middleware: MiddlewareFn<TContext>[]) => {
  const path = getSetupStepRoutePath(mode, step);
  const route = router.route(path);
  route.on('message:text', async (context, next) => {
    const { state } = context.session;
    const { monitor } = state[mode]!;
    const { text } = context.message;
    const keywords = mapTextToKeywords(text);
    debug('keywords', keywords);
    monitor.keywords = deduplicate(keywords);
    return next();
  }, ...middleware);
  return route;
};
