import { useState } from "react";
import Main from "../../main-layouts/main";
import DataTable from "../../components/Datatables";
import { columns as dataPIC, defaultColumns } from "../../column-def/MsUsers";
import ModalDetailPIC from "@/components/modal/modalDetailPIC";
import ModalUpdatePIC from "@/components/modal/modalUpdatePIC";
import ModalDeletePIC from "@/components/modal/modalDeletePIC";

export default function PIC() {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState(defaultColumns);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  const handleOpenModal = (rowData, type) => {
    setSelectedData(rowData);

    if (type === "view") {
      document.getElementById("toggleModal").click();
    } else if (type === "update") {
      document.getElementById("toggleModalUpdate").click();
    } else if (type === "delete") {
      document.getElementById("toggleModalDelete").click();
    }
  };

  const handleColumnToggle = (key) => {
    if (key === "All") {
      if (isAllSelected) {
        setSelectedColumns(defaultColumns);
        setIsAllSelected(false);
      } else {
        setSelectedColumns(
          dataPIC(() => {})
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
    ? dataPIC(handleOpenModal)
    : dataPIC(handleOpenModal).filter(
        (col) =>
          "accessorKey" in col &&
          col.accessorKey &&
          selectedColumns.includes(col.accessorKey)
      );

  return (
    <Main>
      <div className="p-6 shadow-md shadow-gray-300 rounded-lg dark:border-gray-300 dark:bg-[#111217] dark:text-white border-gray-300 bg-white text-black mb-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-gray-800">PIC</h2>
          <button className="btn btn-outline btn-primary">
            <i className="ki-outline ki-plus-squared"></i>
            Tambah PIC
          </button>
        </div>

        <hr className="border-t border-gray-300 dark:border-gray-600 mb-4" />

        <DataTable
          key={tableKey}
          columns={visibleColumns}
          url={`${process.env.NEXT_PUBLIC_API_URL}/api/pic`}
          filterColumns={[
            { header: "All", accessorKey: "All" },
            ...dataPIC(() => {}).sort((a, b) =>
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

      <button
        id="refreshTable"
        onClick={() => setTableKey((prev) => prev + 1)}
      />

      <button id="toggleModal" data-modal-toggle="#modalDetail"></button>
      <button id="toggleModalUpdate" data-modal-toggle="#modalUpdate"></button>
      <button id="toggleModalDelete" data-modal-toggle="#modalDelete"></button>

      <ModalDetailPIC selectedData={selectedData} />
      <ModalUpdatePIC selectedData={selectedData} />
      <ModalDeletePIC selectedData={selectedData} />
    </Main>
  );
}
