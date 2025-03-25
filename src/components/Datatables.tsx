import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// Contoh penggunaan:
// <DataTable columns={columns} url="/api/users" />
// type IUser = {
//   id: string;
//   name: string;
//   email: string;
//   personal_number: string;
// };

// const columns: ColumnDef<IUser>[] = [
//   {
//     accessorKey: "number",
//     header: "#",
//     enableSorting: false,
//   },
//   {
//     accessorKey: "id",
//     header: "ID",
//     enableSorting: false,
//   },
//   {
//     accessorKey: "name",
//     header: "Name",
//     enableSorting: true,
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//     enableSorting: true,
//   },
//   {
//     accessorKey: "personal_number",
//     header: "NRP",
//     enableSorting: true,
//   },
//   {
//     accessorKey: "",
//     header: "Action",
//     cell: ({ row }) => {
//       const data = row.original;
//       console.log(data);
//       return (
//         <div className="flex space-x-1 justify-center">
//           <button className={clsx(
//             "btn btn-icon bg-blue-500 btn-xs transition-transform",
//             "hover:scale-[105%]",
//             "active:scale-[100%]"
//           )}>
//             <i className="ki-duotone ki-eye text-white"></i>
//           </button>
//           <button className={clsx(
//             "btn btn-icon bg-orange-500 btn-xs transition-transform",
//             "hover:scale-[105%]",
//             "active:scale-[100%]"
//           )}>
//             <i className="ki-duotone ki-pencil text-white"></i>
//           </button>
//           <button className={clsx(
//             "btn btn-icon bg-red-500 btn-xs transition-transform",
//             "hover:scale-[105%]",
//             "active:scale-[100%]"
//           )}>
//             <i className="ki-duotone ki-trash text-white"></i>
//           </button>
//         </div>
//       )
//     }
//   },
// ];

const DataTable = ({ columns, url, filterColumns }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  // useEffect(() => {
  //   const observer = new MutationObserver(() => {
  //     setIsDarkMode(document.documentElement.classList.contains("dark"));
  //   });

  //   observer.observe(document.documentElement, {
  //     attributes: true,
  //     attributeFilter: ["class"],
  //   });

  //   return () => observer.disconnect();
  // }, []);

  const token = Cookies.get("token");
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const pageParam = url.includes("?") ? `&page=${page}` : `?page=${page}`;
        const finalUrl = `${url}${pageParam}&limit=${limit}&search=${search}&sort=${sort}&order=${order}`;

        const res = await axios.get(finalUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data.data.data);
        setTotalPages(res.data.data.totalPages);
        setTotalItems(res.data.data.totalItems);

        const numberedData = res.data.data.data.map((item, index: number) => ({
          ...item,
          number: (page - 1) * limit + index + 1,
        }));
        setData(numberedData);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };
    getData();
  }, [page, limit, search, sort, order, url, token]);

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

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        {/* Limit */}
        <div className="flex items-center gap-2">
          <label className={clsx(isDarkMode ? "text-white" : "text-gray-800")}>
            Show:
          </label>
          <div
            className="dropdown"
            data-dropdown="true"
            data-dropdown-trigger="click"
          >
            <button className="dropdown-toggle btn btn-light">
              {limit}
              <i className="ki-duotone ki-down !text-sm dropdown-open:hidden"></i>
              <i className="ki-duotone ki-up !text-sm hidden dropdown-open:block"></i>
            </button>
            <div
              data-dropdown-dismiss="true"
              // className="dropdown-content max-w-16 max-h-60 overflow-y-auto border border-gray-300 shadow-lg bg-white rounded-md"
              className={clsx(
                "dropdown-content max-w-16 max-h-60 overflow-y-auto border border-gray-300 shadow-lg bg-white rounded-md",
                isDarkMode
                  ? "border-gray-300 bg-gray-200 text-white"
                  : "border-gray-300 bg-white text-black"
              )}
            >
              <div className="menu menu-default flex flex-col items-center">
                {[10, 25, 50, 100, 200].map((item) => (
                  <div key={item} className="menu-item w-full text-center">
                    <a
                      className="menu-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setLimit(item);
                        setSort("");
                        setOrder("");
                        setPage(1);
                      }}
                    >
                      <span className="menu-title">{item}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setSort("");
              setOrder("");
              setPage(1);
            }}
            className={clsx(
              "border rounded p-1",
              "focus:duotone focus:duotone-1"
            )}
          >
            {[10, 25, 50, 100, 200].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select> */}

          <span className={clsx(isDarkMode ? "text-white" : "text-gray-800")}>
            entries
          </span>

          {filterColumns && (
            <div
              className="dropdown"
              data-dropdown="true"
              data-dropdown-trigger="click"
            >
              <button className="dropdown-toggle btn btn-light">
                Columns
                <i className="ki-duotone ki-down !text-sm dropdown-open:hidden"></i>
                <i className="ki-duotone ki-up !text-sm hidden dropdown-open:block"></i>
              </button>
              <div
                // className="dropdown-content w-full max-w-56 py-2 max-h-60 overflow-y-auto border border-gray-300 shadow-lg bg-white rounded-md"
                className={clsx(
                  "dropdown-content w-full max-w-56 py-2 max-h-60 overflow-y-auto border border-gray-300 shadow-lg bg-white rounded-md",
                  isDarkMode
                    ? "border-gray-300 bg-gray-200 text-white"
                    : "border-gray-300 bg-white text-black"
                )}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: isDarkMode
                    ? "#6b7280 transparent"
                    : "#cbd5e1 transparent",
                }}
              >
                <div className="menu menu-default flex flex-wrap gap-0 w-full p-2">
                  {filterColumns}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search di sebelah kanan */}
        <div className="flex items-center gap-2 ml-auto">
          <label>Search:</label>
          <div className="input">
            <span data-tooltip-placement="left" data-tooltip="#my_tooltip">
              <i className="ki-duotone ki-magnifier"></i>
            </span>
            <input
              placeholder="Search..."
              type="text"
              defaultValue={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />{" "}
          </div>
          <div
            className="tooltip transition-opacity duration-300"
            id="my_tooltip"
          >
            Please enter a keyword to search.
          </div>
        </div>
      </div>

      {/* Table dengan Scroll jika perlu */}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-70 z-10 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-white bg-slate-500 px-4 py-2 rounded">
            <i className="ki-duotone ki-setting-2 animate-spin text-md"></i>
            <span>Loading...</span>
          </div>
        </div>
      )}

      <div className="grid">
        <div className="border border-gray-200 dark:border-gray-300 card min-w-full">
          <div className="card-table scrollable-x-auto">
            <table className="table align-middle text-gray-700 font-medium text-sm">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    <th className="p-6">No</th>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-2 cursor-pointer select-none"
                        onClick={() => {
                          if (!header.column.getCanSort()) return;
                          setSort(header.column.id);
                          setOrder(order === "asc" ? "desc" : "asc");
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 text-center text-nowrap">
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
                    <tr key={row.id} className="font-normal">
                      <td className="text-left">{index + 1}</td>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-2">
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
          <span
            className={clsx(
              "text-sm font-semibold",
              isDarkMode ? "text-white" : "text-gray-600"
            )}
          >
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, totalItems)} of {totalItems} entries
          </span>
        </div>
        <div className="flex items-center text-sm font-normal gap-x-1">
          <button
            disabled={isLoading || page === 1}
            onClick={() => setPage(1)}
            className={clsx(
              "btn btn-sm",
              isDarkMode ? "text-white hover:bg-gray-200" : "hover:bg-gray-100"
            )}
          >
            <i className="ki-solid ki-double-left-arrow"></i>
          </button>
          <button
            disabled={isLoading || page === 1}
            onClick={() => setPage(page - 1)}
            className={clsx(
              "btn btn-sm",
              isDarkMode ? "text-white hover:bg-gray-200" : "hover:bg-gray-100"
            )}
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
                  ? isDarkMode
                    ? "bg-blue-500 text-white font-bold"
                    : "bg-blue-500 text-white font-bold"
                  : isDarkMode
                  ? "text-white hover:bg-gray-200"
                  : "hover:bg-gray-100"
              )}
            >
              {number}
            </button>
          ))}

          <button
            disabled={isLoading || page === totalPages}
            onClick={() => setPage(page + 1)}
            className={clsx(
              "btn btn-sm",
              isDarkMode ? "text-white hover:bg-gray-200" : "hover:bg-gray-100"
            )}
          >
            <i className="ki-solid ki-to-right"></i>
          </button>
          <button
            disabled={isLoading || page === totalPages}
            onClick={() => setPage(totalPages)}
            className={clsx(
              "btn btn-sm",
              isDarkMode ? "text-white hover:bg-gray-200" : "hover:bg-gray-100"
            )}
          >
            <i className="ki-solid ki-double-right-arrow"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
