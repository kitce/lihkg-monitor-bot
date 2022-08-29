import { Menu } from '@grammyjs/menu';
import { CategoryId } from '@kitce/lihkg-api-node/types';
import debugFactory from 'debug';
import xor from 'lodash/xor';
import * as texts from '../../constants/texts';
import { mapCategoryIdToCategoryName } from '../../helpers/lihkg';
import * as botTemplates from '../../templates/bot';
import type { SetupMode, TContext } from '../types';

const debug = debugFactory('lihkg-monitor-bot:bot:menus:selectCategories');

const numCategoriesPerRow = 3;

const categoryChoices = Object.values(CategoryId).filter((categoryId) => {
  const blacklist = [
    CategoryId.Hot,
    CategoryId.Latest,
    CategoryId.Adult,
    CategoryId.BlackHole,
    CategoryId.Custom
  ];
  return !blacklist.includes(categoryId);
});

/** select categories menu factory */
export const createSelectCategoriesMenu = (mode: SetupMode, id: string) => {
  const menu = new Menu<TContext>(id);
  /* category choices */
  menu.dynamic((context, range) => {
    categoryChoices.forEach((categoryId, index) => {
      range.text(
        async (context) => {
          const { state } = context.session;
          const { monitor } = state[mode]!;
          const checked = !!monitor.categoryIds.includes(categoryId);
          const categoryName = mapCategoryIdToCategoryName(categoryId);
          return botTemplates.renderCheckboxButtonLabel(checked, categoryName);
        },
        async (context) => {
          const { state } = context.session;
          const { monitor } = state[mode]!;
          monitor.categoryIds = xor(monitor.categoryIds, [categoryId]);
          await context.menu.update({ immediate: true });
        }
      );
      if ((index !== categoryChoices.length - 1) && ((index + 1) % numCategoriesPerRow === 0)) {
        range.row();
      }
    });
  });
  /* select all button */
  menu.row().text(
    (context) => {
      const { state } = context.session;
      const { monitor } = state[mode]!;
      const checked = monitor.categoryIds.length === categoryChoices.length;
      return botTemplates.renderCheckboxButtonLabel(checked, texts.buttons.selectAll);
    },
    async (context) => {
      const { state } = context.session;
      const { monitor } = state[mode]!;
      const { categoryIds } = monitor;
      const checked = categoryIds.length === categoryChoices.length;
      monitor.categoryIds = checked ? [] : [...categoryChoices];
      context.menu.update();
    }
  );
  return menu;
};
