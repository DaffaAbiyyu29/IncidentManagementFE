const ModalDetailAllPro = ({ selectedData }) => {
  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString("id-ID") : "-";
  };

  return (
    <div
      className="modal"
      data-modal="true"
      data-modal-persistent="true"
      id="modalDetail"
    >
      <div className="modal-content modal-center-y max-w-[800px]">
        <div className="modal-header">
          <h3 className="modal-title font-bold">Detail Data AllPro</h3>
          <button
            className="btn btn-xs btn-icon btn-danger"
            data-modal-dismiss="true"
          >
            <i className="ki-outline ki-cross"></i>
          </button>
        </div>
        <div className="modal-body scrollable-y py-0 my-5 pl-6 pr-3 mr-3 h-[500px] max-h-[100%]">
          {selectedData ? (
            <table className="table-auto w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">PR Number</td>
                  <td className="border px-4 py-2">
                    {selectedData.prNumber || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">PR Type</td>
                  <td className="border px-4 py-2">
                    {selectedData.prType || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">PR Date</td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.prDate)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">PR Item</td>
                  <td className="border px-4 py-2">
                    {selectedData.prItem || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Qty PR</td>
                  <td className="border px-4 py-2">
                    {selectedData.qtyPr || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">UOM Qty PR</td>
                  <td className="border px-4 py-2">
                    {selectedData.uomQtyPr || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">PR Plant</td>
                  <td className="border px-4 py-2">
                    {selectedData.prPlant || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">PR SLOC</td>
                  <td className="border px-4 py-2">
                    {selectedData.prSloc || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Delivery Date
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.deliveryDate)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Tracking Number
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.trackingNumber || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    PR Requisitioner
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.prRequisitioner || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Short Text</td>
                  <td className="border px-4 py-2">
                    {selectedData.shortText || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Material Number
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.materialNumber || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Material Type
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.materialType || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Brand</td>
                  <td className="border px-4 py-2">
                    {selectedData.brand || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Brand Description
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.brandDescription || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">PO No</td>
                  <td className="border px-4 py-2">
                    {selectedData.poNo || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">PO Type</td>
                  <td className="border px-4 py-2">
                    {selectedData.poType || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Vendor Code
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.vendorCode || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Vendor Name
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.vendorName || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">PO Date</td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.poDate)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Payment Term
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.paymentTerm || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    PO Release Status
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.poReleaseStatus || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">PO Item</td>
                  <td className="border px-4 py-2">
                    {selectedData.poItem || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Plant PO</td>
                  <td className="border px-4 py-2">
                    {selectedData.plantPo || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">SLOC PO</td>
                  <td className="border px-4 py-2">
                    {selectedData.slocPo || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Qty PO</td>
                  <td className="border px-4 py-2">
                    {selectedData.qtyPo || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">UOM Qty PO</td>
                  <td className="border px-4 py-2">
                    {selectedData.uomQtyPo || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Open Qty PO
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.openQtyPo || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Delivery Date PO
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.deliveryDatePo)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Delv Completed
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.delvCompleted || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Net Price</td>
                  <td className="border px-4 py-2">
                    {selectedData.netPrice || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Total Value
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.totalValue || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    PO Track No
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.poTrackNo || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Last GR 101 Date
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.lastGr101Date)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">GR 101 Qty</td>
                  <td className="border px-4 py-2">
                    {selectedData.gr101Qty || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Last GR 103 Date
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.lastGr103Date)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">GR 103 Qty</td>
                  <td className="border px-4 py-2">
                    {selectedData.gr103Qty || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Last GR 105 Date
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.lastGr105Date)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">GR 105 Qty</td>
                  <td className="border px-4 py-2">
                    {selectedData.gr105Qty || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Last GR 107 Date
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.lastGr107Date)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">GR 107 Qty</td>
                  <td className="border px-4 py-2">
                    {selectedData.gr107Qty || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Last GR 109 Date
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.lastGr109Date)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">GR 109 Qty</td>
                  <td className="border px-4 py-2">
                    {selectedData.gr109Qty || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Last IR Date
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.lastIrDate)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">IR Qty</td>
                  <td className="border px-4 py-2">
                    {selectedData.qtyIr || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Ammount LC IR
                  </td>
                  <td className="border px-4 py-2">
                    {selectedData.ammountLcIr || "-"}
                  </td>
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

export default ModalDetailAllPro;
