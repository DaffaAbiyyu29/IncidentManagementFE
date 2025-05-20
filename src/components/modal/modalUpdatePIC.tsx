const ModalUpdatePIC = ({ selectedData }) => {
  return (
    <div
      className="modal"
      data-modal="true"
      data-modal-persistent="true"
      id="modalUpdate"
    >
      <div className="modal-content modal-center-y max-w-[800px]">
        <div className="modal-header py-4">
          <h3 className="modal-title text-xl font-bold dark:text-gray-800">
            Update PIC
          </h3>
          <button
            className="btn btn-xs btn-icon btn-danger"
            data-modal-dismiss="true"
          >
            <i className="ki-outline ki-cross"></i>
          </button>
        </div>
        <div className="modal-body scrollable-y py-0 my-5 pl-6 pr-3 mr-3 h-[400px] max-h-[100%]">
          {selectedData ? (
            <div className="grid grid-cols-2 gap-4 dark:text-gray-800 border rounded-lg p-4">
              {[
                "ID",
                "User ID",
                "Nama",
                "Departemen",
                "Divisi",
                "Email",
                "Role",
                "Created at",
                "Updated at",
              ].map((label, index) => (
                <div key={index} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{label}</span>
                  <span className="text-gray-700">
                    {selectedData[
                      label
                        .replace("ID", "id")
                        .replace("User ID", "userID")
                        .replace("Nama", "name")
                        .replace("Departemen", "departemen")
                        .replace("Divisi", "divisi")
                        .replace("Email", "email")
                        .replace("Role", "role")
                        .replace("Created at", "created_at")
                        .replace("Updated at", "updated_at")
                    ] || "-"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>Data tidak tersedia</p>
          )}
        </div>
        <div className="modal-footer justify-end">
          <button className="btn btn-danger" data-modal-dismiss="true">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalUpdatePIC;
