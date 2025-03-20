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
  { accessorKey: "DocumentDate", header: "Document Date", enableSorting: true },
  { accessorKey: "PostingDate", header: "Posting Date", enableSorting: true },

  // Informasi Pembayaran & Jatuh Tempo
  { accessorKey: "NetDueDate", header: "Net Due Date", enableSorting: true },
  {
    accessorKey: "ClearingDate",
    header: "Clearing Date",
    enableSorting: true,
    cell: ({ row }) => {
      const parseDate = (dateStr) => {
        if (!dateStr || dateStr === "N/A") return null;
        try {
          return parse(dateStr, "EEEE, dd MMMM yyyy", new Date(), {
            locale: id,
          });
        } catch {
          return null;
        }
      };

      const clearingDate = parseDate(row.original.ClearingDate);
      const slaCC = parseDate(row.original.SLACC);
      const slaUser = parseDate(row.original.SLAUser);
      const documentDate = parseDate(row.original.DocumentDate);
      const customer = row.original.CustomerName;

      let expectedSLA = slaCC ? addDays(slaCC, 7) : null;
      if (documentDate) {
        if (customer.includes("UTPE")) expectedSLA = addDays(documentDate, 45);
        else if (customer.includes("TRIATRA")) {
          if (customer.includes("saptaindra sejati"))
            expectedSLA = addDays(documentDate, 60);
          else if (
            customer.includes("buma") ||
            customer.includes("kaltim prima coal")
          )
            expectedSLA = addDays(documentDate, 75);
          else expectedSLA = addDays(documentDate, 45);
        }
      }

      let textColor = "text-black";
      if (!clearingDate) {
        textColor = "text-red-500";
      } else if (expectedSLA && clearingDate <= expectedSLA) {
        textColor = "text-green-500";
      } else if (expectedSLA && clearingDate > expectedSLA) {
        textColor = "text-orange-500";
      }

      return (
        <span
          className={clsx(textColor, "font-bold w-[150px] block text-center")}
        >
          {clearingDate
            ? format(new Date(clearingDate), "EEEE, dd MMMM yyyy", {
                locale: id,
              })
            : "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "ClearingDocument",
    header: "Clearing Document",
    enableSorting: true,
  },
  { accessorKey: "SLACC", header: "SLA CC", enableSorting: true },
  { accessorKey: "SLAUser", header: "SLA User", enableSorting: true },

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
    accessorKey: "Status",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.original.Status;
      const statusClass =
        status === "Closed"
          ? "badge badge-success"
          : status === "Pending"
          ? "badge badge-danger"
          : "badge badge-secondary";

      return <span className={statusClass}>{status}</span>;
    },
  },
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
