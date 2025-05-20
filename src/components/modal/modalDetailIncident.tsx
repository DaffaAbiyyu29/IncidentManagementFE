import React, { useEffect, useState } from "react";
import { format, set } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";

const ModalDetailIncident = ({ selectedData }) => {
  const [users, setUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null); // awalnya null

  const formatTanggal = (tanggal) => {
    try {
      return format(new Date(tanggal), "EEEE, dd MMMM yyyy", { locale: id });
    } catch {
      return "-";
    }
  };

  const tanggalKeys = [
    "BAEmailDate",
    "UserEmailDate",
    "OpenDate",
    "ClosedDate",
  ];

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user`);
      setUsers(response.data.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const assignPICUser = () => {
    console.log(selectedData);
    console.log(selectedUser);
  };

  return (
    <div
      className="modal"
      data-modal="true"
      data-modal-persistent="true"
      id="modalDetail"
    >
      <div className="modal-content modal-center-y max-w-[800px]">
        <div className="modal-header py-4">
          <h3 className="modal-title text-xl font-bold dark:text-gray-800">
            Detail Incident
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
                // { label: "Incident ID", key: "incidentID" },
                { label: "Incident Type", key: "incidentType" },
                { label: "Deskripsi", key: "description" },
                { label: "PIC BA", key: "ba" },
                { label: "Email PIC BA", key: "baEmail" },
                { label: "PIC User", key: "user" },
                { label: "Email PIC User", key: "userEmail" },
                { label: "Tanggal Email BA", key: "baEmailDate" },
                { label: "Tanggal Email User", key: "userEmailDate" },
                { label: "Status Email BA", key: "baEmailStatus" },
                { label: "Status Email User", key: "userEmailStatus" },
                { label: "Status", key: "status" },
                { label: "Tanggal Dibuka", key: "openDate" },
                { label: "Tanggal Ditutup", key: "closedDate" },
              ].map(({ label, key }, index) => {
                const rawValue = key.includes(".")
                  ? key
                      .split(".")
                      .reduce((acc, part) => acc?.[part], selectedData)
                  : selectedData[key];

                const value = tanggalKeys.includes(key)
                  ? rawValue
                    ? formatTanggal(rawValue)
                    : "-"
                  : key === "userEmail" && selectedUser
                  ? selectedUser.email || "-"
                  : rawValue ?? "-"; // <= ini yang diperbaiki

                const isPICUser = key === "user";

                return (
                  <div
                    key={index}
                    className="flex justify-between border-b pb-2 items-center"
                  >
                    <span className="font-medium">{label}</span>
                    <span className="text-gray-700">
                      {isPICUser && !rawValue ? (
                        <div
                          className="dropdown h-10"
                          data-dropdown="true"
                          data-dropdown-trigger="click"
                        >
                          <button className="dropdown-toggle btn shadow-md shadow-gray-300 border-gray-300 bg-white dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300 mr-1">
                            {selectedUser?.name || "Select PIC User"}
                            <i className="ki-duotone ki-down ml-2 !text-sm dropdown-open:hidden" />
                            <i className="ki-duotone ki-up ml-2 !text-sm hidden dropdown-open:block" />
                          </button>
                          <button
                            className="btn btn-sm btn-icon btn-light dark:btn-dark items-center"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedUser(null); // reset jadi null
                            }}
                          >
                            <i className="ki-solid ki-tag-cross"></i>
                          </button>
                          <div
                            data-dropdown-dismiss="true"
                            className="dropdown-content mt-2 w-full max-w-[200px] max-h-60 overflow-y-auto border border-gray-300 shadow-lg bg-white text-black rounded-xl dark:border-gray-400 dark:bg-gray-100 dark:text-gray-800"
                          >
                            <div className="menu flex flex-col items-center py-2">
                              {Array.isArray(users) &&
                                users.map((item) => (
                                  <div
                                    key={item.id}
                                    className="menu-item w-full text-center hover:bg-gray-100 dark:hover:bg-gray-200 transition"
                                  >
                                    <a
                                      href="#"
                                      className="block px-3 py-1 text-sm"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedUser(item);
                                      }}
                                    >
                                      {item.name}
                                    </a>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        value
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Data tidak tersedia</p>
          )}
        </div>
        <div className="modal-footer justify-end">
          {selectedUser && (
            <button className="btn btn-success mr-2" onClick={assignPICUser}>
              Simpan
            </button>
          )}

          <button className="btn btn-danger" data-modal-dismiss="true">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailIncident;
