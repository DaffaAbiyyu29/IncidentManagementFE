import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Datepicker from "./Datepicker";
import { useRouter } from "next/router";
import { Loading } from "./Loading";

const DataTable = ({
  columns,
  url,
  filterColumns,
  filterDate,
  filterIncident = null,
  refresh = false,
}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedValueIncidentType, setSelectedValueIncidentType] =
    useState<string>("All Categories");
  const [flagType, setFlagType] = useState<string>("All Flag Types");
  const [isClosed, setIsClosed] = useState<string>("false");
  const [selectedValueIncidentType2, setSelectedValueIncidentType2] =
    useState<string>("0");
  const [label, setLabel] = useState<any>([]);

  const router = useRouter();
  const currentPath = router.pathname;
  // useEffect(() => {
  //   const observer = new MutationObserver(() => {
  //     setIsDarkMode(document.documentElement.classList.contains("dark"));
  //   });

  //   observer.observe(document.documentElement, {
  //     attributes: true,
  //     attributeFilter: ["className"],
  //   });

  //   return () => observer.disconnect();
  // }, []);

  const token = Cookies.get("token");
  let timeoutId;

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout

    timeoutId = setTimeout(() => {
      const getData = async () => {
        setIsLoading(true);
        try {
          const pageParam = url.includes("?")
            ? `&page=${page}`
            : `?page=${page}`;
          const finalUrl = `${url}${pageParam}&limit=${limit}&search=${search}&sort=${sort}&order=${order}`;

          const res = await axios.get(finalUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const fetchedData = res.data.data.data || [];
          setTotalPages(res.data.data.totalPages);
          setTotalItems(res.data.data.totalItems);

          const numberedData = fetchedData.map((item, index) => ({
            ...item,
            number: (page - 1) * limit + index + 1,
          }));
          setData(numberedData);
        } catch (error) {
          console.error(error);
        } finally {
          setTimeout(() => {
            setIsLoading(false);
            const theme = localStorage.getItem("theme");
            localStorage.clear();
            localStorage.setItem("theme", theme);
          }, 500);
        }
      };

      getData();
    }, 300); // delay 300ms agar perubahan bersamaan tidak trigger berkali-kali

    return () => clearTimeout(timeoutId); // Cleanup untuk mencegah pemanggilan dobel
  }, [
    page,
    limit,
    search,
    sort,
    order,
    url,
    token,
    selectedDate,
    selectedValueIncidentType,
    selectedValueIncidentType2,
    flagType,
    isClosed,
    refresh,
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderPagination = () => {
    const pageNumbers: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === page || i === totalPages) {
        pageNumbers.push(i);
      } else {
        if (i === page - 1 || i === page + 1) {
          pageNumbers.push(i);
        } else if (i === page - 2 || i === page + 2) {
          pageNumbers.push("...");
        }
      }
    }

    return pageNumbers;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const newType = localStorage.getItem("incidentType") || "All Categories";
  //     const newFlag = localStorage.getItem("flagType") || "All Flag Types";
  //     const newIsClosed = localStorage.getItem("isClosed") || "false";
  //     setSelectedValueIncidentType(newType);
  //     setSelectedValueIncidentType2(newType);
  //     setFlagType(newFlag);
  //     setIsClosed(newIsClosed);
  //   };

  //   // Listen event custom saat localStorage diubah dari komponen lain
  //   window.addEventListener("localStorageUpdated", handleStorageChange);

  //   // Optional: Jika ingin tangkap perubahan dari tab lain
  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("localStorageUpdated", handleStorageChange);
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    localStorage.setItem("incidentType", value);
    window.dispatchEvent(new Event("localStorageUpdated")); // untuk trigger re-fetch di ViewIncident
    setSelectedValueIncidentType(value);
    setSelectedValueIncidentType2(value); // update label sesuai index
  };

  const handleChangeFlag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    localStorage.setItem("flagType", value);
    window.dispatchEvent(new Event("localStorageUpdated")); // untuk trigger re-fetch di ViewIncident
    setFlagType(value);
  };

  const handleIsClosed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    localStorage.setItem("isClosed", value);
    window.dispatchEvent(new Event("localStorageUpdated")); // untuk trigger re-fetch di ViewIncident
    setIsClosed(value);
  };

  useEffect(() => {
    if (currentPath === "/pending_billing") {
      setLabel(["No Incident", "Dispatch BA", "Dispatch User"]);
    } else if (currentPath === "/pending_ar") {
      setLabel(["No Incident", "Dispatch BA", "Dispatch User"]);
    } else if (currentPath === "/manhour_utilization") {
      setLabel(["No Incident", "Discrepancy < 10%", "Discrepancy > 10%"]);
    }
  }, [currentPath, filterIncident]); // ← hanya jalan saat currentPath / filterIncident berubah

  useEffect(() => {
    const handler = (e: any) => {
      setSelectedValueIncidentType(e.detail);
    };
    window.addEventListener("incidentBarClicked", handler);
    return () => window.removeEventListener("incidentBarClicked", handler);
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-col md:flex-row md:justify-between md:items-center mb-5 gap-4">
        {/* Left Side: Show & Entries, Column Filter */}
        <div className="flex flex-col sm:flex-col md:flex-row md:items-center gap-4">
          <label className="text-sm font-medium dark:text-gray-800">Show</label>
          <div className="relative">
            <div
              className="dropdown h-10"
              data-dropdown="true"
              data-dropdown-trigger="click"
            >
              <button className="dropdown-toggle btn shadow-md shadow-gray-300 border-gray-300 bg-white dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300">
                {limit}
                <i className="ki-duotone ki-down ml-2 !text-sm dropdown-open:hidden" />
                <i className="ki-duotone ki-up ml-2 !text-sm hidden dropdown-open:block" />
              </button>
              <div
                data-dropdown-dismiss="true"
                className="dropdown-content mt-2 w-full max-w-20 max-h-60 overflow-y-auto border border-gray-300 shadow-lg bg-white text-black rounded-xl dark:border-gray-400 dark:bg-gray-100 dark:text-gray-800"
              >
                <div className="menu flex flex-col items-center py-2">
                  {[10, 25, 50, 100, 200].map((item) => (
                    <div
                      key={item}
                      className="menu-item w-full text-center hover:bg-gray-100 dark:hover:bg-gray-200 transition"
                    >
                      <a
                        href="#"
                        className="block px-3 py-1 text-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          setLimit(item);
                          setSort("");
                          setOrder("");
                          setPage(1);
                        }}
                      >
                        {item}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <span className="text-sm font-medium dark:text-gray-800">
            entries
          </span>

          {filterColumns && (
            <div
              className="dropdown h-10"
              data-dropdown="true"
              data-dropdown-trigger="click"
            >
              <button className="dropdown-toggle btn h-10 shadow-md shadow-gray-300 border-gray-300 bg-white dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300">
                Field Selector
                <i className="ki-duotone ki-down ml-2 !text-sm dropdown-open:hidden" />
                <i className="ki-duotone ki-up ml-2 !text-sm hidden dropdown-open:block" />
              </button>
              <div
                className="dropdown-content mt-2 w-full max-w-56 py-2 max-h-60 overflow-y-auto border border-gray-300 shadow-lg bg-white text-black rounded-xl dark:border-gray-400 dark:bg-gray-100 dark:text-gray-800"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#cbd5e1 transparent",
                }}
              >
                <div className="flex flex-wrap gap-2 p-2">{filterColumns}</div>
              </div>
            </div>
          )}

          {filterIncident && (
            <div
              className="dropdown h-10"
              data-dropdown="true"
              data-dropdown-trigger="click"
            >
              <button className="dropdown-toggle btn h-10 shadow-md shadow-gray-300 border-gray-300 bg-white dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300">
                {label[selectedValueIncidentType2]}
                <i className="ki-duotone ki-down ml-2 !text-sm dropdown-open:hidden" />
                <i className="ki-duotone ki-up ml-2 !text-sm hidden dropdown-open:block" />
              </button>
              <div
                className="dropdown-content mt-2 w-full max-w-56 py-2 max-h-65 overflow-y-auto border border-gray-300 shadow-lg bg-white text-black rounded-xl dark:border-gray-400 dark:bg-gray-100 dark:text-gray-800"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#cbd5e1 transparent",
                }}
              >
                <div className="flex flex-col items-start gap-4 p-2">
                  {label.map((labelText, index) => (
                    <label
                      key={index}
                      className="form-label flex items-center gap-2.5"
                    >
                      <input
                        className="radio"
                        type="radio"
                        name="columnChoice"
                        value={index.toString()}
                        checked={
                          selectedValueIncidentType2 === index.toString()
                        }
                        onChange={handleChange}
                      />
                      {labelText}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentPath === "/" && (
            <>
              <div
                className="dropdown h-10"
                data-dropdown="true"
                data-dropdown-trigger="click"
              >
                <button className="dropdown-toggle btn h-10 shadow-md shadow-gray-300 border-gray-300 bg-white dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300">
                  {selectedValueIncidentType || "All Categories"}
                  <i className="ki-duotone ki-down ml-2 !text-sm dropdown-open:hidden" />
                  <i className="ki-duotone ki-up ml-2 !text-sm hidden dropdown-open:block" />
                </button>
                <div
                  className="dropdown-content mt-2 w-full max-w-56 py-2 max-h-65 overflow-y-auto border border-gray-300 shadow-lg bg-white text-black rounded-xl dark:border-gray-400 dark:bg-gray-100 dark:text-gray-800"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#cbd5e1 transparent",
                  }}
                >
                  <div className="flex flex-col items-start gap-4 p-2">
                    <label
                      key={0}
                      className="form-label flex items-center gap-2.5"
                    >
                      <input
                        className="radio"
                        type="radio"
                        name="columnChoice"
                        value={"All Categories"}
                        checked={selectedValueIncidentType === "All Categories"}
                        onChange={handleChange}
                      />
                      All Categories
                    </label>

                    {[
                      "Pending AR",
                      "Pending Billing",
                      "Manhour Discrepancy",
                      "Delay Operation",
                      "Vendor Performance",
                      "Subcont Performance",
                    ].map((label, index) => (
                      <label
                        key={index}
                        className="form-label flex items-center gap-2.5"
                      >
                        <input
                          className="radio"
                          type="radio"
                          name="columnChoice"
                          value={label}
                          checked={selectedValueIncidentType === label}
                          onChange={handleChange}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="dropdown h-10"
                data-dropdown="true"
                data-dropdown-trigger="click"
              >
                <button className="dropdown-toggle btn h-10 shadow-md shadow-gray-300 border-gray-300 bg-white dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300">
                  {flagType || "All Flag Types"}
                  <i className="ki-duotone ki-down ml-2 !text-sm dropdown-open:hidden" />
                  <i className="ki-duotone ki-up ml-2 !text-sm hidden dropdown-open:block" />
                </button>
                <div
                  className="dropdown-content mt-2 w-full max-w-56 py-2 max-h-65 overflow-y-auto border border-gray-300 shadow-lg bg-white text-black rounded-xl dark:border-gray-400 dark:bg-gray-100 dark:text-gray-800"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#cbd5e1 transparent",
                  }}
                >
                  <div className="flex flex-col items-start gap-4 p-2">
                    <label
                      key={0}
                      className="form-label flex items-center gap-2.5"
                    >
                      <input
                        className="radio"
                        type="radio"
                        name="columnChoiceFlag"
                        value={"All Flag Types"}
                        checked={flagType === "All Flag Types"}
                        onChange={handleChangeFlag}
                      />
                      All Flag Types
                    </label>

                    {["Flag", "Unflag"].map((label, index) => (
                      <label
                        key={index}
                        className="form-label flex items-center gap-2.5"
                      >
                        <input
                          className="radio"
                          type="radio"
                          name="columnChoiceFlag"
                          value={label}
                          checked={flagType === label}
                          onChange={handleChangeFlag}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="dropdown h-10"
                data-dropdown="true"
                data-dropdown-trigger="click"
              >
                <button className="dropdown-toggle btn h-10 shadow-md shadow-gray-300 border-gray-300 bg-white dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300">
                  {isClosed === "true" ? "Closed" : "Open"}
                  <i className="ki-duotone ki-down ml-2 !text-sm dropdown-open:hidden" />
                  <i className="ki-duotone ki-up ml-2 !text-sm hidden dropdown-open:block" />
                </button>
                <div
                  className="dropdown-content mt-2 w-full max-w-56 py-2 max-h-65 overflow-y-auto border border-gray-300 shadow-lg bg-white text-black rounded-xl dark:border-gray-400 dark:bg-gray-100 dark:text-gray-800"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#cbd5e1 transparent",
                  }}
                >
                  <div className="flex flex-col items-start gap-4 p-2">
                    <label className="form-label flex items-center gap-2.5">
                      <input
                        className="radio"
                        type="radio"
                        name="columnChoiceIsClosed"
                        value="false"
                        checked={isClosed === "false"}
                        onChange={handleIsClosed}
                      />
                      Open
                    </label>
                    <label className="form-label flex items-center gap-2.5">
                      <input
                        className="radio"
                        type="radio"
                        name="columnChoiceIsClosed"
                        value="true"
                        checked={isClosed === "true"}
                        onChange={handleIsClosed}
                      />
                      Closed
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Side: Date Filter & Search */}
        <div className="flex flex-col sm:flex-col md:flex-row md:items-center gap-4">
          {filterDate && (
            <>
              <label className="text-sm font-medium dark:text-gray-800">
                {currentPath.includes("pending_ar")
                  ? "Net Due Date"
                  : currentPath.includes("pending_billing")
                  ? "Bill Date"
                  : currentPath.includes("manhour_utilization")
                  ? "MPS Due Date"
                  : currentPath.includes("delay_operation")
                  ? "MPS Due Date"
                  : currentPath.includes("vendor_performance") ||
                    currentPath.includes("subcont_performance")
                  ? "PO Date"
                  : ""}
              </label>
              <Datepicker
                value={selectedDate}
                onChange={handleDateChange}
                day={false}
                month={true}
                year={true}
              />
            </>
          )}

          <label className="text-sm font-medium dark:text-gray-800">
            Search
          </label>
          <div className="relative group">
            <div className="flex items-center border-2 rounded-lg h-10 shadow-md shadow-gray-300 border-gray-300 px-3 py-2 bg-white dark:bg-gray-100 dark:border-gray-300">
              <i className="ki-duotone ki-magnifier text-gray-500 mr-2 relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0d0e12] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  Please enter a keyword to search.
                </span>
              </i>
              <input
                className="text-sm text-black bg-transparent outline-none dark:text-gray-800"
                placeholder="Search..."
                type="text"
                defaultValue={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table dengan Scroll jika perlu */}
      {isLoading && <Loading />}

      <div className="grid">
        <div className="border border-gray-200 dark:border-gray-300 card min-w-full shadow-md shadow-gray-300">
          <div className="card-table scrollable-x-auto">
            <table className="table align-middle text-gray-700 text-sm w-full">
              <thead className="bg-gray-200 dark:bg-gray-700">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    <th className="p-4 text-center">
                      <div className="font-bold uppercase">No</div>
                    </th>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-4 cursor-pointer select-none text-center"
                        onClick={() => {
                          if (!header.column.getCanSort()) return;
                          setSort(header.column.id);
                          setOrder(order === "asc" ? "desc" : "asc");
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 text-center text-nowrap font-bold uppercase">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          {header.column.getCanSort() && (
                            <i
                              className={clsx(
                                "ki-duotone text-xs",
                                header.column.getIsSorted() === "asc"
                                  ? "ki-arrow-up"
                                  : header.column.getIsSorted() === "desc"
                                  ? "ki-arrow-down"
                                  : "ki-arrow-up-down"
                              )}
                            ></i>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={clsx(
                        // "hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors",
                        row.original.flagStatus === 1 &&
                          "bg-yellow-200 dark:text-dark"
                      )}
                    >
                      <td className="text-center p-4 border-b border-gray-200 dark:border-gray-600">
                        {index + 1}
                      </td>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="p-4 border-b border-gray-200 dark:border-gray-600"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center p-4">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="my-3 flex justify-between items-center">
        <div>
          {/* <span className="text-sm font-semibold dark:text-gray-800">
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, totalItems)} of {totalItems} entries
          </span> */}
          <span className="text-sm font-normal dark:text-gray-800">
            Showing {totalItems === 0 ? 0 : (page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, totalItems)} of {totalItems} entries
          </span>
        </div>
        <div className="flex items-center text-sm font-normal gap-x-1">
          <button
            disabled={isLoading || page === 1}
            onClick={() => setPage(1)}
            className="btn btn-sm hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-100"
          >
            <i className="ki-solid ki-double-left-arrow"></i>
          </button>
          <button
            disabled={isLoading || page === 1}
            onClick={() => setPage(page - 1)}
            className="btn btn-sm hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-100"
          >
            <i className="ki-solid ki-to-left"></i>
          </button>

          {renderPagination().map((number, index) => (
            <button
              key={index}
              onClick={() => typeof number === "number" && setPage(number)}
              disabled={isLoading || typeof number === "string"}
              className={clsx(
                "btn btn-sm",
                number === page
                  ? "bg-blue-500 text-white font-bold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-100 dark:text-gray-800"
              )}
            >
              {number}
            </button>
          ))}

          <button
            disabled={isLoading || page === totalPages}
            onClick={() => setPage(page + 1)}
            className="btn btn-sm hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-100"
          >
            <i className="ki-solid ki-to-right"></i>
          </button>
          <button
            disabled={isLoading || page === totalPages}
            onClick={() => setPage(totalPages)}
            className="btn btn-sm hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-100"
          >
            <i className="ki-solid ki-double-right-arrow"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
