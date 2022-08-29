import { CategoryId } from '@kitce/lihkg-api-node/types';

export interface IMonitor {
  id: number;
  name: string;
  keywords: string[];
  categoryIds: CategoryId[];
  disabled: boolean;
}

class Monitor implements IMonitor {
  id: number;
  name: string;
  keywords: string[];
  categoryIds: CategoryId[];
  disabled: boolean;

  constructor (id: number, name: string, keywords: string[], categoryIds: CategoryId[], disabled: boolean) {
    this.id = id;
    this.name = name;
    this.keywords = keywords;
    this.categoryIds = categoryIds;
    this.disabled = disabled;
  }

  static factory (id: number): IMonitor {
    return {
      id,
      name: '',
      keywords: [],
      categoryIds: [],
      disabled: false
    };
  }
}

export default Monitor;
