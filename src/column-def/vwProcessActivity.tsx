import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const defaultColumns = [
  "atasan",
  // "EmployeeNumber",
  // "ActivityDateTime",
  // "ProcessActivityID",
  // "ProcessAssignID",
  "ProcessActivityName",
  "ProcessActivityStatus",
  "ProcessActivityReasonPause",
  "ActualHoursNonProductive",
  "ProcessActivityActualHours",
  "ProcessActivityDateTime",
  "LastModifiedBy",
  "LastModified",
];

// Fungsi untuk validasi dan format tanggal
const formatDate = (date?: string | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return <span className="text-red-500 font-bold">N/A</span>;
  }
  return format(new Date(date), "EEEE, dd MMMM yyyy", { locale: id });
};

export const columns = (): ColumnDef<IDataVwProcessActivity>[] => [
  { accessorKey: "atasan", header: "Leader Name", enableSorting: true },
  {
    accessorKey: "EmployeeNumber",
    header: "Employee Number",
    enableSorting: true,
  },

  {
    accessorKey: "ProcessActivityName",
    header: "Process Activity Name",
    enableSorting: true,
  },

  {
    accessorKey: "ProcessActivityID",
    header: "Process Activity ID",
    enableSorting: true,
  },
  {
    accessorKey: "ProcessAssignID",
    header: "Process Assign ID",
    enableSorting: true,
  },
  {
    accessorKey: "ProcessActivityDateTime",
    header: "Process Activity Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.ProcessActivityDateTime)}
      </span>
    ),
  },
  {
    accessorKey: "ProcessActivityStatus",
    header: "Process Activity Status",
    enableSorting: true,
  },
  {
    accessorKey: "ProcessActivityActualHours",
    header: "Actual Hours Activity",
    enableSorting: true,
  },

  {
    accessorKey: "ActualHoursNonProductive",
    header: "Non-Productive Hours",
    enableSorting: true,
  },
  {
    accessorKey: "ProcessActivityReasonPause",
    header: "Reason Pause",
    enableSorting: true,
  },
  {
    accessorKey: "ActivityDateTime",
    header: "Activity Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.ActivityDateTime)}
      </span>
    ),
  },
  {
    accessorKey: "LastModified",
    header: "Last Modified",
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
];
