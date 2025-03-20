import { useState } from "react";
import Main from "../../main-layouts/main";
import DataTable from "../../components/Datatables";
import { columns as AllPro, defaultColumns } from "../../column-def/AllPro";
import ModalDetailVendor from "@/components/modal/ModalDetailVendor";

export default function VendorPerformance() {
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
          AllPro(() => {})
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
    ? AllPro(handleOpenModal)
    : AllPro(handleOpenModal).filter(
        (col) =>
          "accessorKey" in col &&
          col.accessorKey &&
          selectedColumns.includes(col.accessorKey)
      );

  return (
    <Main>
      <DataTable
        columns={visibleColumns}
        url={`${process.env.NEXT_PUBLIC_API_URL}/api/subcont-performance`}
        filterColumns={[
          { header: "All", accessorKey: "All" },
          ...AllPro(() => {}).sort((a, b) =>
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

      <ModalDetailVendor selectedData={selectedData} />
    </Main>
  );
}
