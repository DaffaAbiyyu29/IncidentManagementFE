import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { parse, format, addDays } from "date-fns";
import { id } from "date-fns/locale";

export const defaultColumns = [
  // "ID",
  "CustomerName",
  "CompanyCode",
  "DocumentNumber",
  "DocumentType",
  "DocumentDate",
  "PostingDate",
  "NetDueDate",
  "ClearingDate",
  "AmountDocCurr",
  "DocumentCurrency",
  "Status",
  "Action",
];

const formatDate = (date?: string | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return <span className="text-red-500 font-bold">N/A</span>;
  }
  return format(new Date(date), "EEEE, dd MMMM yyyy", { locale: id });
};

export const columns = (handleViewClick: any): ColumnDef<IDataFBL5N>[] => [
  // Identitas Transaksi
  { accessorKey: "ID", header: "ID", enableSorting: true },
  { accessorKey: "CustomerName", header: "Customer Name", enableSorting: true },
  { accessorKey: "CompanyCode", header: "Company Code", enableSorting: true },

  // Dokumen & Tanggal Penting
  {
    accessorKey: "DocumentNumber",
    header: "Document Number",
    enableSorting: true,
  },
  { accessorKey: "DocumentType", header: "Document Type", enableSorting: true },
  {
    accessorKey: "DocumentDate",
    header: "Document Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.DocumentDate)}
      </span>
    ),
  },
  {
    accessorKey: "PostingDate",
    header: "Posting Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.PostingDate)}
      </span>
    ),
  },

  // Informasi Pembayaran & Jatuh Tempo
  {
    accessorKey: "NetDueDate",
    header: "Net Due Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.NetDueDate)}
      </span>
    ),
  },
  {
    accessorKey: "ClearingDate",
    header: "Clearing Date",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-center w-full block">
        {formatDate(row.original.ClearingDate)}
      </span>
    ),
  },
  {
    accessorKey: "ClearingDocument",
    header: "Clearing Document",
    enableSorting: true,
  },

  // Detail Keuangan
  {
    accessorKey: "AmountDocCurr",
    header: "Amount (Doc Curr)",
    enableSorting: true,
    cell: ({ row }) => {
      const amount = row.original.AmountDocCurr;
      const currencyCode = row.original.DocumentCurrency || "IDR"; // Default ke USD jika tidak ada currency
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
      }).format(amount);
    },
  },
  {
    accessorKey: "DocumentCurrency",
    header: "Document Currency",
    enableSorting: true,
  },
  {
    accessorKey: "AmountLocalCurrency",
    header: "Amount (Local Curr)",
    enableSorting: true,
    cell: ({ row }) => {
      const amount = row.original.AmountLocalCurrency;
      const currencyCode = row.original.DocumentCurrency || "IDR"; // Default ke USD jika tidak ada currency
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
      }).format(amount);
    },
  },
  {
    accessorKey: "LocalCurrency",
    header: "Local Currency",
    enableSorting: true,
  },
  {
    accessorKey: "DebitCreditInd",
    header: "Debit/Credit Ind",
    enableSorting: true,
  },

  // Informasi Tambahan
  { accessorKey: "GLAccount", header: "GL Account", enableSorting: true },
  { accessorKey: "Reference", header: "Reference", enableSorting: true },
  { accessorKey: "Assignment", header: "Assignment", enableSorting: true },
  { accessorKey: "PostingKey", header: "Posting Key", enableSorting: true },
  { accessorKey: "BusinessArea", header: "Business Area", enableSorting: true },
  { accessorKey: "Plant", header: "Plant", enableSorting: true },
  { accessorKey: "ProfitCenter", header: "Profit Center", enableSorting: true },
  { accessorKey: "Account", header: "Account", enableSorting: true },
  {
    accessorKey: "SpecialGLInd",
    header: "Special GL Ind",
    enableSorting: true,
  },

  // Status & Aksi
  {
    accessorKey: "ReverseClearing",
    header: "Reverse Clearing",
    enableSorting: true,
  },
  { accessorKey: "Username", header: "Username", enableSorting: true },
  { accessorKey: "Text", header: "Text", enableSorting: true },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex space-x-1 justify-center">
        <button
          className="btn btn-icon bg-blue-500 btn-xs transition-transform hover:scale-[105%] active:scale-[100%]"
          onClick={() => handleViewClick(row.original)}
          // data-modal-toggle="#modalDetail"
        >
          <i className="ki-outline ki-eye text-white"></i>
        </button>
      </div>
    ),
  },
];
