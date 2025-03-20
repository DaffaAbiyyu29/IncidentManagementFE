import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { parse, format, addDays } from "date-fns";
import { id } from "date-fns/locale";

export const defaultColumns = [
  "PN",
  "PRO",
  "Product",
  "ProductGroup",
  "Process",
  "PlanStartDate",
  "PlanEndDate",
  "Start_Date",
  "Estimated_Material_Arrived",
  "Lead_Time_Estimation_Process",
  "MPS_Due_Date",
  "Finished_Prediction",
  "End_Date",
  "Capacity_Utilization",
  "Process_Status",
  "Status_Unit_Delivery",
  "Status_Material",
  "Status",
  "Action",
];

export const columns = (
  handleViewClick: any
): ColumnDef<IScheduleRecommendation>[] => [
  { accessorKey: "PN", header: "PN", enableSorting: true },
  { accessorKey: "PRO", header: "PRO", enableSorting: true },
  { accessorKey: "Product", header: "Product", enableSorting: true },
  {
    accessorKey: "ProductGroup",
    header: "Product Group",
    enableSorting: true,
  },
  { accessorKey: "Process", header: "Process", enableSorting: true },
  { accessorKey: "Dependency", header: "Dependency", enableSorting: true },
  {
    accessorKey: "Maksimal_Produksi_per_Base",
    header: "Max Production/Base",
    enableSorting: true,
  },
  {
    accessorKey: "ProcessOrder",
    header: "Process Order",
    enableSorting: true,
  },
  {
    accessorKey: "PlanStartDate",
    header: "Plan Start Date",
    enableSorting: true,
  },
  {
    accessorKey: "PlanEndDate",
    header: "Plan End Date",
    enableSorting: true,
  },
  { accessorKey: "Start_Date", header: "Start Date", enableSorting: true },
  { accessorKey: "End_Date", header: "End Date", enableSorting: true },
  {
    accessorKey: "Estimated_Material_Arrived",
    header: "Est. Material Arrived",
    enableSorting: true,
  },
  {
    accessorKey: "Lead_Time_Process_Standar",
    header: "Lead Time Std",
    enableSorting: true,
  },
  {
    accessorKey: "Lead_Time_Estimation_Process",
    header: "Lead Time Estimation",
    enableSorting: true,
  },
  {
    accessorKey: "Process_Status",
    header: "Process Status",
    enableSorting: true,
  },
  { accessorKey: "MPSDueDate", header: "MPS Due Date", enableSorting: true },
  {
    accessorKey: "Finished_Prediction",
    header: "Finished Prediction",
    enableSorting: true,
  },
  {
    accessorKey: "Status_Unit_Delivery",
    header: "Status Unit Delivery",
    enableSorting: true,
  },
  {
    accessorKey: "Capacity_Utilization",
    header: "Capacity Utilization",
    enableSorting: true,
  },
  {
    accessorKey: "Status_Capacity",
    header: "Status Capacity",
    enableSorting: true,
  },
  {
    accessorKey: "Status_Material",
    header: "Status Material",
    enableSorting: true,
  },
  { accessorKey: "SLACC", header: "SLACC", enableSorting: true },
  { accessorKey: "SLAUser", header: "SLA User", enableSorting: true },
  { accessorKey: "Status", header: "Status", enableSorting: true },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex space-x-1 justify-center">
        <button
          className="btn btn-icon bg-blue-500 btn-xs transition-transform hover:scale-[105%] active:scale-[100%]"
          onClick={() => handleViewClick(row.original)}
          // data-modal-toggle="#modalDetail"
        >
          <i className="ki-outline ki-eye text-white"></i>
        </button>
      </div>
    ),
  },
];
