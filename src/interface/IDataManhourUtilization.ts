export interface IDataUnit {
  proNumber: string | null;
  unitSerialNumber: string;
  productGroupName: string | null;
  productName: string | null;
  processCount: number;
  processCompleted: number;
  progressPercent: number;
  standardMH: number;
  actualHours: number;
  mhUtilization: number;
  mhDiscrepancy: number;
  unitPlanStartDate: string | null;
  unitPlanEndDate: string | null;
  unitPlanDuration: number | null;
  unitActualStartDate: string | null;
  unitActualEndDate: string | null;
  unitActualDuration: number | null;
  unitDelayInDay: number | null;
  mpsDueDate: string | null;
}

export type IDataProcess = {
  ProcessID: number;
  UnitID: number;
  ProcessStatus: string;
  ProcessPlanStartDate: Date;
  ProcessPlanEndDate: Date;
  ProcessPlanDuration: number;
  ProcessActualStartDate: Date;
  ProcessActualEndDate: Date;
  ProcessActualDuration: number;
  MasterProcessName: string;
  StandardMH: number;
  ProcessGroupName: string;
  ProcessDelayInDay: number;
  ProcessOrder: number;
  LastModified: Date;
  MasterProcessID: number;
};

export type IDataProcessAssign = {
  ID: number;
  ProcessID: number;
  UnitID: number;
  LeaderName: string;
  OperatorName: string;
  NRP: string;
  TglAssign: Date;
  ProcessassignStatus: string;
  Startassign: string;
  Stopassign: string;
  ProcessAssignType: string;
  LastModified: Date;
  lastStart: Date;
  lastStop: Date;
  remark: string;
  IsActive: number;
};

export type IDataProcessActivity = {
  atasan: string;
  EmployeeNumber: number;
  ActivityDateTime: Date;
  ProcessActivityID: number;
  ProcessAssignID: number;
  ProcessActivityName: string;
  ProcessActivityStatus: string;
  ProcessActivityReasonPause: string;
  ActualHoursNonProductive: number;
  ProcessActivityActualHours: number;
  ProcessActivityDateTime: Date;
  LastModifiedBy: string;
  LastModified: Date;
};
