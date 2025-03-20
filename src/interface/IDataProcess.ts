type IDataProcess = {
  ID: number;
  UnitID: number;
  MasterProcessID: number;
  Status: number;
  PlanStartDate: Date;
  PlanEndDate?: Date | null;
  ActualStartDate?: Date | null;
  ActualEndDate?: Date | null;
  IsHold: boolean;
  HoldDate?: Date | null;
  Created: Date;
  CreatedBy: string;
  LastModified: Date;
  LastModifiedBy: string;
};
