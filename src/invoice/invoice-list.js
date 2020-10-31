import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getInvoiceList } from "../store/selectors/invoiceSelector";

const InvoiceList = ({ invoices }) => {

  return (
    <div>
      { invoices.map(i => <div key={i.id}>
        <span> {i.date} - </span>
        <span> {i.quotationCode} - </span>
        <span> {i.moduleCode} - </span>
        <span> {i.activityCode} - </span>
        <span> {i.unitCost} - </span>
        <span> {i.unitNumber} - </span>
        <span> {i.totalCost} </span>
      </div> )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    invoices: getInvoiceList(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);
