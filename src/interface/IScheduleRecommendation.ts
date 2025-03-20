interface IScheduleRecommendation {
  PN: string;
  PRO?: number;
  Product?: string;
  ProductGroup?: string;
  Process?: string;
  Dependency?: string;
  Maksimal_Produksi_per_Base?: number;
  ProcessOrder?: string;
  PlanStartDate?: string;
  PlanEndDate?: string;
  Start_Date?: string;
  End_Date?: string;
  Estimated_Material_Arrived?: string;
  Lead_Time_Process_Standar?: number;
  Lead_Time_Estimation_Process?: number;
  Process_Status?: string;
  MPSDueDate?: string;
  Finished_Prediction?: string;
  Status_Unit_Delivery?: string;
  Capacity_Utilization?: number;
  Status_Capacity?: string;
  Status_Material?: string;
  SLACC: string;
  SLAUser: string;
  Status: string;
}
