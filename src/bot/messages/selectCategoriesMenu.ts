import debugFactory from 'debug';
import * as setupTemplates from '../../templates/setup';

const debug = debugFactory('lihkg-monitor-bot:bot:messages:selectCategoriesMenu');

export const renderSelectCategoriesMenuMessage = () => {
  const message = setupTemplates.renderSelectCategoriesMessage();
  return message;
};
