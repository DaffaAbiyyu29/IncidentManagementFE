import { useState } from "react";
import Main from "../../main-layouts/main";
import DataTable from "../../components/Datatables";
import { columns as Unit, defaultColumns } from "../../column-def/Unit";
import { useRouter } from "next/router";

export default function ManhourUtilization() {
  const router = useRouter();

  const [selectedData, setSelectedData] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState(defaultColumns);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleOpenModal = (rowData) => {
    setSelectedData(rowData);
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
    ? Unit(handleOpenModal)
    : Unit(handleOpenModal).filter(
        (col) =>
          "accessorKey" in col &&
          col.accessorKey &&
          selectedColumns.includes(col.accessorKey)
      );

  return (
    <Main>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Manhour Utilization</h2>
        <DataTable
          columns={visibleColumns}
          url={`${process.env.NEXT_PUBLIC_API_URL}/api/process-mh-unit`}
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
        />
      </div>
    </Main>
  );
}
