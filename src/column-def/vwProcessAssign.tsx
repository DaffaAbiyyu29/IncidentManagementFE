import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const defaultColumns = [
  "ID",
  "IsActive",
  "LastModified",
  "LeaderName",
  "NRP",
  "OperatorName",
  "ProcessAssignType",
  "ProcessID",
  "ProcessassignStatus",
  "Startassign",
  "Stopassign",
  "TglAssign",
  "UnitID",
  "lastStart",
  "lastStop",
  "remark",
  "Action",
];

// Fungsi untuk validasi dan format tanggal
const formatDate = (date?: string | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return <span className="text-red-500 font-bold">N/A</span>;
  }
  return format(new Date(date), "EEEE, dd MMMM yyyy", { locale: id });
};

export const columns = (
  handleViewClick: any
): ColumnDef<IDataVwProcessAssign>[] => [
  { accessorKey: "ID", header: "ID", enableSorting: true },
  { accessorKey: "IsActive", header: "Active Status", enableSorting: true },
  { accessorKey: "LeaderName", header: "Leader Name", enableSorting: true },
  { accessorKey: "NRP", header: "NRP", enableSorting: true },
  { accessorKey: "OperatorName", header: "Operator Name", enableSorting: true },
  {
    accessorKey: "ProcessAssignType",
    header: "Assign Type",
    enableSorting: true,
  },
  { accessorKey: "ProcessID", header: "Process ID", enableSorting: true },
  {
    accessorKey: "ProcessassignStatus",
    header: "Assign Status",
    enableSorting: true,
  },
  { accessorKey: "Startassign", header: "Start Assign", enableSorting: true },
  { accessorKey: "Stopassign", header: "Stop Assign", enableSorting: true },

  {
    accessorKey: "TglAssign",
    header: "Assign Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.TglAssign)}
      </span>
    ),
  },

  { accessorKey: "UnitID", header: "Unit ID", enableSorting: true },

  {
    accessorKey: "lastStart",
    header: "Last Start",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.lastStart)}
      </span>
    ),
  },

  {
    accessorKey: "lastStop",
    header: "Last Stop",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.lastStop)}
      </span>
    ),
  },

  { accessorKey: "remark", header: "Remark", enableSorting: true },

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
