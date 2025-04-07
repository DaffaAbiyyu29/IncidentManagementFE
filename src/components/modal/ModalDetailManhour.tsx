import { useState } from "react";
import DataTable from "../../components/Datatables";
import { id } from "date-fns/locale";
import {
  columns as ProcessAssign,
  defaultColumns,
} from "../../column-def/vwProcessAssign";
import {
  columns as ProcessActivity,
  defaultColumns as defaultColumnsActivity,
} from "../../column-def/vwProcessActivity";
import { useEffect } from "react";

const ModalDetailManhour = ({ selectedData }) => {
  console.log(selectedData);
  const [selectedColumns, setSelectedColumns] = useState(defaultColumns);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedDataAssign, setSelectedDataAssign] = useState(null);
  const [selectedColumnsActivity, setSelectedColumnsActivity] = useState(
    defaultColumnsActivity
  );
  const [isAllSelectedActivity, setIsAllSelectedActivity] = useState(false);

  useEffect(() => {
    const handleModalClose = () => {
      setSelectedDataAssign(null);
    };

    const closeButtons = document.querySelectorAll(
      "[data-modal-dismiss='true']"
    );
    closeButtons.forEach((btn) =>
      btn.addEventListener("click", handleModalClose)
    );

    return () => {
      closeButtons.forEach((btn) =>
        btn.removeEventListener("click", handleModalClose)
      );
    };
  }, []);

  const handleOpenModal = (rowData) => {
    setSelectedDataAssign(rowData);
    // document.getElementById("processdata").style.display = "none";
    // document.getElementById("processassignTable").style.display = "none";
  };

  const back = () => {
    setSelectedDataAssign(null);
  };

  const handleColumnToggle = (key) => {
    if (key === "All") {
      if (isAllSelected) {
        setSelectedColumns(defaultColumns);
        setIsAllSelected(false);
      } else {
        setSelectedColumns(
          ProcessAssign(() => {})
            .map((col) => ("accessorKey" in col ? col.accessorKey : undefined))
            .filter(Boolean)
        );
        setIsAllSelected(true);
      }
    } else {
      setSelectedColumns((prev) =>
        prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
      );
    }
  };

  const handleColumnToggleActivity = (key) => {
    if (key === "All") {
      if (isAllSelected) {
        setSelectedColumnsActivity(defaultColumnsActivity);
        setIsAllSelectedActivity(false);
      } else {
        setSelectedColumnsActivity(
          ProcessActivity()
            .map((col) => ("accessorKey" in col ? col.accessorKey : undefined))
            .filter(Boolean)
        );
        setIsAllSelectedActivity(true);
      }
    } else {
      setSelectedColumnsActivity((prev) =>
        prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
      );
    }
  };

  const visibleColumns = isAllSelected
    ? ProcessAssign(handleOpenModal)
    : ProcessAssign(handleOpenModal).filter(
        (col) =>
          "accessorKey" in col &&
          col.accessorKey &&
          selectedColumns.includes(col.accessorKey)
      );

  const visibleColumnsActivity = isAllSelectedActivity
    ? ProcessActivity()
    : ProcessActivity().filter(
        (col) =>
          "accessorKey" in col &&
          col.accessorKey &&
          selectedColumnsActivity.includes(col.accessorKey)
      );

  return (
    <div
      className="modal"
      data-modal="true"
      data-modal-persistent="true"
      id="modalDetail"
    >
      <div className="modal-content modal-center-y max-w-screen bg-white dark:bg-[#111217]">
        <div className="modal-header py-4">
          <h3 className="modal-title text-xl font-bold dark:text-gray-800">
            {selectedData && selectedDataAssign
              ? "Detail Data Process Assign"
              : "Detail Data Process"}
          </h3>
          <button
            className="btn btn-xs btn-icon btn-danger"
            data-modal-dismiss="true"
          >
            <i className="ki-outline ki-cross"></i>
          </button>
        </div>
        <div className="modal-body scrollable-y py-0 my-5 pl-6 pr-3 mr-3 h-[500px] max-h-[100%]">
          {selectedData && selectedDataAssign ? (
            <>
              <div className="grid grid-cols-2 gap-4 dark:text-gray-800 border rounded-lg p-4">
                {[
                  "Process Assign ID",
                  "Leader Name",
                  "Operator Name",
                  "Type",
                  "Status",
                  "Remark",
                ].map((label, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >
                    <span className="font-medium">{label}</span>
                    <span className="text-gray-700">
                      {selectedDataAssign[
                        label
                          .replace("Process Assign ID", "ID")
                          .replace("Operator Name", "OperatorName")
                          .replace("Leader Name", "LeaderName")
                          .replace("Type", "ProcessAssignType")
                          .replace("Status", "ProcessassignStatus")
                          .replace("Remark", "remark")
                      ] || "-"}
                    </span>
                  </div>
                ))}
              </div>

              <br />

              <h2 className="text-lg font-bold dark:text-gray-800 mb-2">
                Detail Process Activity
              </h2>
              <DataTable
                columns={visibleColumnsActivity}
                url={`${process.env.NEXT_PUBLIC_API_URL}/api/process-mh-unit-process-activity?processAssignID=${selectedDataAssign?.ID}`}
                filterColumns={[
                  { header: "All", accessorKey: "All" },
                  ...ProcessActivity().sort((a, b) =>
                    (a.header?.toString() ?? "").localeCompare(
                      b.header?.toString() ?? ""
                    )
                  ),
                ].map((col) => {
                  const key =
                    "accessorKey" in col ? col.accessorKey : undefined;
                  return (
                    <div
                      key={key ?? ""}
                      className="menu-item flex items-center w-full"
                    >
                      <label className="menu-link form-label flex items-center gap-2 w-full">
                        <input
                          type="checkbox"
                          className="checkbox w-full"
                          checked={
                            key === "All"
                              ? isAllSelected
                              : selectedColumns.includes(key ?? "")
                          }
                          onChange={() => handleColumnToggleActivity(key ?? "")}
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
            </>
          ) : selectedData ? (
            <>
              <div className="grid grid-cols-2 gap-4 dark:text-gray-800 border rounded-lg p-4">
                {[
                  "Process ID",
                  "Group Name",
                  "Process Name",
                  "Standard MH",
                  "Status",
                  "Delay In Day",
                ].map((label, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >
                    <span className="font-medium">{label}</span>
                    <span className="text-gray-700">
                      {selectedData[
                        label
                          .replace("Process ID", "ProcessID")
                          .replace("Group Name", "ProcessGroupName")
                          .replace("Process Name", "MasterProcessName")
                          .replace("Standard MH", "StandardMH")
                          .replace("Delay In Day", "DelayInDay")
                          .replace("Status", "ProcessStatus")
                          .replace("DelayInDay", "ProcessDelayInDay")
                      ] || "-"}
                    </span>
                  </div>
                ))}
              </div>

              <br />

              <h2 className="text-lg font-bold dark:text-gray-800 mb-2">
                Data Process Assign
              </h2>
              <DataTable
                columns={visibleColumns}
                url={`${process.env.NEXT_PUBLIC_API_URL}/api/process-mh-unit-process-assign?processID=${selectedData?.ProcessID}`}
                filterColumns={[
                  { header: "All", accessorKey: "All" },
                  ...ProcessAssign(() => {}).sort((a, b) =>
                    (a.header?.toString() ?? "").localeCompare(
                      b.header?.toString() ?? ""
                    )
                  ),
                ].map((col) => {
                  const key =
                    "accessorKey" in col ? col.accessorKey : undefined;
                  return (
                    <div
                      key={key ?? ""}
                      className="menu-item flex items-center w-full"
                    >
                      <label className="menu-link form-label flex items-center gap-2 w-full">
                        <input
                          type="checkbox"
                          className="checkbox w-full"
                          checked={
                            key === "All"
                              ? isAllSelected
                              : selectedColumns.includes(key ?? "")
                          }
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
            </>
          ) : (
            <p>Data tidak tersedia</p>
          )}
        </div>
        <div className="modal-footer justify-end">
          {selectedDataAssign && (
            <button className="btn btn-warning mr-2" onClick={back}>
              Kembali
            </button>
          )}
          <button className="btn btn-danger" data-modal-dismiss="true">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailManhour;
