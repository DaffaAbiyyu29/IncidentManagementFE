const ModalDetailManhour = ({ selectedData }) => {
  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString("id-ID") : "-";
  };

  return (
    <div className="modal" data-modal="true" id="modalDetail">
      <div className="modal-content modal-center-y max-w-[600px]">
        <div className="modal-header">
          <h3 className="modal-title font-bold">Detail Data Process</h3>
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
                  <td className="border px-4 py-2">{selectedData.ID}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Unit ID</td>
                  <td className="border px-4 py-2">{selectedData.UnitID}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Master Process ID</td>
                  <td className="border px-4 py-2">
                    {selectedData.MasterProcessID}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Status</td>
                  <td className="border px-4 py-2">{selectedData.Status}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Plan Start Date</td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.PlanStartDate)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Plan End Date</td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.PlanEndDate)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Actual Start Date</td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.ActualStartDate)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Actual End Date</td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.ActualEndDate)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">On Hold?</td>
                  <td className="border px-4 py-2">
                    {selectedData.IsHold ? "Ya" : "Tidak"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Hold Date</td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.HoldDate)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Created</td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.Created)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Created By</td>
                  <td className="border px-4 py-2">{selectedData.CreatedBy}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Last Modified</td>
                  <td className="border px-4 py-2">
                    {formatDate(selectedData.LastModified)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Last Modified By</td>
                  <td className="border px-4 py-2">
                    {selectedData.LastModifiedBy}
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

export default ModalDetailManhour;
