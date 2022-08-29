import { getTemplate } from './../helpers/template';

export const botInvalidActionMessageTemplate = getTemplate('bot/invalidActionMessage');
export const cancelActionMessageTemplate = getTemplate('bot/cancelActionMessage');

export const renderInvalidActionMessage = () => {
  return botInvalidActionMessageTemplate;
};

export const renderCancelActionMessage = () => {
  return cancelActionMessageTemplate;
};

export const renderCheckboxButtonLabel = (checked: boolean, checkedText: string, uncheckedText?: string) => {
  if (checked) {
    return `☑️ ${checkedText}`;
  }
  return `◻️ ${uncheckedText || checkedText}`;
};
