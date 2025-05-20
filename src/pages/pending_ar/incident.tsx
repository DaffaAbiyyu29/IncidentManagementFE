import { useState } from "react";
import Main from "../../main-layouts/main";
import DataTable from "../../components/Datatables";
import { columns as FBL5N, defaultColumns } from "../../column-def/FBL5N";
import clsx from "clsx";

export default function PendingARIncident() {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState(defaultColumns);

  const handleViewClick = (rowData: IDataFBL5N) => {
    setSelectedData(rowData);
    const modal = document.getElementById("modalDetail");
    if (modal) modal.classList.add("show");
  };

  const handleColumnToggle = (key: string) => {
    setSelectedColumns((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
    );
  };

  const visibleColumns = FBL5N(handleViewClick).filter(
    (col) =>
      "accessorKey" in col &&
      col.accessorKey &&
      selectedColumns.includes(col.accessorKey)
  );

  return (
    <Main>
      <DataTable
        columns={visibleColumns}
        url={`${process.env.NEXT_PUBLIC_API_URL}/api/pending-ar-incident`}
        filterColumns={FBL5N(() => {}).map((col) => {
          const key = "accessorKey" in col ? col.accessorKey : undefined;
          return (
            <div key={key ?? ""} className="menu-item flex items-center w-full">
              <label className="menu-link form-label flex items-center gap-2 w-full">
                <input
                  type="checkbox"
                  className="checkbox w-full"
                  checked={selectedColumns.includes(key ?? "")}
                  onChange={() => handleColumnToggle(key ?? "")}
                />
                <span className="flex-grow">
                  {col.header?.toString() ?? ""}
                </span>
              </label>
            </div>
          );
        })}
        filterDate={false}
      />

      <div
        className="modal"
        data-modal="true"
        data-modal-persistent="true"
        id="modalDetail"
      >
        <div className="modal-content modal-center-y max-w-[800px]">
          <div className="modal-header">
            <h3 className="modal-title">Account Receivable</h3>
            <button
              className="btn btn-xs btn-icon btn-light"
              data-modal-dismiss="true"
            >
              <i className="ki-outline ki-cross"></i>
            </button>
          </div>
          <div className="modal-body scrollable-y py-0 my-5 pl-6 pr-3 mr-3 h-[400px] max-h-[100%]">
            {selectedData ? (
              <table className="table-auto w-full border-collapse border border-gray-300">
                <tbody>
                  {/* Identitas Transaksi */}
                  <tr>
                    <td className="border px-4 py-2 font-bold">ID</td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">{selectedData.ID}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Account</td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">{selectedData.Account}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      Customer Name
                    </td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.CustomerName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Company Code</td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.CompanyCode}
                    </td>
                  </tr>

                  {/* Dokumen & Tanggal Penting */}
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      Document Number
                    </td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.DocumentNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      Document Type
                    </td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.DocumentType}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      Document Date
                    </td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.DocumentDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Posting Date</td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.PostingDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Net Due Date</td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.NetDueDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      Clearing Date
                    </td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.ClearingDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      Clearing Document
                    </td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.ClearingDocument}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">SLA CC</td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">{selectedData.SLACC}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">SLA User</td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">{selectedData.SLAUser}</td>
                  </tr>

                  {/* Detail Keuangan */}
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      Amount (Doc Curr)
                    </td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.AmountDocCurr}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      Document Currency
                    </td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.DocumentCurrency}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      Amount (Local Curr)
                    </td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.AmountLocalCurrency}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      Local Currency
                    </td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.LocalCurrency}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      Debit/Credit Ind
                    </td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.DebitCreditInd}
                    </td>
                  </tr>

                  {/* Informasi Tambahan */}
                  <tr>
                    <td className="border px-4 py-2 font-bold">GL Account</td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.GLAccount}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Reference</td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.Reference}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Assignment</td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2">
                      {selectedData.Assignment}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Status</td>
                    <td className="border px-2 py-2 font-bold text-center">
                      :
                    </td>
                    <td className="border px-4 py-2 font-bold">
                      <span
                        className={clsx(
                          "badge",
                          selectedData.Status === "Pending"
                            ? "badge-danger"
                            : "badge-success"
                        )}
                      >
                        {selectedData.Status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>Data tidak tersedia</p>
            )}
          </div>
          <div className="modal-footer justify-end">
            <div className="flex gap-4">
              <button className="btn btn-light" data-modal-dismiss="true">
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}
