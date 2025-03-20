const ModalDetailBilling = ({ selectedData }) => {
  return (
    <div className="modal" data-modal="true" id="modalDetail">
      <div className="modal-content modal-center-y max-w-[800px]">
        <div className="modal-header">
          <h3 className="modal-title font-bold">Billing Details</h3>
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
                <tr>
                  <td className="border px-4 py-2">ID</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.ID}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Sales Org</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.SalesOrg}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Sold To Party</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.SoldToParty}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Customer Name</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.NameSoldToParty}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Loc Sold To Party</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.LocSoldToParty}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Address</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Address}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Groups</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Groups}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Country</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Country}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Sales Document</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.SalesDocument}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">SD Document Type</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.SDDocumentType}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Name SD Type</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.NameSDType}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">BDR Src Doc</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.BDRSrcDoc}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">DBD Ref</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.DBDRef}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Distribution Channel</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.DistributionChannel}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Division</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Division}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Counter</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Counter}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Doc Category</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.DocCategory}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Draft Mode</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.DraftMode}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">PO Number</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.PONumber}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Bill Category</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.BillCategory}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Bill Type</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.BillType}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Bill Date</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.BillDate}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Bill Type 2</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.BillType2}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Bill Date 2</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.BillDate2}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Net Value</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: selectedData.DocCurrency || "IDR",
                      minimumFractionDigits: 0,
                    }).format(selectedData.NetValue)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Doc Currency</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.DocCurrency}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Exrate</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Exrate}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Items Read</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.ItemsRead}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Shipping Point</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.ShippingPoint}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Shipping Point Desc</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.ShippingPointDesc}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">POD Status</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.PODStatus}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Ref Sys</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.RefSys}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Solution Order</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.SolutionOrder}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">SOPO Amount</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: selectedData.DocCurrency || "IDR",
                      minimumFractionDigits: 0,
                    }).format(selectedData.SOPOAmount)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Sort Term</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.SortTerm}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Status</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Status}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Data tidak tersedia</p>
          )}
        </div>
        <div className="modal-footer justify-end">
          <button className="btn btn-danger" data-modal-dismiss="true">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalDetailBilling;
