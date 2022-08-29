import type { IMonitor } from '../../../models/Monitor';
import { SetupStep } from '../../types';

export interface ISetupState {
  step: SetupStep;
  monitor: IMonitor;
}

export const initializeNewSetupState = (monitor: IMonitor): ISetupState => {
  return {
    step: SetupStep.Categories, // go to NewSetupStep.Categories
    monitor: { ...monitor }
  };
};

export const initializeEditSetupState = (monitor: IMonitor): ISetupState => {
  return {
    step: SetupStep.Idle,
    monitor: { ...monitor }
  };
};
