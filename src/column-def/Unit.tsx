import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { IDataUnit } from "@/interface/IDataUnit";

export const defaultColumns = [
  "UnitID",
  "UnitSerialNumber",
  "ProcessCount",
  "StandardMH",
  "ActualHours",
  "Action",
];

const formatDate = (date?: string | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return <span className="text-red-500 font-bold">N/A</span>;
  }
  return format(new Date(date), "EEEE, dd MMMM yyyy", { locale: id });
};

export const columns = (handleViewClick: any): ColumnDef<IDataUnit>[] => [
  { accessorKey: "UnitID", header: "Unit ID", enableSorting: true },
  {
    accessorKey: "UnitSerialNumber",
    header: "Serial Number",
    enableSorting: true,
  },
  { accessorKey: "ProcessCount", header: "Total Process", enableSorting: true },
  { accessorKey: "StandardMH", header: "Standard MH", enableSorting: true },
  { accessorKey: "ActualHours", header: "Actual Hours", enableSorting: true },
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
