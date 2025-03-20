import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const defaultColumns = [
  "prNumber",
  "prType",
  "prDate",
  "prItem",
  "qtyPr",
  "uomQtyPr",
  "prPlant",
  "vendorName",
  "poNo",
  "poDate",
  "netPrice",
  "totalValue",
  "Action",
];

// Fungsi untuk validasi dan format tanggal
const formatDate = (date?: Date | null) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return <span className="text-red-500 font-bold">N/A</span>;
  }
  return format(new Date(date), "EEEE, dd MMMM yyyy", { locale: id });
};

export const columns = (handleViewClick: any): ColumnDef<IDataAllPro>[] => [
  { accessorKey: "prNumber", header: "PR Number", enableSorting: true },
  { accessorKey: "prType", header: "PR Type", enableSorting: true },
  {
    accessorKey: "prDate",
    header: "PR Date",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.prDate),
  },
  { accessorKey: "prItem", header: "PR Item", enableSorting: true },
  { accessorKey: "qtyPr", header: "Qty PR", enableSorting: true },
  { accessorKey: "uomQtyPr", header: "UOM Qty PR", enableSorting: true },
  { accessorKey: "prPlant", header: "PR Plant", enableSorting: true },
  { accessorKey: "prSloc", header: "PR SLOC", enableSorting: true },
  {
    accessorKey: "deliveryDate",
    header: "Delivery Date",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.deliveryDate),
  },
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
    enableSorting: true,
  },
  {
    accessorKey: "prRequisitioner",
    header: "PR Requisitioner",
    enableSorting: true,
  },
  { accessorKey: "shortText", header: "Short Text", enableSorting: true },
  {
    accessorKey: "materialNumber",
    header: "Material Number",
    enableSorting: true,
  },
  { accessorKey: "materialType", header: "Material Type", enableSorting: true },
  { accessorKey: "brand", header: "Brand", enableSorting: true },
  {
    accessorKey: "brandDescription",
    header: "Brand Description",
    enableSorting: true,
  },
  { accessorKey: "poNo", header: "PO Number", enableSorting: true },
  { accessorKey: "poType", header: "PO Type", enableSorting: true },
  { accessorKey: "vendorCode", header: "Vendor Code", enableSorting: true },
  { accessorKey: "vendorName", header: "Vendor Name", enableSorting: true },
  {
    accessorKey: "poDate",
    header: "PO Date",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.poDate),
  },
  { accessorKey: "paymentTerm", header: "Payment Term", enableSorting: true },
  {
    accessorKey: "poReleaseStatus",
    header: "PO Release Status",
    enableSorting: true,
  },
  { accessorKey: "poItem", header: "PO Item", enableSorting: true },
  { accessorKey: "plantPo", header: "Plant PO", enableSorting: true },
  { accessorKey: "slocPo", header: "SLOC PO", enableSorting: true },
  { accessorKey: "qtyPo", header: "Qty PO", enableSorting: true },
  { accessorKey: "uomQtyPo", header: "UOM Qty PO", enableSorting: true },
  { accessorKey: "openQtyPo", header: "Open Qty PO", enableSorting: true },
  {
    accessorKey: "deliveryDatePo",
    header: "Delivery Date PO",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.deliveryDatePo),
  },
  {
    accessorKey: "delvCompleted",
    header: "Delivery Completed",
    enableSorting: true,
  },
  { accessorKey: "netPrice", header: "Net Price", enableSorting: true },
  { accessorKey: "totalValue", header: "Total Value", enableSorting: true },
  { accessorKey: "poTrackNo", header: "PO Track No", enableSorting: true },
  {
    accessorKey: "lastGr101Date",
    header: "Last GR101 Date",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.lastGr101Date),
  },
  { accessorKey: "gr101Qty", header: "GR101 Qty", enableSorting: true },
  {
    accessorKey: "lastGr103Date",
    header: "Last GR103 Date",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.lastGr103Date),
  },
  { accessorKey: "gr103Qty", header: "GR103 Qty", enableSorting: true },
  {
    accessorKey: "lastGr105Date",
    header: "Last GR105 Date",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.lastGr105Date),
  },
  { accessorKey: "gr105Qty", header: "GR105 Qty", enableSorting: true },
  {
    accessorKey: "lastGr107Date",
    header: "Last GR107 Date",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.lastGr107Date),
  },
  { accessorKey: "gr107Qty", header: "GR107 Qty", enableSorting: true },
  {
    accessorKey: "lastGr109Date",
    header: "Last GR109 Date",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.lastGr109Date),
  },
  { accessorKey: "gr109Qty", header: "GR109 Qty", enableSorting: true },
  {
    accessorKey: "lastIrDate",
    header: "Last IR Date",
    enableSorting: true,
    cell: ({ row }) => formatDate(row.original.lastIrDate),
  },
  { accessorKey: "qtyIr", header: "IR Qty", enableSorting: true },
{ accessorKey: "ammountLcIr", header: "Ammount LC IR", enableSorting: true },
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
