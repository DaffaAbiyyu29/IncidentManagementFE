import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DataTable from "../../components/Datatables";
import { columns as Process, defaultColumns } from "../../column-def/vwProcess";
import Main from "../../main-layouts/main";
import ModalDetailManhour from "@/components/modal/ModalDetailManhour";

const ManhourUtilizationUnit = () => {
  const router = useRouter();

  const [selectedColumns, setSelectedColumns] = useState(defaultColumns);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedDataProcess, setSelectedDataProcess] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("selectedUnit");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData?.unitSerialNumber) {
        setSelectedData(parsedData);
      } else {
        // console.log(1);
        handleBack();
      }
    } else {
      // console.log(2);
      handleBack();
    }
  }, [router]);

  const handleBack = () => {
    sessionStorage.removeItem("selectedUnit");
    router.push("/manhour_utilization");
  };

  const handleOpenModal = (rowData) => {
    setSelectedDataProcess(rowData);
    document.getElementById("toggleModal").click();
  };

  const handleColumnToggle = (key) => {
    if (key === "All") {
      if (isAllSelected) {
        setSelectedColumns(defaultColumns);
        setIsAllSelected(false);
      } else {
        setSelectedColumns(
          Process(() => {})
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

  const visibleColumns = isAllSelected
    ? Process(handleOpenModal)
    : Process(handleOpenModal).filter(
        (col) =>
          "accessorKey" in col &&
          col.accessorKey &&
          selectedColumns.includes(col.accessorKey)
      );

  return (
    <Main>
      {selectedData ? (
        <div className="p-6 shadow-md shadow-gray-300 rounded-lg dark:border-gray-300 dark:bg-[#111217] dark:text-white border-gray-300 bg-white text-black mb-2">
          <h2 className="text-xl font-bold dark:text-gray-800 mb-4">
            Detail Unit
          </h2>

          <hr className="h-0.5 bg-gray-300 dark:bg-gray-400 border-none mb-4" />

          <div className="grid grid-cols-2 gap-4 dark:text-gray-800 border rounded-lg p-4">
            {[
              "PRO Number",
              "Serial Number",
              "Product Group",
              "Product Name",
              "Standard MH",
              "Actual Hours",
              "Process",
            ].map((label, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <span className="font-medium">{label}</span>
                <span className="text-gray-700">
                  {selectedData[
                    label
                      .replace("PRO Number", "proNumber")
                      .replace("Serial Number", "unitSerialNumber")
                      .replace("Product Group", "productGroupName")
                      .replace("Product Name", "productName")
                      .replace("Standard MH", "standardMH")
                      .replace("Actual Hours", "actualHours")
                      .replace("Process", "processCount")
                  ] || "-"}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold dark:text-gray-800 mb-4">
              Data Process
            </h2>
            <DataTable
              columns={visibleColumns}
              url={`${process.env.NEXT_PUBLIC_API_URL}/api/process-mh-unit-process?serialNumber=${selectedData?.unitSerialNumber}`}
              filterColumns={[
                { header: "All", accessorKey: "All" },
                ...Process(() => {}).sort((a, b) =>
                  (a.header?.toString() ?? "").localeCompare(
                    b.header?.toString() ?? ""
                  )
                ),
              ].map((col) => {
                const key = "accessorKey" in col ? col.accessorKey : undefined;
                return (
                  <div key={key ?? ""} className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={
                        key === "All"
                          ? isAllSelected
                          : selectedColumns.includes(key ?? "")
                      }
                      onChange={() => handleColumnToggle(key ?? "")}
                    />
                    <span>{col.header?.toString() ?? ""}</span>
                  </div>
                );
              })}
              filterDate={false}
            />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Data tidak tersedia</p>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Kembali
        </button>
      </div>

      <button id="toggleModal" data-modal-toggle="#modalDetail"></button>
      <ModalDetailManhour selectedData={selectedDataProcess} />
    </Main>
  );
};

export default ManhourUtilizationUnit;
