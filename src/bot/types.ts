import type { Menu } from '@grammyjs/menu';
import type { CategoryId, CategoryName } from '@kitce/lihkg-api-node/types';
import type { Context, SessionFlavor } from 'grammy';
import type { IMonitor } from '../models/Monitor';
import type { IMetadata } from './session/meta';
import type { IState } from './session/state';

export enum SetupMode {
  New = 'new',
  Edit = 'edit'
}

export enum SetupStep {
  Idle = 'SetupStepIdle',
  Categories = 'SetupStepCategories',
  Keywords = 'SetupStepKeywords',
  Name = 'SetupStepName',
  Complete = 'SetupStepComplete'
}

export enum MenuId {
  NewMonitor = 'NewMonitor',
  Categories = 'Categories',
  MonitorList = 'MonitorList',
  MonitorItem = 'MonitorItem',
  MonitorItemDelete = 'MonitorItemDelete',
  MonitorItemEdit = 'MonitorItemEdit',
}

export type TCategoryChoice = [CategoryId, CategoryName];

export interface ISession {
  state: IState;
  metadata: IMetadata;
  monitors: IMonitor[];
}

export type TMenuButtonText = Parameters<Menu<TContext>['text']>[0];
export type TMenuMiddleware = Parameters<Menu<TContext>['text']>[1];

export type TContext = Context & SessionFlavor<ISession>;
