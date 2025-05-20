const ModalDetailBilling = ({ selectedData }) => {
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
            Billing Details
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
                // "ID",
                "Bill Category",
                "Sales Org",
                "Bill Date",
                "Sold To Party",
                "Bill Type",
                "Country",
                "Sales Document",
                "Distribution Channel",
                "Division",
                "Doc Category",
                "Address",
                "Name Sold To Party",
                "Loc Sold To Party",
                "Sort Term",
                "Items Read",
                "Counter",
                "Shipping Point",
                "POD Status",
                "Net Value",
                "Doc Currency",
                "SD Document Type",
                "Name SD Type",
                "BDR Src Doc",
                "Ref Sys",
                "Draft Mode",
                "DBD Ref",
                "Solution Order",
                "Bill Date 2",
                "Bill Type 2",
                "Groups",
                "PO Number",
                "Shipping Point Desc",
                "SOPO Amount",
                "Exrate",
                "SLACC",
                "SLA User",
                "Status",
              ].map((label, index) => (
                <div key={index} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{label}</span>
                  <span className="text-gray-700">
                    {label == "Net Value" || label == "SOPO Amount"
                      ? new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: selectedData.DocCurrency || "IDR",
                          minimumFractionDigits: 0,
                        }).format(
                          selectedData[
                            label
                              .replace("Net Value", "NetValue")
                              .replace("SOPO Amount", "SOPOAmount")
                          ] || 0
                        )
                      : label === "Bill Date" || label === "Bill Date 2"
                      ? selectedData[
                          label
                            .replace("Bill Date 2", "BillDate2") // yang spesifik dulu
                            .replace("Bill Date", "BillDate")
                        ]
                        ? new Date(
                            selectedData[
                              label
                                .replace("Bill Date 2", "BillDate2")
                                .replace("Bill Date", "BillDate")
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
                            .replace("Bill Category", "BillCategory")
                            .replace("Sales Org", "SalesOrg")
                            .replace("Sold To Party", "SoldToParty")
                            .replace("Bill Type 2", "BillType2")
                            .replace("Bill Type", "BillType")
                            .replace("Country", "Country")
                            .replace("Sales Document", "SalesDocument")
                            .replace(
                              "Distribution Channel",
                              "DistributionChannel"
                            )
                            .replace("Division", "Division")
                            .replace("Doc Category", "DocCategory")
                            .replace("Address", "Address")
                            .replace("Name Sold To Party", "NameSoldToParty")
                            .replace("Loc Sold To Party", "LocSoldToParty")
                            .replace("Sort Term", "SortTerm")
                            .replace("Items Read", "ItemsRead")
                            .replace("Counter", "Counter")
                            .replace("Shipping Point", "ShippingPoint")
                            .replace("POD Status", "PODStatus")
                            .replace("Doc Currency", "DocCurrency")
                            .replace("SD Document Type", "SDDocumentType")
                            .replace("Name SD Type", "NameSDType")
                            .replace("BDR Src Doc", "BDRSrcDoc")
                            .replace("Ref Sys", "RefSys")
                            .replace("Draft Mode", "DraftMode")
                            .replace("DBD Ref", "DBDRef")
                            .replace("Solution Order", "SolutionOrder")
                            .replace("Groups", "Groups")
                            .replace("PO Number", "PONumber")
                            .replace("Shipping Point Desc", "ShippingPointDesc")
                            .replace("Exrate", "Exrate")
                            .replace("SLACC", "SLACC")
                            .replace("SLA User", "SLAUser")
                            .replace("Status", "Status")
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
export default ModalDetailBilling;
