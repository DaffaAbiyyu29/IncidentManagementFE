import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const defaultColumns = [
  // "ID",
  "UnitID",
  "MasterProcessID",
  "Status",
  "PlanStartDate",
  "PlanEndDate",
  "ActualStartDate",
  "ActualEndDate",
  "IsHold",
  "HoldDate",
  "Created",
  "CreatedBy",
  "LastModified",
  "LastModifiedBy",
  "Action",
];

// Fungsi untuk validasi dan format tanggal
const formatDate = (date?: Date | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return <span className="text-red-500 font-bold">N/A</span>;
  }
  return format(new Date(date), "EEEE, dd MMMM yyyy", { locale: id });
};

export const columns = (handleViewClick: any): ColumnDef<IDataProcess>[] => [
  { accessorKey: "ID", header: "ID", enableSorting: true },
  { accessorKey: "UnitID", header: "Unit ID", enableSorting: true },
  {
    accessorKey: "MasterProcessID",
    header: "Master Process ID",
    enableSorting: true,
  },

  // Tanggal
  {
    accessorKey: "PlanStartDate",
    header: "Plan Start Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.PlanStartDate)}
      </span>
    ),
  },
  {
    accessorKey: "PlanEndDate",
    header: "Plan End Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.PlanEndDate)}
      </span>
    ),
  },
  {
    accessorKey: "ActualStartDate",
    header: "Actual Start Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.ActualStartDate)}
      </span>
    ),
  },
  {
    accessorKey: "ActualEndDate",
    header: "Actual End Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.ActualEndDate)}
      </span>
    ),
  },
  {
    accessorKey: "IsHold",
    header: "Is Hold",
    enableSorting: true,
    cell: ({ row }) => (
      <span
        className={`text-center w-full block font-bold ${
          row.original.IsHold ? "text-green-500" : "text-red-500"
        }`}
      >
        {row.original.IsHold ? "✔" : "✘"}
      </span>
    ),
  },
  {
    accessorKey: "HoldDate",
    header: "Hold Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.HoldDate)}
      </span>
    ),
  },

  // Metadata
  {
    accessorKey: "Created",
    header: "Created Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.Created)}
      </span>
    ),
  },
  { accessorKey: "CreatedBy", header: "Created By", enableSorting: true },
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
  {
    accessorKey: "LastModifiedBy",
    header: "Last Modified By",
    enableSorting: true,
  },
  { accessorKey: "Status", header: "Status", enableSorting: true },

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
