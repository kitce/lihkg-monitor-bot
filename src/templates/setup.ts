import { render } from 'mustache';
import { getTemplate, patchMonitor } from '../helpers/template';
import type { IMonitor } from '../models/Monitor';
import {
  monitorCategoriesMessageTemplate,
  monitorEmptyCategoriesMessageTemplate,
  monitorKeywordsMessageTemplate,
  monitorSettingsMessageTemplate,
  monitorStatusMessageTemplate,
  renderMonitorInformationMessage
} from './monitor';

export const setupNewMonitorMessageTemplate = getTemplate('setup/newMonitorMessage');
export const setupSelectCategoriesMessageTemplate = getTemplate('setup/selectCategoriesMessage');
export const setupKeywordsMessageTemplate = getTemplate('setup/keywordsMessage');
export const setupNameMessageTemplate = getTemplate('setup/nameMessage');
export const setupSuccessMessageTemplate = getTemplate('setup/successMessage');
export const setupCancelMessageTemplate = getTemplate('setup/cancelMessage');
export const setupEditMonitorMessageTemplate = getTemplate('setup/editMonitorMessage');

export const renderNewMonitorMessage = () => {
  return setupNewMonitorMessageTemplate;
};

export const renderSelectCategoriesMessage = () => {
  return setupSelectCategoriesMessageTemplate;
};

export const renderSelectCategoriesAcknowledgementMessage = (monitor: IMonitor) => {
  return render(
    monitorCategoriesMessageTemplate,
    { ...patchMonitor(monitor) },
    { monitorEmptyCategoriesMessageTemplate }
  );
};

export const renderEnterKeywordsMessage = () => {
  return setupKeywordsMessageTemplate;
};

export const renderEnterNameMessage = () => {
  return setupNameMessageTemplate;
};

export const renderCompleteMessage = (monitor: IMonitor) => {
  return renderMonitorInformationMessage(monitor);
};

export const renderSuccessMessage = () => {
  return setupSuccessMessageTemplate;
};

export const renderCancelMessage = () => {
  return setupCancelMessageTemplate;
};

export const renderEditMonitorMessage = (monitor: IMonitor) => {
  return render(
    setupEditMonitorMessageTemplate,
    { ...patchMonitor(monitor) },
    {
      monitorSettingsMessageTemplate,
      monitorCategoriesMessageTemplate,
      monitorEmptyCategoriesMessageTemplate,
      monitorKeywordsMessageTemplate,
      monitorStatusMessageTemplate
    }
  );
};
