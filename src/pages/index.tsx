import Main from "../main-layouts/main";
import React, { useState, useEffect } from "react";
import Datepicker from "../components/Datepicker";
import DataTable from "@/components/Datatables";
import { columns as Incident, defaultColumns } from "../column-def/TrxIncident";
import { useRouter } from "next/router";
import ModalDetailIncident from "@/components/modal/modalDetailIncident";
import { BarChart } from "@/components/BarChart";
import axios from "axios";
import Cookies from "js-cookie";

// Import ApexCharts (React component) secara dinamis (client-side only)

const Index = () => {
  const router = useRouter();

  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = currentDate.getFullYear().toString();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [selectedData, setSelectedData] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState(defaultColumns);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [month, setMonth] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [storageUpdated, setStorageUpdated] = useState(Date.now());
  const [refreshTable, setRefreshTable] = useState(false);
  const [flagType, setFlagType] = useState<number>(2);
  const [isClosed, setIsClosed] = useState<string>("false");

  const handleDateChange = (date: Date | null) => setSelectedDate(date);

  const loadFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const storedMonth = localStorage.getItem("selectedMonth");
      const storedYear = localStorage.getItem("selectedYear");
      const storedType = localStorage.getItem("incidentType");
      const storedFlag = localStorage.getItem("flagType");
      const storedIsClosed = localStorage.getItem("isClosed");

      if (storedMonth && storedYear) {
        setMonth(storedMonth);
        setYear(storedYear);
      }

      if (storedType) {
        setType(storedType);
      }

      if (storedFlag) {
        switch (storedFlag) {
          case "All Flag Types":
            setFlagType(2);
            break;
          case "Flag":
            setFlagType(1);
            break;
          case "Unflag":
            setFlagType(0);
            break;
        }
      }

      if (storedIsClosed) {
        setIsClosed(storedIsClosed);
      }
    }
  };

  useEffect(() => {
    loadFromLocalStorage();

    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === "selectedMonth" ||
        event.key === "selectedYear" ||
        event.key === "incidentType" ||
        event.key === "flagType" ||
        event.key === "isClosed"
      ) {
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

  const flagIncident = async (id: number, flag: number) => {
    try {
      const token = Cookies.get("token");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/flag`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          id,
          flag,
        }
      );

      if (response) {
        setRefreshTable((prev) => !prev);
      }
    } catch (error) {
      console.error("Gagal ambil detail unit:", error);
      return null;
    }
  };

  const handleOpenModal = (rowData, type) => {
    if (type === "view") {
      setSelectedData(rowData);
      document.getElementById("toggleModal").click();
    } else if (type === "dispatch") {
      // dispatch
    } else if (type === "flag") {
      flagIncident(rowData.id, rowData.flagStatus);
    } else if (type === "pica") {
      localStorage.setItem("LogID", rowData.id);
      router.push(`/incident/pica`);
    }
  };

  const handleColumnToggle = (key) => {
    if (key === "All") {
      if (isAllSelected) {
        setSelectedColumns([]);
        // setSelectedColumns(defaultColumns);
        setIsAllSelected(false);
      } else {
        setSelectedColumns(
          Incident(() => {})
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
    ? Incident(handleOpenModal)
    : Incident(handleOpenModal).filter(
        (col) =>
          "accessorKey" in col &&
          col.accessorKey &&
          selectedColumns.includes(col.accessorKey)
      );

  return (
    <Main>
      <div className="p-6 rounded-2xl bg-white dark:bg-[#111217] border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight uppercase">
            Incidents Overview
          </h2>
          <Datepicker
            value={selectedDate}
            onChange={handleDateChange}
            day={false}
            month={true}
            year={true}
          />
        </div>

        <hr className="border-t border-gray-300 dark:border-gray-600 mb-3" />

        <BarChart selectedDate={selectedDate} />

        <hr
          id="table-incident"
          className="border-t border-gray-300 dark:border-gray-600 mt-6 mb-6"
        />

        <DataTable
          columns={visibleColumns}
          url={`${process.env.NEXT_PUBLIC_API_URL}/api/incident?type=${
            type || "All Categories"
          }&flag=${flagType}&isClosed=${isClosed}&month=${
            month ?? currentMonth
          }&year=${year ?? currentYear}`}
          filterColumns={[
            { header: "All", accessorKey: "All" },
            ...Incident(() => {}).sort((a, b) =>
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
          refresh={refreshTable}
        />
      </div>

      <button id="toggleModal" data-modal-toggle="#modalDetail"></button>

      <ModalDetailIncident selectedData={selectedData} />
    </Main>
  );
};

export default Index;
