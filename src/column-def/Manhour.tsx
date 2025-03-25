import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const defaultColumns = [
  // "ProcessID",
  // "ProcessAssignID",
  // "ProcessActivityID",
  "ProcessGroupName",
  "MasterProcessName",
  "ProcessOrder",
  "ProcessStatus",
  "ProcessPlanStartDate",
  "ProcessPlanEndDate",
  "ProcessPlanDuration",
  "ProcessActualStartDate",
  "ProcessActualEndDate",
  "ProcessActualDuration",
  "ProcessDelayInDay",
  "StandardMH",
  // "StatusAssign",
  // "TypeAssign",
  // "StatusActivity",
  "ActivityDateTime",
  "ActualHours",
  "ManHour",
  "PercentageUsage",
  "Action",
];

const formatDate = (date?: string | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return <span className="text-red-500 font-bold">N/A</span>;
  }
  return format(new Date(date), "EEEE, dd MMMM yyyy", { locale: id });
};

export const columns = (handleViewClick: any): ColumnDef<Manhour>[] => [
  { accessorKey: "ProcessID", header: "Process ID", enableSorting: true },
  {
    accessorKey: "ProcessAssignID",
    header: "Process Assign ID",
    enableSorting: true,
  },
  {
    accessorKey: "UnitID",
    header: "Unit ID",
    enableSorting: true,
  },
  {
    accessorKey: "ProcessActivityID",
    header: "Process Activity ID",
    enableSorting: true,
  },
  {
    accessorKey: "ProcessGroupName",
    header: "Process Group Name",
    enableSorting: true,
  },
  {
    accessorKey: "MasterProcessName",
    header: "Master Process Name",
    enableSorting: true,
  },
  {
    accessorKey: "ProcessOrder",
    header: "Process Order",
    enableSorting: true,
  },
  {
    accessorKey: "ProcessStatus",
    header: "Process Status",
    enableSorting: true,
    cell: ({ getValue }) => {
      const value = getValue().toString();
      const color =
        value === "Delay" ? "red" : value === "Early" ? "green" : "black"; // Warna default hitam jika bukan Delay atau Early

      return (
        <span
          style={{
            color,
            fontWeight: "bold",
            textAlign: "center",
            display: "block",
          }}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "ProcessPlanStartDate",
    header: "Plan Start Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.ProcessPlanStartDate)}
      </span>
    ),
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
    accessorKey: "ProcessPlanEndDate",
    header: "Plan End Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.ProcessPlanEndDate)}
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
    accessorKey: "ProcessPlanDuration",
    header: "Plan Duration",
    enableSorting: true,
  },
  {
    accessorKey: "ProcessActualDuration",
    header: "Actual Duration",
    enableSorting: true,
  },
  {
    accessorKey: "ProcessDelayInDay",
    header: "Delay (Days)",
    enableSorting: true,
    cell: ({ getValue }) => {
      const value = Number(getValue());
      const color = value < 0 ? "green" : "red"; // Warna hijau untuk negatif, merah untuk nol atau positif

      return (
        <span
          style={{
            color,
            fontWeight: "bold",
            textAlign: "center",
            display: "block",
          }}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "StandardMH",
    header: "Standard MH",
    enableSorting: true,
    cell: ({ getValue }) => {
      const value = getValue();
      return value ? (
        value
      ) : (
        <span
          style={{
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
            display: "block",
          }}
        >
          N/A
        </span>
      );
    },
  },
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
  { accessorKey: "OperatorName", header: "Operator Name", enableSorting: true },
  { accessorKey: "StatusAssign", header: "Status Assign", enableSorting: true },
  { accessorKey: "TypeAssign", header: "Type Assign", enableSorting: true },
  {
    accessorKey: "StatusActivity",
    header: "Status Activity",
    enableSorting: true,
  },
  {
    accessorKey: "ActivityDateTime",
    header: "Activity Date Time",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.ActivityDateTime)}
      </span>
    ),
  },
  {
    accessorKey: "ActualHours",
    header: "Actual Hours",
    enableSorting: true,
    cell: ({ getValue }) => {
      const value = getValue();
      return value ? (
        value
      ) : (
        <span
          style={{
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
            display: "block",
          }}
        >
          N/A
        </span>
      );
    },
  },
  {
    accessorKey: "ManHour",
    header: "Man Hour",
    enableSorting: true,
    cell: ({ getValue }) => {
      const value = getValue();
      return value ? (
        value
      ) : (
        <span
          style={{
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
            display: "block",
          }}
        >
          N/A
        </span>
      );
    },
  },
  {
    accessorKey: "PercentageUsage",
    header: "Percentage Usage",
    enableSorting: true,
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
