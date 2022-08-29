import type { NextFunction } from 'grammy';
import type { SetupMode, SetupStep, TContext } from '../types';

export const getSetupStepRoutePath = (mode: SetupMode, step: SetupStep) => {
  return `${mode}${step}`;
};

export const updateSetupStep = (mode: SetupMode, step: SetupStep) => (context: TContext, next: NextFunction) => {
  const { state } = context.session;
  const setup = state[mode]!;
  setup.step = step;
  return next();
};
