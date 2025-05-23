import { useEffect, useState } from "react";
import Main from "../../main-layouts/main";
import DataTable from "../../components/Datatables";
import clsx from "clsx";
import {
  columns as SR,
  defaultColumns,
} from "../../column-def/Schedule_Recommendation";
import ModalDetailOperation from "@/components/modal/modalDetailOperation";

export default function DelayOperation() {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState(defaultColumns);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [month, setMonth] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [type, setType] = useState<string | null>("0");
  const [storageUpdated, setStorageUpdated] = useState(Date.now());

  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = currentDate.getFullYear().toString();

  const loadFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const storedMonth = localStorage.getItem("selectedMonth");
      const storedYear = localStorage.getItem("selectedYear");
      const storedType = localStorage.getItem("incidentType");

      if (storedMonth && storedYear) {
        setMonth(storedMonth);
        setYear(storedYear);
      }

      if (storedType) {
        setType(storedType);
      }
    }
  };

  useEffect(() => {
    loadFromLocalStorage();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "selectedMonth" || event.key === "selectedYear") {
        setStorageUpdated(Date.now());
      }
    };

    const handleCustomEvent = () => {
      setStorageUpdated(Date.now());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageUpdated", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageUpdated", handleCustomEvent);
    };
  }, []);

  useEffect(() => {
    loadFromLocalStorage();
  }, [storageUpdated]);

  const handleOpenModal = (rowData) => {
    setSelectedData(rowData);
    document.getElementById("toggleModal").click();
  };

  const handleColumnToggle = (key) => {
    if (key === "All") {
      if (isAllSelected) {
        setSelectedColumns(defaultColumns);
        setIsAllSelected(false);
      } else {
        setSelectedColumns(
          SR(() => {})
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
    ? SR(handleOpenModal)
    : SR(handleOpenModal).filter(
        (col) =>
          "accessorKey" in col &&
          col.accessorKey &&
          selectedColumns.includes(col.accessorKey)
      );

  return (
    <Main>
      <DataTable
        columns={visibleColumns}
        url={`${
          process.env.NEXT_PUBLIC_API_URL
        }/api/schedule-recommendation?month=${month ?? currentMonth}&year=${
          year ?? currentYear
        }&type=${type}`}
        filterColumns={[
          { header: "All", accessorKey: "All" },
          ...SR(() => {}).sort((a, b) =>
            (a.header?.toString() ?? "").localeCompare(
              b.header?.toString() ?? ""
            )
          ),
        ].map((col) => {
          const key = "accessorKey" in col ? col.accessorKey : undefined;
          return (
            <div key={key ?? ""} className="menu-item flex items-center w-full">
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
        filterDate={true}
        filterIncident={true}
      />

      <button id="toggleModal" data-modal-toggle="#modalDetail"></button>

      <ModalDetailOperation selectedData={selectedData} />
    </Main>
  );
}
