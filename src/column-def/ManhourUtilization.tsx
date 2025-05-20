import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { IDataUnit } from "@/interface/IDataManhourUtilization";
import { formattedDate } from "@/helper/formattedDate";
import { parse, format, addDays } from "date-fns";
import { id } from "date-fns/locale";

export const defaultColumns = [
  "proNumber",
  "unitSerialNumber",
  "productGroupName",
  "productName",
  // "processCount",
  // "processCompleted",
  "standardMH",
  "mhUtilization",
  "mhDiscrepancy",
  "actualHours",
  "progressPercent",
  "mpsDueDate",
  "Action",
];

const formatDate = (date?: string | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return <span className="text-red-500 font-bold">N/A</span>;
  }
  return format(new Date(date), "EEEE, dd MMMM yyyy", { locale: id });
};

export const columns = (handleViewClick: any): ColumnDef<IDataUnit>[] => [
  { accessorKey: "proNumber", header: "PRO Number", enableSorting: true },
  {
    accessorKey: "unitSerialNumber",
    header: "Serial Number",
    enableSorting: true,
  },
  {
    accessorKey: "productGroupName",
    header: "Product Group",
    enableSorting: true,
  },
  { accessorKey: "productName", header: "Product Name", enableSorting: true },
  {
    accessorKey: "unitPlanStartDate",
    header: "Plan Start Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.unitPlanStartDate)}
      </span>
    ),
  },
  {
    accessorKey: "unitPlanEndDate",
    header: "Plan End Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.unitPlanEndDate)}
      </span>
    ),
  },
  {
    accessorKey: "unitPlanDuration",
    header: "Plan Duration",
    enableSorting: true,
  },
  {
    accessorKey: "unitActualStartDate",
    header: "Actual Start Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.unitActualStartDate)}
      </span>
    ),
  },
  {
    accessorKey: "unitActualEndDate",
    header: "Actual End Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.unitActualEndDate)}
      </span>
    ),
  },
  {
    accessorKey: "unitActualDuration",
    header: "Actual Duration",
    enableSorting: true,
  },
  {
    accessorKey: "unitDelayInDay",
    header: "Delay (Days)",
    enableSorting: true,
  },
  { accessorKey: "standardMH", header: "Standard MH", enableSorting: true },
  {
    accessorKey: "actualHours",
    header: "Actual Hours",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {row.original.actualHours.toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: "mhUtilization",
    header: "MH Utilization",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {row.original.mhUtilization}%
      </span>
    ),
  },
  {
    accessorKey: "mhDiscrepancy",
    header: "MH Discrepancy",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {row.original.mhDiscrepancy}%
      </span>
    ),
  },
  { accessorKey: "processCount", header: "Total Process", enableSorting: true },
  {
    accessorKey: "processCompleted",
    header: "Total Process Selesai",
    enableSorting: true,
  },
  {
    accessorKey: "progressPercent",
    header: "Progress",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {row.original.progressPercent}%
      </span>
    ),
  },
  {
    accessorKey: "mpsDueDate",
    header: "MPS Due Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.mpsDueDate)}
      </span>
    ),
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex space-x-1 justify-center">
        <button
          className="btn btn-icon bg-blue-500 btn-xs transition-transform hover:scale-[105%] active:scale-[100%]"
          onClick={() => handleViewClick(row.original)}
        >
          <i className="ki-outline ki-eye text-white"></i>
        </button>
      </div>
    ),
  },
];
