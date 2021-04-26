import React from "react";
import { connect } from "react-redux";
import InvoiceLegend from "./invoiceLegend";
import { getFilteredInvoice } from "../store/selectors/invoiceSelectors";
import {
  deleteInvoice,
  setInvoiecStatus,
} from "../store/actions/invoiceActions";
import M from "materialize-css/dist/js/materialize.min.js";

const InvoiceList = ({ invoices, deleteInvoiceAction, changeStatus }) => {
  const [hasProvider, setHasProvider] = React.useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = React.useState("");

  React.useEffect(() => {
    setHasProvider(
      invoices.some(
        (i) =>
          i.provider && i.provider.title && i.provider.title.trim().length > 0
      )
    );

    setResponsive();

    if(invoices !== undefined) {
      let modal = document.getElementById("modal-deletion");
      M.Modal.init(modal, {'onCloseEnd' : setInvoiceToDelete("")});
    } 
  }, [invoices]);

  const deleteInvoiceClick = (invoiceId) => {
    deleteInvoiceAction(invoiceId);
  };

  const setStatus = (id, status) => {
    changeStatus(id, status);
  };

  window.onresize = function (event) {
    setResponsive();
  };

  const innerWidth = 868;

  const setResponsive = () => {
    const invTable = document.getElementById("invoice-table");
    const legend = document.getElementById("invoice-status-legend");
    if (invTable) {
      if (
        window.innerWidth < innerWidth &&
        !invTable.classList.contains("responsive-table")
      ) {
        invTable.classList.add("responsive-table");
        if (legend && legend.classList.contains("right")) {
          legend.classList.remove("right");
        }
      } else if (
        window.innerWidth >= innerWidth &&
        invTable.classList.contains("responsive-table")
      ) {
        invTable.classList.remove("responsive-table");
        if (legend && !legend.classList.contains("right")) {
          legend.classList.add("right");
        }
      }
    }
  };

  return (
    <div>
      <InvoiceLegend />
      <table id="invoice-table" className="responsive-table">
        <thead>
          <tr>
            <th className="hide-on-custom-med" width="5%">
              Type
            </th>
            <th className="hide-on-custom-med-and-up" title="Type">
              Tp.
            </th>
            <th
              className="hide-on-custom-med"
              width={hasProvider ? "6%" : "0%"}
            >
              {hasProvider ? "Provider" : ""}
            </th>
            {hasProvider ? (
              <th className="hide-on-custom-med-and-up" title="Provider">
                Prv.
              </th>
            ) : null}
            <th className="hide-on-custom-med" width="6%">
              Date
            </th>
            <th className="hide-on-custom-med-and-up" title="Date">
              Dt.
            </th>
            <th className="hide-on-custom-med" width="12%">
              Quotation
            </th>
            <th className="hide-on-custom-med-and-up" title="Quotation">
              Qt.
            </th>
            <th className="hide-on-custom-med" width="14%">
              Module
            </th>
            <th className="hide-on-custom-med-and-up" title="Module">
              Md.
            </th>
            <th
              className="hide-on-custom-med"
              width={hasProvider ? "16%" : "25%"}
            >
              Activity
            </th>
            <th className="hide-on-custom-med-and-up" title="Activity">
              Act.
            </th>
            <th width="4%" className="hide-on-custom-med text-right">
              €/unit
            </th>
            <th title="€/unit" className="hide-on-custom-med-and-up text-right">
              €/un.
            </th>
            <th width="3%" className="hide-on-custom-med text-right">
              Units
            </th>
            <th title="Units" className="hide-on-custom-med-and-up text-right">
              Un.s
            </th>
            <th width="5%" className="hide-on-custom-med text-right price">
              Amnt
            </th>
            <th
              title="Amount €"
              className="hide-on-custom-med-and-up text-right price"
            >
              Am.
            </th>
            <th width="5%" className="hide-on-custom-med center">
              Status
            </th>
            <th title="Status" className="hide-on-custom-med-and-up center">
              St.
            </th>
            <th className="hide-on-custom-med" title="Comment" width="11%">
              Comment
            </th>
            <th className="hide-on-custom-med-and-up" title="Comment">
              Com.
            </th>
            <th width="10%" colSpan="2" className="hide-on-custom-med center">
              Actions
            </th>
            <th
              title="Actions"
              colSpan="2"
              className="hide-on-custom-med-and-up center"
            >
              Act.
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((i) => (
            <tr key={i.id}>
              <td>
                <span className="custom-truncate" title={i.type}>
                  {" "}
                  {i.type}
                </span>
              </td>
              <td
                width={hasProvider ? "5%" : "0%"}
                className="hide-on-custom-med"
              >
                <span
                  className="custom-truncate"
                  title={i.provider ? i.provider.title : ""}
                >
                  {i.provider ? i.provider.title : ""}
                </span>
              </td>
              {hasProvider ? (
                <td className="hide-on-custom-med-and-up">
                  <span>{i.provider ? i.provider.title : ""}</span>
                </td>
              ) : null}
              <td>
                <span className="custom-truncate" title={i.date}>
                  {" "}
                  {i.date}{" "}
                </span>
              </td>
              <td>
                <span className="custom-truncate" title={i.sponsorQuotationCode}>
                  {" "}
                  {i.sponsorQuotationCode}{" "}
                </span>
              </td>
              <td>
                <span className="custom-truncate" title={i.sponsorModuleTitle}>
                  {" "}
                  {i.sponsorModuleTitle}{" "}
                </span>
              </td>
              <td
                className="hide-on-custom-med"
                width={hasProvider ? "20%" : "25%"}
              >
                <span className="custom-truncate" title={i.sponsorActivityTitle}>
                  {" "}
                  {i.sponsorActivityTitle}{" "}
                </span>
              </td>
              <td className="hide-on-custom-med-and-up">
                <span className="custom-truncate" title={i.sponsorActivityTitle}>
                  {" "}
                  {i.sponsorActivityTitle}{" "}
                </span>
              </td>
              <td className="text-right">
                <span className="custom-truncate" title={i.unitCost}>
                  {i.unitCost}
                </span>
              </td>
              <td className="text-right">
                <span className="custom-truncate" title={i.unitNumber}>
                  {i.unitNumber}{" "}
                </span>
              </td>
              <td className="text-right">
                <span className="custom-truncate" title={i.totalCost}>
                  {i.totalCost}{" "}
                </span>
              </td>
              <td className="center">
                <span className="custom-truncate" title={i.status}>
                  {i.status}{" "}
                </span>
              </td>
              <td>
                <span className="custom-truncate" title={i.comment}>
                  {i.comment}
                </span>
              </td>
              <td className="center">
                {i.status === "NEW" && i.type === "INCOME" ? (
                  <i
                    className="material-icons ready small"
                    title="set Ready"
                    onClick={() => setStatus(i.id, "READY")}
                  ></i>
                ) : (
                  ""
                )}
                {i.status === "READY" && i.type === "INCOME" ? (
                  <i
                    className="material-icons invoiced small"
                    title="set Invoiced"
                    onClick={() => setStatus(i.id, "INVOICED")}
                  ></i>
                ) : (
                  ""
                )}
                {i.status === "INVOICED" && i.type === "INCOME" ? (
                  <i
                    className="material-icons ready small"
                    title="set Ready"
                    onClick={() => setStatus(i.id, "READY")}
                  ></i>
                ) : (
                  ""
                )}
                {i.status === "READY" && i.type === "INCOME" ? (
                  <i
                    className="material-icons new small"
                    title="set New"
                    onClick={() => setStatus(i.id, "NEW")}
                  ></i>
                ) : (
                  ""
                )}
              </td>
              <td className="delete-cell center">
              <a
                className="modal-trigger transparent tooltipped"
                href="#modal-deletion"
                data-position="bottom"
                data-tooltip="Delete invoice"
                onClick={() => setInvoiceToDelete(i.id)}
              >
                <i
                  className="material-icons delete small"
                  title="Delete"
                ></i>
              </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="modal-deletion" className="modal">
        <div className="modal-content">
          <h4>Invoice Deletion</h4>
          <h5>Are you sure you want to delete this invoice?</h5>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-indigo btn-flat"
            >
            Cancel
          </a>
          <a
            href="#!"
            className="modal-close btn red darken-2 waves-effect waves-light"
            onClick={() => deleteInvoiceClick(invoiceToDelete)}
          >
            Ok
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    invoices: getFilteredInvoice(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteInvoiceAction: (invoice) => dispatch(deleteInvoice(invoice)),
    changeStatus: (id, status) => dispatch(setInvoiecStatus(id, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);
