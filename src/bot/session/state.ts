import { SetupMode } from '../types';
import type { ISetupState } from './slices/setup';

export interface IState {
  /** the current operating monitor ID */
  monitorId?: number;
  [SetupMode.New]?: ISetupState;
  [SetupMode.Edit]?: ISetupState;
}

export const createInitialState = (): IState => {
  return {};
};
