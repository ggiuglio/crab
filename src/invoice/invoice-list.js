import React from "react";
import { connect } from "react-redux";
import { getInvoiceList } from "../store/selectors/selector";

const InvoiceList = ({ invoices }) => {
  return (
    <div>
      { invoices.map(i => <div key={i.id}>
        <span> {i.date} - </span>
        <span> {i.quotationId} - </span>
        <span> {i.moduleId} - </span>
        <span> {i.activityId} - </span>
        <span> {i.unitCost} - </span>
        <span> {i.unitNumber} - </span>
        <span> {i.totalCost} </span>
      </div> )}
      invoice list
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
