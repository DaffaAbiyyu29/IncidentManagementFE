import clsx from "clsx";

const ModalDetailAR = ({ selectedData }) => {
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
            Account Receivable
          </h3>
          <button
            className="btn btn-xs btn-icon btn-danger"
            data-modal-dismiss="true"
          >
            <i className="ki-outline ki-cross"></i>
          </button>
        </div>
        <div className="modal-body scrollable-y py-0 my-5 pl-6 pr-3 mr-3 h-[400px] max-h-[100%]">
          {selectedData && (
            <div className="grid grid-cols-2 gap-4 dark:text-gray-800 border rounded-lg p-4">
              {[
                // "ID",
                "Account",
                "Customer Name",
                "Company Code",
                "Business Area",
                "Profit Center",
                "Plant",
                "GL Account",
                "Document Number",
                "Document Type",
                "Document Date",
                "Posting Key",
                "Posting Date",
                "Net Due Date",
                "Clearing Date",
                "Clearing Document",
                "Reverse Clearing",
                "Amount (Doc Curr)",
                "Document Currency",
                "Amount (Local Curr)",
                "Local Currency",
                "Debit/Credit Ind",
                // "SLA CC",
                // "SLA User",
                "Reference",
                "Assignment",
                "Special GL Ind",
                "Username",
                "Text",
                // "Status",
              ].map((label, index) => (
                <div key={index} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{label}</span>
                  <span className="text-gray-700">
                    {label.includes("Amount")
                      ? new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: selectedData.DocumentCurrency || "IDR",
                          minimumFractionDigits: 0,
                        }).format(
                          selectedData[
                            label
                              .replace("Amount (Doc Curr)", "AmountDocCurr")
                              .replace(
                                "Amount (Local Curr)",
                                "AmountLocalCurrency"
                              )
                          ] || 0
                        )
                      : label === "Document Date" ||
                        label === "Posting Date" ||
                        label === "Net Due Date" ||
                        label === "Clearing Date"
                      ? selectedData[
                          label
                            .replace("Document Date", "DocumentDate")
                            .replace("Posting Date", "PostingDate")
                            .replace("Net Due Date", "NetDueDate")
                            .replace("Clearing Date", "ClearingDate")
                        ]
                        ? new Date(
                            selectedData[
                              label
                                .replace("Document Date", "DocumentDate")
                                .replace("Posting Date", "PostingDate")
                                .replace("Net Due Date", "NetDueDate")
                                .replace("Clearing Date", "ClearingDate")
                            ]
                          ).toLocaleDateString("id-ID", {
                            weekday: "long",
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "-"
                      : selectedData[
                          label
                            // .replace("ID", "ID")
                            .replace("Account", "Account")
                            .replace("Customer Name", "CustomerName")
                            .replace("Company Code", "CompanyCode")
                            .replace("Business Area", "BusinessArea")
                            .replace("Profit Center", "ProfitCenter")
                            .replace("Plant", "Plant")
                            .replace("GL Account", "GLAccount")
                            .replace("Document Number", "DocumentNumber")
                            .replace("Document Type", "DocumentType")
                            .replace("Posting Key", "PostingKey")
                            .replace("Clearing Document", "ClearingDocument")
                            .replace("Reverse Clearing", "ReverseClearing")
                            .replace("Document Currency", "DocumentCurrency")
                            .replace("Local Currency", "LocalCurrency")
                            .replace("Debit/Credit Ind", "DebitCreditInd")
                            // .replace("SLA CC", "SLACC")
                            // .replace("SLA User", "SLAUser")
                            .replace("Reference", "Reference")
                            .replace("Assignment", "Assignment")
                            .replace("Special GL Ind", "SpecialGLInd")
                            .replace("Username", "Username")
                            .replace("Text", "Text")
                          // .replace("Status", "Status")
                        ] || "-"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer justify-end">
          <div className="flex gap-4">
            <button className="btn btn-danger" data-modal-dismiss="true">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailAR;
