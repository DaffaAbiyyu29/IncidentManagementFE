import { useState } from "react";
import axios from "axios";
import { id } from "date-fns/locale";

const ModalDeletePIC = ({ selectedData }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!selectedData?.id) return;

    setLoading(true);
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pic`,
        {
          data: { ID: selectedData.id },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        const closeBtn = document.getElementById("close");
        closeBtn.click();
        const refreshTable = document.getElementById("refreshTable");
        refreshTable.click();
      } else {
        console.error("Gagal menghapus PIC");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal"
      data-modal="true"
      data-modal-persistent="true"
      id="modalDelete"
    >
      <div className="modal-content modal-center-y max-w-[500px]">
        <div className="modal-header py-4">
          <h3 className="modal-title text-xl font-bold dark:text-gray-800">
            Konfirmasi Hapus PIC
          </h3>
          <button
            id="close"
            className="btn btn-xs btn-icon btn-danger"
            data-modal-dismiss="true"
          >
            <i className="ki-outline ki-cross"></i>
          </button>
        </div>
        <div className="modal-body py-5 px-6 dark:text-gray-800">
          <p>Apakah Anda yakin ingin menghapus PIC ini?</p>
          <div className="mt-4 font-medium">
            {selectedData?.name} - {selectedData?.role}
          </div>
        </div>
        <div className="modal-footer justify-end gap-2 px-6 pb-4">
          <button
            className="btn btn-secondary"
            data-modal-dismiss="true"
            disabled={loading}
          >
            Tidak
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeletePIC;
