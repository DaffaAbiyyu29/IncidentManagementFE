type IDataVwProcess = {
  ProcessID: number;
  UnitID: number;
  ProcessStatus: string;
  ProcessPlanStartDate: string;
  ProcessPlanEndDate: string;
  ProcessPlanDuration: number;
  ProcessActualStartDate: string;
  ProcessActualEndDate: string;
  ProcessActualDuration: number;
  MasterProcessName: string;
  StandardMH: string;
  ProcessGroupName: string;
  ProcessDelayInDay: number;
  ProcessOrder: number;
  LastModified: string;
  MasterProcessID: number;
  RatioPercent: number;
};
