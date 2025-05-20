import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const defaultColumns = [
  "name",
  "departemen",
  "divisi",
  "email",
  "role",
  "createdAt",
  "updatedAt",
  "Action",
];

const formatDate = (date?: Date | string | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return <span className="text-red-500 font-bold">N/A</span>;
  }
  return format(new Date(date), "EEEE, dd MMMM yyyy", { locale: id });
};

export const columns = (handleViewClick: any): ColumnDef<IDataMsUsers>[] => [
  { accessorKey: "id", header: "ID", enableSorting: true },
  { accessorKey: "name", header: "Nama", enableSorting: true },
  { accessorKey: "departemen", header: "Departemen", enableSorting: true },
  { accessorKey: "divisi", header: "Divisi", enableSorting: true },
  { accessorKey: "email", header: "Email", enableSorting: true },
  { accessorKey: "role", header: "Role", enableSorting: true },
  {
    accessorKey: "createdAt",
    header: "Created At",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.created_at),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.updated_at),
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex space-x-1 justify-center">
        <button
          className="btn btn-icon bg-blue-500 btn-xs transition-transform hover:scale-[105%] active:scale-[100%]"
          onClick={() => handleViewClick(row.original, "view")}
        >
          <i className="ki-outline ki-eye text-white"></i>
        </button>
        <button
          className="btn btn-icon bg-yellow-500 btn-xs transition-transform hover:scale-[105%] active:scale-[100%]"
          onClick={() => handleViewClick(row.original, "update")}
        >
          <i className="ki-outline ki-pencil text-white"></i>
        </button>
        <button
          className="btn btn-icon bg-red-500 btn-xs transition-transform hover:scale-[105%] active:scale-[100%]"
          onClick={() => handleViewClick(row.original, "delete")}
        >
          <i className="ki-outline ki-trash text-white"></i>
        </button>
      </div>
    ),
  },
];
