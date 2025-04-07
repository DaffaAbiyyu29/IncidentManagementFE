import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { IDataUnit } from "@/interface/IDataManhourUtilization";
import { formattedDate } from "@/helper/formattedDate";

export const defaultColumns = [
  "proNumber",
  "unitSerialNumber",
  "productGroupName",
  "productName",
  "processCount",
  "standardMH",
  "actualHours",
  "mpsDueDate",
  "Action",
];

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
  { accessorKey: "processCount", header: "Total Process", enableSorting: true },
  { accessorKey: "standardMH", header: "Standard MH", enableSorting: true },
  { accessorKey: "actualHours", header: "Actual Hours", enableSorting: true },
  {
    accessorKey: "mpsDueDate",
    header: "MPS Due Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span
        className={clsx("text-center w-full block", {
          "text-red-500 font-bold": !row.original.mpsDueDate,
        })}
      >
        {row.original.mpsDueDate
          ? formattedDate(row.original.mpsDueDate)
          : "N/A"}
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
