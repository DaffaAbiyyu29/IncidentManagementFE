import clsx from "clsx";

const ModalDetailAR = ({ selectedData }) => {
  return (
    <div
      className="modal show"
      data-modal="true"
      data-modal-persistent="true"
      id="modalDetail"
    >
      <div className="modal-content modal-center-y max-w-[800px]">
        <div className="modal-header">
          <h3 className="modal-title font-bold">Account Receivable</h3>
          <button
            className="btn btn-xs btn-icon btn-danger"
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
                  <td className="border px-4 py-2">ID</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.ID}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Account</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Account}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Customer Name</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.CustomerName}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Company Code</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.CompanyCode}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Business Area</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.BusinessArea}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Profit Center</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.ProfitCenter}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Plant</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Plant}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">GL Account</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.GLAccount}</td>
                </tr>

                {/* Dokumen & Tanggal Penting */}
                <tr>
                  <td className="border px-4 py-2">Document Number</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.DocumentNumber}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Document Type</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.DocumentType}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Document Date</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.DocumentDate}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Posting Key</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.PostingKey}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Posting Date</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.PostingDate}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Net Due Date</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.NetDueDate}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Clearing Date</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.ClearingDate}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Clearing Document</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.ClearingDocument}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Reverse Clearing</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.ReverseClearing}
                  </td>
                </tr>

                {/* Detail Keuangan */}
                <tr>
                  <td className="border px-4 py-2">Amount (Doc Curr)</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: selectedData.DocumentCurrency || "IDR",
                      minimumFractionDigits: 0,
                    }).format(selectedData.AmountDocCurr)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Document Currency</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.DocumentCurrency}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Amount (Local Curr)</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: selectedData.LocalCurrency || "IDR",
                      minimumFractionDigits: 0,
                    }).format(selectedData.AmountLocalCurrency)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Local Currency</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.LocalCurrency}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Debit/Credit Ind</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.DebitCreditInd}
                  </td>
                </tr>

                {/* Informasi Tambahan */}
                <tr>
                  <td className="border px-4 py-2">SLA CC</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.SLACC}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">SLA User</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.SLAUser}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Reference</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Reference}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Assignment</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.Assignment}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Special GL Ind</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.SpecialGLInd}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Username</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Username}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Text</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Text}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Status</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    <span
                      className={clsx(
                        "badge",
                        selectedData.Status === "Closed"
                          ? "badge-success"
                          : "badge-danger"
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
            <button className="btn btn-danger" data-modal-dismiss="true">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailAR;
