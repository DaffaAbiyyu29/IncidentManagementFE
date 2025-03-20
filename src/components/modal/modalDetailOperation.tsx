import { useState, useEffect } from "react";
import clsx from "clsx";

const ModalDetailOperation = ({ selectedData }) => {
  return (
    <div className="modal" data-modal="true" id="modalDetail">
      <div className="modal-content modal-center-y max-w-[800px]">
        <div className="modal-header">
          <h3 className="modal-title font-bold">Operations</h3>
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
                  <td className="border px-4 py-2">PN</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.PN}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">PRO</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.PRO}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Product</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Product}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Product Group</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.ProductGroup}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Process</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.Process}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Dependency</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.Dependency}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Max Production/Base</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.Maksimal_Produksi_per_Base}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Process Order</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.ProcessOrder}
                  </td>
                </tr>

                {/* Tanggal & Estimasi */}
                <tr>
                  <td className="border px-4 py-2">Plan Start Date</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.PlanStartDate}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Plan End Date</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.PlanEndDate}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Start Date</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.Start_Date}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">End Date</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.End_Date}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">MPS Due Date</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.MPS_Due_Date}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Finished Prediction</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.Finished_Prediction}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    Estimated Material Arrived
                  </td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.Estimated_Material_Arrived}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    Lead Time Process Standar
                  </td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.Lead_Time_Process_Standar}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    Lead Time Estimation Process
                  </td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.Lead_Time_Estimation_Process}
                  </td>
                </tr>

                {/* Status */}
                <tr>
                  <td className="border px-4 py-2">Process Status</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.Process_Status}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Status Unit Delivery</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.Status_Unit_Delivery}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Capacity Utilization</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.Capacity_Utilization}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Status Capacity</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.Status_Capacity}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Status Material</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    {selectedData.Status_Material}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Status</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">
                    <span
                      className={clsx(
                        "badge",
                        selectedData.Status === "closed"
                          ? "badge-success"
                          : "badge-danger"
                      )}
                    >
                      {selectedData.Status}
                    </span>
                  </td>
                </tr>

                {/* SLA */}
                <tr>
                  <td className="border px-4 py-2">SLACC</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.SLACC}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">SLA User</td>
                  <td className="border px-2 py-2 text-center">:</td>
                  <td className="border px-4 py-2">{selectedData.SLAUser}</td>
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

export default ModalDetailOperation;
