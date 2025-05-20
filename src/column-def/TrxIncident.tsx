import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const defaultColumns = [
  // "incidentID",
  "description",
  "incidentType",
  // "ba",
  "baEmailDate",
  // "baEmailStatus",
  "user",
  // "userEmail",
  "userEmailDate",
  // "userEmailStatus",
  "openDate",
  "closedDate",
  "flagStatus",
  "status",
  "Action",
];

const formatDate = (date?: Date | string | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return <span className="text-red-500 font-bold">N/A</span>;
  }
  return format(new Date(date), "EEEE, dd MMMM yyyy", { locale: id });
};

export const columns = (
  handleViewClick: (
    row: IDataTrxIncident,
    type: "view" | "flag" | "pica" | "dispatch"
  ) => void
): ColumnDef<IDataTrxIncident>[] => [
  { accessorKey: "incidentID", header: "Reference ID", enableSorting: true },
  {
    accessorKey: "incidentType",
    header: "Incident Category",
    enableSorting: true,
  },
  { accessorKey: "description", header: "Description", enableSorting: true },
  { accessorKey: "ba", header: "PIC Keeper", enableSorting: true },
  {
    accessorKey: "baEmailDate",
    header: "Alert to Keeper",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.baEmailDate),
  },
  {
    accessorKey: "baEmailStatus",
    header: "Status Email BA",
    enableSorting: true,
  },
  { accessorKey: "user", header: "User", enableSorting: true },
  {
    accessorKey: "userEmail",
    header: "Incident Dispatch",
    enableSorting: true,
  },
  {
    accessorKey: "userEmailDate",
    header: "Alert to User",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.userEmailDate),
  },
  {
    accessorKey: "userEmailStatus",
    header: "Status Email User",
    enableSorting: true,
  },
  {
    accessorKey: "openDate",
    header: "Incident Detect Time",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.openDate),
  },
  {
    accessorKey: "closedDate",
    header: "Incident Closed Time",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.closedDate),
  },
  { accessorKey: "status", header: "Status", enableSorting: true },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex space-x-1 justify-center">
        {/* <button
          className="btn btn-icon bg-blue-500 btn-xs transition-transform hover:scale-[105%] active:scale-[100%]"
          onClick={() => handleViewClick(row.original, "view")}
        >
          <i className="ki-outline ki-eye text-white"></i>
        </button> */}
        <button
          className="btn btn-icon bg-blue-500 btn-xs transition-transform hover:scale-[105%] active:scale-[100%]"
          onClick={() => handleViewClick(row.original, "dispatch")}
        >
          <i className="ki-outline ki-messages text-white"></i>
        </button>
        <button
          className="btn btn-icon bg-yellow-500 btn-xs transition-transform hover:scale-[105%] active:scale-[100%]"
          onClick={() => handleViewClick(row.original, "flag")}
        >
          <i className="ki-outline ki-flag text-white"></i>
        </button>
        {/* <button
          className="btn btn-icon bg-yellow-500 btn-xs transition-transform hover:scale-[105%] active:scale-[100%]"
          onClick={() => handleViewClick(row.original, "update")}
        >
          <i className="ki-outline ki-pencil text-white"></i>
        </button> */}
        <button
          className="btn btn-icon bg-green-500 btn-xs transition-transform hover:scale-[105%] active:scale-[100%]"
          onClick={() => handleViewClick(row.original, "pica")}
        >
          <i className="ki-outline ki-document text-white"></i>
        </button>
      </div>
    ),
  },
];
