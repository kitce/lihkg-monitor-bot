export interface IMetadata {
  lastMonitorId: number;
}

export const createInitialMetadata = (): IMetadata => {
  return {
    lastMonitorId: 0
  };
};
