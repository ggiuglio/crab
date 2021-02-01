import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getInvoiceList } from "../store/selectors/invoiceSelectors";
import { deleteInvoice } from '../store/actions/invoiceActions';

const Maintitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 10px;
  padding-top: 10px;
`;

const InvoiceList = ({ invoices, deleteInvoiceAction }) => {

  const deleteInvoiceClick = (invoiceId) => {
    deleteInvoiceAction(invoiceId);
  };

  return (
    <div>
      <Maintitle>
        Activity list
      </Maintitle>
      { invoices.map(i => <div key={i.id}>
        <span> {i.date} - </span> 
        <span> {i.quotationCode} - </span> 
        <span> {i.moduleCode !== "N/A" ? i.moduleCode + " - " : ''} </span>
        <span> {i.moduleTitle} </span>
        <span> {i.activityCode + " - "} </span>
        <span> {i.activityTitle + " - "} - </span>
        <span> {i.unitCost} - </span>
        <span> {i.unitNumber} - </span>
        <span> {i.totalCost} </span>
        <span onClick={ () => deleteInvoiceClick(i.id)}>X</span>
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
  return {
    deleteInvoiceAction: (invoice) => dispatch(deleteInvoice(invoice))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);
