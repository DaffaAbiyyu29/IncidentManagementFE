type Manhour = {
  ProcessID: number;
  UnitID: number;
  ProcessAssignID: number;
  ProcessActivityID: number;
  ProcessGroupName: string;
  MasterProcessName: string;
  ProcessOrder: string;
  ProcessStatus: string;
  ProcessPlanStartDate: string | null;
  ProcessPlanEndDate: string | null;
  ProcessPlanDuration: number | null;
  ProcessActualStartDate: string | null;
  ProcessActualEndDate: string | null;
  ProcessActualDuration: number | null;
  ProcessDelayInDay: number | null;
  StandardMH: number | null;
  TglAssign: string | null;
  OperatorName: string;
  StatusAssign: string;
  TypeAssign: string;
  StatusActivity: string;
  ActivityDateTime: string | null;
  ActualHours: number | null;
};
