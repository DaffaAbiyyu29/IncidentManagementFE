import { useState, useEffect } from "react";
import Main from "../../main-layouts/main";
import DataTable from "../../components/Datatables";
import {
  columns as Unit,
  defaultColumns,
} from "../../column-def/ManhourUtilization";
import { useRouter } from "next/router";

export default function ManhourUtilization() {
  const router = useRouter();

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
        setStorageUpdated(Date.now()); // Update state agar trigger re-render
      }
    };

    const handleCustomEvent = () => {
      setStorageUpdated(Date.now());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageUpdated", handleCustomEvent); // 🔥 Tambahkan event listener

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageUpdated", handleCustomEvent); // 🔥 Bersihkan event listener
    };
  }, []);

  useEffect(() => {
    loadFromLocalStorage();
  }, [storageUpdated]);

  const handleChangePage = (rowData) => {
    sessionStorage.setItem("selectedUnit", JSON.stringify(rowData));
    router.push(`/manhour_utilization/unit`);
  };

  const handleColumnToggle = (key) => {
    if (key === "All") {
      setIsAllSelected(!isAllSelected);
      setSelectedColumns(
        isAllSelected
          ? defaultColumns
          : Unit(() => {})
              .map((col) =>
                "accessorKey" in col ? col.accessorKey : undefined
              )
              .filter(Boolean)
      );
    } else {
      setSelectedColumns((prev) =>
        prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
      );
    }
  };

  const visibleColumns = isAllSelected
    ? Unit(handleChangePage)
    : Unit(handleChangePage).filter(
        (col) =>
          "accessorKey" in col &&
          col.accessorKey &&
          selectedColumns.includes(col.accessorKey)
      );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("incidentType");
    }

    const handleBeforeUnload = () => {
      localStorage.removeItem("incidentType");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [type]);

  return (
    <Main>
      <div className="p-6 shadow-md shadow-gray-300 rounded-lg dark:border-gray-300 dark:bg-[#111217] dark:text-white border-gray-300 bg-white text-black mb-2">
        <h2 className="text-xl font-bold dark:text-gray-800 mb-4">
          Manhour Utilization
        </h2>

        <hr className="border-t border-gray-300 dark:border-gray-600 mb-4" />

        <DataTable
          columns={visibleColumns}
          url={`${process.env.NEXT_PUBLIC_API_URL}/api/process-unit?month=${
            month ?? currentMonth
          }&year=${year ?? currentYear}&type=${type}`}
          filterColumns={[
            { header: "All", accessorKey: "All" },
            ...Unit(() => {}).sort((a, b) =>
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
          filterDate={true}
          filterIncident={true}
        />
      </div>
    </Main>
  );
}
