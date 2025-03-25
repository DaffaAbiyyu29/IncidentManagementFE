import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const defaultColumns = [
  "ProcessID",
  "UnitID",
  "ProcessStatus",
  "ProcessPlanStartDate",
  "ProcessPlanEndDate",
  "ProcessPlanDuration",
  "ProcessActualStartDate",
  "ProcessActualEndDate",
  "ProcessActualDuration",
  "MasterProcessName",
  "StandardMH",
  "ProcessGroupName",
  "ProcessDelayInDay",
  "ProcessOrder",
  "LastModified",
  "MasterProcessID",
  "Action",
];

// Fungsi untuk validasi dan format tanggal
const formatDate = (date?: string | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return <span className="text-red-500 font-bold">N/A</span>;
  }
  return format(new Date(date), "EEEE, dd MMMM yyyy", { locale: id });
};

export const columns = (handleViewClick: any): ColumnDef<IDataVwProcess>[] => [
  { accessorKey: "ProcessID", header: "Process ID", enableSorting: true },
  { accessorKey: "UnitID", header: "Unit ID", enableSorting: true },
  {
    accessorKey: "ProcessStatus",
    header: "Process Status",
    enableSorting: true,
  },
  {
    accessorKey: "MasterProcessID",
    header: "Master Process ID",
    enableSorting: true,
  },
  {
    accessorKey: "MasterProcessName",
    header: "Process Name",
    enableSorting: true,
  },

  // Tanggal
  {
    accessorKey: "ProcessPlanStartDate",
    header: "Process Plan Start Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.ProcessPlanStartDate)}
      </span>
    ),
  },
  {
    accessorKey: "ProcessPlanEndDate",
    header: "Process Plan End Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.ProcessPlanEndDate)}
      </span>
    ),
  },
  {
    accessorKey: "ProcessPlanDuration",
    header: "Plan Duration",
    enableSorting: true,
  },
  {
    accessorKey: "ProcessActualStartDate",
    header: "Actual Start Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.ProcessActualStartDate)}
      </span>
    ),
  },
  {
    accessorKey: "ProcessActualEndDate",
    header: "Actual End Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.ProcessActualEndDate)}
      </span>
    ),
  },
  {
    accessorKey: "ProcessActualDuration",
    header: "Actual Duration",
    enableSorting: true,
  },

  // Detail Tambahan
  { accessorKey: "StandardMH", header: "Standard MH", enableSorting: true },
  {
    accessorKey: "ProcessGroupName",
    header: "Process Group",
    enableSorting: true,
  },
  {
    accessorKey: "ProcessDelayInDay",
    header: "Delay (Days)",
    enableSorting: true,
  },
  { accessorKey: "ProcessOrder", header: "Process Order", enableSorting: true },

  // Metadata
  {
    accessorKey: "LastModified",
    header: "Last Modified Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.LastModified)}
      </span>
    ),
  },

  // Aksi
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
