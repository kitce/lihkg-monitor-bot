import { render } from 'mustache';
import { getTemplate, patchMonitor } from '../helpers/template';
import type { IMonitor } from '../models/Monitor';

export const monitorInformationMessageTemplate = getTemplate('monitor/informationMessage');
export const monitorSettingsMessageTemplate = getTemplate('monitor/settingsMessage');
export const monitorCategoriesMessageTemplate = getTemplate('monitor/categoriesMessage');
export const monitorEmptyCategoriesMessageTemplate = getTemplate('monitor/emptyCategoriesMessage');
export const monitorKeywordsMessageTemplate = getTemplate('monitor/keywordsMessage');
export const monitorStatusMessageTemplate = getTemplate('monitor/statusMessage');
export const monitorDeleteConfirmMessageTemplate = getTemplate('monitor/deleteConfirmMessage');
export const monitorDeleteSuccessMessageTemplate = getTemplate('monitor/deleteSuccessMessage');
export const monitorEmptyListMessageTemplate = getTemplate('monitor/emptyListMessage');
export const monitorListMessageTemplate = getTemplate('monitor/listMessage');
export const monitorItemMessageTemplate = getTemplate('monitor/itemMessage');

export const renderMonitorInformationMessage = (monitor: IMonitor) => {
  return render(
    monitorInformationMessageTemplate,
    { ...patchMonitor(monitor) },
    {
      monitorSettingsMessageTemplate,
      monitorCategoriesMessageTemplate,
      monitorEmptyCategoriesMessageTemplate,
      monitorKeywordsMessageTemplate
    }
  );
};

export const renderDeleteMonitorConfirmMessage = (monitor: IMonitor) => {
  return render(monitorDeleteConfirmMessageTemplate, { ...patchMonitor(monitor) });
};

export const renderDeleteMonitorSuccessMessage = (monitor: IMonitor) => {
  return render(monitorDeleteSuccessMessageTemplate, { ...patchMonitor(monitor) });
};

export const renderNoMonitorsHintMessage = () => {
  return monitorEmptyListMessageTemplate;
};

export const renderMonitorListMessage = () => {
  return monitorListMessageTemplate;
};

export const renderMonitorItemMessage = (monitor: IMonitor) => {
  return render(monitorItemMessageTemplate, { ...patchMonitor(monitor) });
};
