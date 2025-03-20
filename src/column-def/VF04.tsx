import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { parse, format } from "date-fns";
import { id } from "date-fns/locale";

export const defaultColumns = [
  // "SalesOrg",
  // "SoldToParty",
  "NameSoldToParty",
  // "Address",
  "Country",
  "SalesDocument",
  "SDDocumentType",
  // "DistributionChannel",
  // "Division",
  "PONumber",
  "BillCategory",
  "BillType",
  "BillDate",
  "BillType2",
  "BillDate2",
  "NetValue",
  "DocCurrency",
  "ShippingPointDesc",
  // "PODStatus",
  "SOPOAmount",
  "Exrate",
  "Status",
  "Action",
];

export const columns = (handleViewClick: any): ColumnDef<IDataVF04>[] => [
  { accessorKey: "ID", header: "ID", enableSorting: true },
  { accessorKey: "SalesOrg", header: "Sales Org", enableSorting: true },
  { accessorKey: "SoldToParty", header: "Sold To Party", enableSorting: true },
  {
    accessorKey: "NameSoldToParty",
    header: "Customer Name",
    enableSorting: true,
  },
  { accessorKey: "Address", header: "Address", enableSorting: true },
  { accessorKey: "Country", header: "Country", enableSorting: true },
  {
    accessorKey: "SalesDocument",
    header: "Sales Document",
    enableSorting: true,
  },
  {
    accessorKey: "SDDocumentType",
    header: "SD Document Type",
    enableSorting: true,
  },
  { accessorKey: "NameSDType", header: "Name SD Type", enableSorting: true },
  {
    accessorKey: "DistributionChannel",
    header: "Distribution Channel",
    enableSorting: true,
  },
  { accessorKey: "Division", header: "Division", enableSorting: true },
  { accessorKey: "DocCategory", header: "Doc Category", enableSorting: true },
  { accessorKey: "PONumber", header: "PO Number", enableSorting: true },
  { accessorKey: "BillCategory", header: "Bill Category", enableSorting: true },
  { accessorKey: "BillType", header: "Bill Type", enableSorting: true },
  { accessorKey: "BillDate", header: "Bill Date", enableSorting: true },
  { accessorKey: "BillType2", header: "Bill Type 2", enableSorting: true },
  { accessorKey: "BillDate2", header: "Bill Date 2", enableSorting: true },
  {
    accessorKey: "NetValue",
    header: "Net Value",
    enableSorting: true,
    cell: ({ row }) => {
      const amount = row.original.NetValue;
      const currencyCode = row.original.DocCurrency || "IDR";
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
      }).format(Number(amount));
    },
  },
  { accessorKey: "DocCurrency", header: "Doc Currency", enableSorting: true },
  {
    accessorKey: "ShippingPoint",
    header: "Shipping Point",
    enableSorting: true,
  },
  {
    accessorKey: "ShippingPointDesc",
    header: "Shipping Point Desc",
    enableSorting: true,
  },
  { accessorKey: "PODStatus", header: "POD Status", enableSorting: true },
  {
    accessorKey: "SOPOAmount",
    header: "SOPO Amount",
    enableSorting: true,
    cell: ({ row }) => {
      const amount = row.original.SOPOAmount;
      const currencyCode = row.original.DocCurrency || "IDR";
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
      }).format(Number(amount));
    },
  },
  { accessorKey: "Exrate", header: "Exrate", enableSorting: true },
  { accessorKey: "BDRSrcDoc", header: "BDR Src Doc", enableSorting: true },
  { accessorKey: "RefSys", header: "Ref Sys", enableSorting: true },
  { accessorKey: "DraftMode", header: "Draft Mode", enableSorting: true },
  { accessorKey: "DBDRef", header: "DBD Ref", enableSorting: true },
  {
    accessorKey: "SolutionOrder",
    header: "Solution Order",
    enableSorting: true,
  },
  { accessorKey: "Groups", header: "Groups", enableSorting: true },
  {
    accessorKey: "LocSoldToParty",
    header: "Loc Sold To Party",
    enableSorting: true,
  },
  { accessorKey: "SortTerm", header: "Sort Term", enableSorting: true },
  { accessorKey: "ItemsRead", header: "Items Read", enableSorting: true },
  { accessorKey: "Counter", header: "Counter", enableSorting: true },
  { accessorKey: "SLACC", header: "SLA CC", enableSorting: true },
  { accessorKey: "SLAUser", header: "SLA User", enableSorting: true },
  { accessorKey: "Status", header: "Status", enableSorting: true },
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
