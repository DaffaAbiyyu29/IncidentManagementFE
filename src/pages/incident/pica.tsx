import Main from "../../main-layouts/main";
import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { showToast } from "@/helper/showToast";
import axios from "axios";

export default function PICA() {
  // const searchParams = useSearchParams();
  // const id = searchParams.get("id");
  const router = useRouter();

  const [logID, setLogID] = useState<string>(localStorage.getItem("LogID"));
  const [rows, setRows] = useState(5);
  const [data, setData] = useState(
    Array(rows).fill({
      problem: "",
      rootCause: "",
      correctiveAction: "",
      preventiveAction: "",
      status: "Not Solved",
    })
  );
  const cols = 4; // kolom input (selain No dan Status)
  const inputRefs = useRef<HTMLInputElement[][]>([]);

  useEffect(() => {
    const handleRouteChange = () => {
      localStorage.removeItem("LogID");
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  // Effect untuk load data dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    // Fetch data from the API
    const fetchPICAData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pica/${logID}`
        );
        const { success, data: picaData } = response.data;

        if (success && picaData) {
          const { details } = picaData;

          // Filter out empty rows
          const filteredData = details.filter(
            (row: any) =>
              row.Problem?.trim() !== "" ||
              row.RootCaused?.trim() !== "" ||
              row.CorrectiveAction?.trim() !== "" ||
              row.PreventiveAction?.trim() !== ""
          );

          // Add an empty row for new input
          const updatedData = [
            ...filteredData.map((row: any) => ({
              problem: row.Problem || "",
              rootCause: row.RootCaused || "",
              correctiveAction: row.CorrectiveAction || "",
              preventiveAction: row.PreventiveAction || "",
              status: row.Status || "Not Solved",
            })),
            {
              problem: "",
              rootCause: "",
              correctiveAction: "",
              preventiveAction: "",
              status: "Not Solved",
            },
          ];

          setData(updatedData);
          setRows(updatedData.length);
        }
      } catch (error) {
        router.push("/");
      }
    };

    fetchPICAData();
  }, []);

  // Function to handle keydown event
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const totalRow = inputRefs.current.length;

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (row + 1 < totalRow) {
          inputRefs.current[row + 1][col]?.focus();
        } else {
          setRows((prev) => prev + 1);
          setData((prev) => [
            ...prev,
            {
              problem: "",
              rootCause: "",
              correctiveAction: "",
              preventiveAction: "",
              status: "Not Solved",
            },
          ]);
          setTimeout(() => {
            inputRefs.current[row + 1]?.[col]?.focus();
          }, 0);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (row + 1 < totalRow) inputRefs.current[row + 1][col]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        if (row - 1 >= 0) inputRefs.current[row - 1][col]?.focus();
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (col - 1 >= 0) inputRefs.current[row][col - 1]?.focus();
        break;
      case "ArrowRight":
        e.preventDefault();
        if (col + 1 < cols) inputRefs.current[row][col + 1]?.focus();
        break;
    }
  };

  const handleInputChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    setData((prev) => {
      const updated = [...prev];
      const updatedRow = { ...updated[rowIndex] };
      if (colIndex === 0) updatedRow.problem = value; // Problem column
      if (colIndex === 1) updatedRow.rootCause = value; // Root Cause column
      if (colIndex === 2) updatedRow.correctiveAction = value; // Corrective Action column
      if (colIndex === 3) updatedRow.preventiveAction = value; // Preventive Action column
      updated[rowIndex] = updatedRow;
      return updated;
    });
  };

  const handleStatusChange = (rowIndex: number, value: string) => {
    setData((prev) => {
      const updated = [...prev];
      updated[rowIndex].status = value;
      return updated;
    });
  };

  // Function to save data to localStorage
  const saveToLocalStorage = async () => {
    const incidentID = logID; // Ganti dengan ID yang sesuai jika dinamis
    const createdBy = null; // Ganti jika diperlukan

    const details = data
      .filter(
        (row) =>
          row.status &&
          (row.problem ||
            row.rootCause ||
            row.correctiveAction ||
            row.preventiveAction)
      ) // Pastikan ada data lain selain status
      .map((row, index) => ({
        DetailPICAID: index + 1,
        Status: row.status,
        Problem: row.problem,
        RootCaused: row.rootCause,
        CorrectiveAction: row.correctiveAction,
        PreventiveAction: row.preventiveAction,
      }));

    const dataToSave = {
      IncidentID: Number(incidentID),
      created_by: createdBy,
      details: details,
    };

    try {
      const token = localStorage.getItem("token"); // Pastikan token disimpan di localStorage
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pica`,
        dataToSave, // Ini body-nya
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        showToast(
          "PICA Berhasil disimpan!",
          "success",
          localStorage.getItem("theme") === "light" ? "light" : "dark"
        );
      }
    } catch (error) {
      console.error("Gagal menyimpan PICA:", error);
      showToast(
        "Gagal menyimpan PICA!",
        "error",
        localStorage.getItem("theme") === "light" ? "light" : "dark"
      );
    }
  };

  // Effect hook to handle the keydown event for Ctrl + S
  useEffect(() => {
    const handleCtrlS = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault(); // Prevent default save action
        saveToLocalStorage(); // Save data to localStorage
      }
    };

    window.addEventListener("keydown", handleCtrlS);

    return () => {
      window.removeEventListener("keydown", handleCtrlS); // Cleanup on component unmount
    };
  }, [rows, data]);

  return (
    <Main>
      <div className="p-6 shadow-md shadow-gray-300 rounded-lg dark:bg-[#111217] dark:text-white bg-white text-black mb-2">
        <h2 className="text-xl font-bold dark:text-gray-800 mb-4">
          PICA Incident - {logID}
        </h2>

        <hr className="border-t border-gray-300 dark:border-gray-600 mb-4" />

        <div className="grid">
          <div className="border border-gray-200 dark:border-gray-300 card min-w-full shadow-md shadow-gray-300">
            <div className="card-table scrollable-x-auto">
              <table className="table align-middle text-gray-700 text-sm w-full">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="p-4 text-center">
                      <div className="font-bold uppercase">No</div>
                    </th>
                    <th className="p-4 text-center">
                      <div className="font-bold uppercase">Problem</div>
                    </th>
                    <th className="p-4 text-center">
                      <div className="font-bold uppercase">Root Caused</div>
                    </th>
                    <th className="p-4 text-center">
                      <div className="font-bold uppercase">
                        Corrective Action
                      </div>
                    </th>
                    <th className="p-4 text-center">
                      <div className="font-bold uppercase">
                        Preventive Action
                      </div>
                    </th>
                    <th className="p-4 text-center">
                      <div className="font-bold uppercase">Status</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: rows }).map((_, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
                    >
                      <td className="text-center p-4 border-b border-gray-200 dark:border-gray-600">
                        {rowIndex + 1}
                      </td>
                      {Array.from({ length: cols }).map((_, colIndex) => {
                        if (!inputRefs.current[rowIndex]) {
                          inputRefs.current[rowIndex] = [];
                        }
                        return (
                          <td
                            key={colIndex}
                            className="border border-gray-300 dark:border-gray-600 px-2 py-2"
                          >
                            <input
                              ref={(el) => {
                                if (el) {
                                  inputRefs.current[rowIndex][colIndex] = el;
                                }
                              }}
                              type="text"
                              value={
                                colIndex === 0
                                  ? data[rowIndex].problem
                                  : colIndex === 1
                                  ? data[rowIndex].rootCause
                                  : colIndex === 2
                                  ? data[rowIndex].correctiveAction
                                  : colIndex === 3
                                  ? data[rowIndex].preventiveAction
                                  : ""
                              }
                              className="w-full h-full bg-transparent border-none outline-none focus:ring-0"
                              onChange={(e) =>
                                handleInputChange(
                                  rowIndex,
                                  colIndex,
                                  e.target.value
                                )
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(e, rowIndex, colIndex)
                              }
                            />
                          </td>
                        );
                      })}
                      {/* Dropdown Status */}
                      <td className="border border-gray-300 dark:border-gray-600 px-2 py-2">
                        <select
                          value={data[rowIndex].status}
                          onChange={(e) =>
                            handleStatusChange(rowIndex, e.target.value)
                          }
                          className="w-full h-full bg-transparent border-none outline-none focus:ring-0 text-center"
                          style={{ width: "100%", padding: 0, margin: 0 }}
                        >
                          <option value="Not Solved">Not Solved</option>
                          <option value="Solved">Solved</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}
