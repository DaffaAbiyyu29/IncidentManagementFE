import { useState } from "react";
import Main from "../../main-layouts/main";
import DataTable from "../../components/Datatables";
import { columns as Process, defaultColumns } from "../../column-def/Process";
import ModalDetailManhour from "@/components/modal/ModalDetailManhour";

export default function ManhourUtilization() {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState(defaultColumns);
  const [isAllSelected, setIsAllSelected] = useState(false);

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
      <DataTable
        columns={visibleColumns}
        url={`${process.env.NEXT_PUBLIC_API_URL}/api/process`}
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
      />

      <button id="toggleModal" data-modal-toggle="#modalDetail"></button>

      <ModalDetailManhour selectedData={selectedData} />
    </Main>
  );
}
