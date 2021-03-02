import React from "react";
import { connect } from "react-redux";
import { getFilteredInvoice } from "../store/selectors/invoiceSelectors";
import {
  deleteInvoice,
  setInvoiecStatus,
} from "../store/actions/invoiceActions";
import "./css/invoice.css";

const InvoiceList = ({ invoices, deleteInvoiceAction, changeStatus }) => {
  const [hasProvider, setHasProvider] = React.useState(false);

  React.useEffect(() => {
    setHasProvider(
      invoices.some(
        (i) =>
          i.provider && i.provider.title && i.provider.title.trim().length > 0
      )
    );

    setResponsiveTable();
  }, [invoices]);

  const deleteInvoiceClick = (invoiceId) => {
    deleteInvoiceAction(invoiceId);
  };

  const setStatus = (id, status) => {
    changeStatus(id, status);
  };

  window.onresize = function(event) {
    setResponsiveTable();
  };

  const innerWidth = 870;

  const setResponsiveTable = () => {
    const invTable = document.getElementById("invoice-table");
    if(invTable){
      if(window.innerWidth < innerWidth && !invTable.classList.contains("responsive-table")) {
        invTable.classList.add("responsive-table");
      } else if(window.innerWidth >= innerWidth && invTable.classList.contains("responsive-table")) {
          invTable.classList.remove("responsive-table")
      }
    }
  };

  return (
    <div className="section">
      <h5 className="bolder">Activity list</h5>
      <table id="invoice-table" className="responsive-table">
        <thead>
          <tr>
            <th className="hide-on-custom-med" width="5%">Type</th>
            <th className="hide-on-custom-med-and-up" title="Type">Tp.</th>
            <th className="hide-on-custom-med" width={hasProvider ? "6%" : "0%"}>
              {hasProvider ? "Provider" : ""}
            </th>
            {hasProvider ? <th className="hide-on-custom-med-and-up" title="Provider">
              Prv.
            </th> : null}
            <th className="hide-on-custom-med" width="6%">Date</th>
            <th className="hide-on-custom-med-and-up" title="Date">Dt.</th>
            <th className="hide-on-custom-med" width="12%">Quotation</th>
            <th className="hide-on-custom-med-and-up" title="Quotation">Qt.</th>
            <th className="hide-on-custom-med" width="14%">Module</th>
            <th className="hide-on-custom-med-and-up" title="Module">Md.</th>
            <th className="hide-on-custom-med" width={hasProvider ? "16%" : "25%"}>Activity</th>
            <th className="hide-on-custom-med-and-up" title="Activity">Act.</th>
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
            <th title="Amount €" className="hide-on-custom-med-and-up text-right price">
              Am.
            </th>
            <th width="5%" className="hide-on-custom-med center">
              Status
            </th>
            <th title="Status" className="hide-on-custom-med-and-up center">
              St.
            </th>
            <th className="hide-on-custom-med" title="Comment" width="11%">Comment</th>
            <th className="hide-on-custom-med-and-up" title="Comment">Com.</th>
            <th width="10%" colSpan="2" className="hide-on-custom-med center">
              Actions
            </th>
            <th title="Actions" colSpan="2" className="hide-on-custom-med-and-up center">
              Act.
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((i) => (
            <tr key={i.id}>
              <td>
                <span className="m-truncate" title={i.type}>
                  {" "}
                  {i.type}{" "}
                </span>
              </td>
              <td width={hasProvider ? "5%" : "0%"} className="hide-on-custom-med">
                <span
                  className="m-truncate"
                  title={i.provider ? i.provider.title : ""}
                >
                  {i.provider ? i.provider.title : ""}
                </span>
              </td>
              {hasProvider ? <td className="hide-on-custom-med-and-up">
                <span>
                  {i.provider ? i.provider.title : ""}
                </span>
              </td> : null}
              <td>
                <span className="m-truncate" title={i.date}>
                  {" "}
                  {i.date}{" "}
                </span>
              </td>
              <td>
                <span className="m-truncate" title={i.quotationCode}>
                  {" "}
                  {i.quotationCode}{" "}
                </span>
              </td>
              <td>
                <span className="m-truncate" title={i.moduleTitle}>
                  {" "}
                  {i.moduleTitle}{" "}
                </span>
              </td>
              <td className="hide-on-custom-med" width={hasProvider ? "20%" : "25%"}>
                <span className="m-truncate" title={i.activityTitle}>
                  {" "}
                  {i.activityTitle}{" "}
                </span>
              </td>
              <td className="hide-on-custom-med-and-up">
                <span className="m-truncate" title={i.activityTitle}>
                  {" "}
                  {i.activityTitle}{" "}
                </span>
              </td>
              <td className="text-right">
                <span className="m-truncate" title={i.unitCost}>
                  {i.unitCost}
                </span>
              </td>
              <td className="text-right">
                <span className="m-truncate" title={i.unitNumber}>
                  {i.unitNumber}{" "}
                </span>
              </td>
              <td className="text-right">
                <span className="m-truncate" title={i.totalCost}>
                  {i.totalCost}{" "}
                </span>
              </td>
              <td className="center">
                <span className="m-truncate" title={i.status}>
                  {i.status}{" "}
                </span>
              </td>
              <td >
                <span className="m-truncate" title={i.comment}>
                  {i.comment}
                </span>
              </td>
              <td className="center">
                {i.status === "NEW" && i.type === "SPONSOR" ? (
                  <i
                    className="material-icons ready small"
                    title="set Ready"
                    onClick={() => setStatus(i.id, "READY")}
                  ></i>
                ) : (
                  ""
                )}
                {i.status === "READY" && i.type === "SPONSOR" ? (
                  <i
                    className="material-icons invoiced small"
                    title="set Invoiced"
                    onClick={() => setStatus(i.id, "INVOICED")}
                  ></i>
                ) : (
                  ""
                )}
                {i.status === "INVOICED" && i.type === "SPONSOR" ? (
                  <i
                    className="material-icons ready small"
                    title="set Ready"
                    onClick={() => setStatus(i.id, "READY")}
                  ></i>
                ) : (
                  ""
                )}
                {i.status === "READY" && i.type === "SPONSOR" ? (
                  <i
                    className="material-icons new small"
                    title="set New"
                    onClick={() => setStatus(i.id, "NEW")}
                  ></i>
                ) : (
                  ""
                )}
                {i.status === "INVOICED" && i.type === "SPONSOR" ? (
                  <i
                    className="material-icons paid small"
                    title="set Paid"
                    onClick={() => setStatus(i.id, "PAID")}
                  ></i>
                ) : (
                  ""
                )}
                {i.status === "PAID" && i.type === "SPONSOR" ? (
                  <i
                    className="material-icons invoiced small"
                    title="set Invoiced"
                    onClick={() => setStatus(i.id, "INVOICED")}
                  ></i>
                ) : (
                  ""
                )}
                {i.status === "NEW" && i.type === "PROVIDER" ? (
                  <i
                    className="material-icons paid small"
                    title="set Paid"
                    onClick={() => setStatus(i.id, "PAID")}
                  ></i>
                ) : (
                  ""
                )}
                {i.status === "PAID" && i.type === "PROVIDER" ? (
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
                <i
                  className="material-icons delete small"
                  title="Delete"
                  onClick={() => deleteInvoiceClick(i.id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
