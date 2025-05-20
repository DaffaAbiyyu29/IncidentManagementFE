import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DataTable from "../../components/Datatables";
import { columns as Process, defaultColumns } from "../../column-def/vwProcess";
import Main from "../../main-layouts/main";
import ModalDetailManhour from "@/components/modal/ModalDetailManhour";
import axios from "axios";

const ManhourUtilizationUnit = () => {
  const router = useRouter();

  const [selectedColumns, setSelectedColumns] = useState(defaultColumns);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedData, setSelectedData] = useState(null); // dari sessionStorage
  const [unitDetail, setUnitDetail] = useState(null); // hasil dari API process-unit
  const [loadingDetail, setLoadingDetail] = useState(false);
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

  useEffect(() => {
    const fetchUnitDetail = async () => {
      if (!selectedData?.unitSerialNumber) return;
      setLoadingDetail(true);

      const fetchData = async (type: number) => {
        try {
          const token = sessionStorage.getItem("token");
          const month = localStorage.getItem("selectedMonth");
          const year = localStorage.getItem("selectedYear");

          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/process-unit?month=${month}&year=${year}&type=${type}&search=${selectedData.unitSerialNumber}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (
            Array.isArray(response.data.data.data) &&
            response.data.data.data.length > 0
          ) {
            return response.data.data.data[0]; // Mengembalikan data unit detail
          } else {
            return null; // Tidak ada data
          }
        } catch (error) {
          console.error("Gagal ambil detail unit:", error);
          return null;
        }
      };

      try {
        // Mencoba type 0 terlebih dahulu
        let unitDetail = await fetchData(0);

        // Jika type 0 tidak ada, coba type 1
        if (!unitDetail) {
          unitDetail = await fetchData(1);
        }

        // Jika type 1 juga tidak ada, coba type 2
        if (!unitDetail) {
          unitDetail = await fetchData(2);
        }

        setUnitDetail(unitDetail);
      } catch (error) {
        console.error("Gagal ambil detail unit:", error);
        setUnitDetail(null);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchUnitDetail();
  }, [selectedData]);

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
      {unitDetail ? (
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
              "Process Completed",
              "Progress",
              "Manhour Utilization",
              "Manhour Discrepancy",
            ].map((label, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <span className="font-medium">{label}</span>
                <span className="text-gray-700">
                  {label === "Manhour Utilization"
                    ? `${unitDetail.mhUtilization}%`
                    : label === "Manhour Discrepancy"
                    ? `${unitDetail.mhDiscrepancy}%`
                    : label === "Progress"
                    ? `${unitDetail.progressPercent}%`
                    : label === "Actual Hours"
                    ? parseFloat(unitDetail.actualHours).toFixed(2)
                    : label === "Process Completed"
                    ? `${unitDetail.processCompleted || 0}/${
                        unitDetail.processCount || 0
                      }`
                    : unitDetail[
                        label
                          .replace("PRO Number", "proNumber")
                          .replace("Serial Number", "unitSerialNumber")
                          .replace("Product Group", "productGroupName")
                          .replace("Product Name", "productName")
                          .replace("Standard MH", "standardMH")
                        // .replace("Manhour Utilization", "mhUtilization")
                        // .replace("Manhour Discrepancy", "mhDiscrepancy")
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
              url={`${process.env.NEXT_PUBLIC_API_URL}/api/detail-process-unit?serialNumber=${selectedData?.unitSerialNumber}`}
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
          </div>
        </div>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-blue-900 bg-opacity-0 z-10 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-white bg-slate-700 px-4 py-2 rounded">
            <i className="ki-duotone ki-setting-2 animate-spin text-md"></i>
            <span>Loading...</span>
          </div>
        </div>
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
