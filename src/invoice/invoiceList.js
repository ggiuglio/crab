import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getFilteredInvoice } from "../store/selectors/invoiceSelectors";
import { deleteInvoice, setInvoiecStatus } from '../store/actions/invoiceActions';

const Maintitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 10px;
  padding-top: 10px;
`;
const InvoiceTd = styled.td`
  padding: 10px 5px !important;
  min-width: 50px;
  font-size: 14px;
  vertical-align: top;
`;
const InvoiceAmountTd = styled(InvoiceTd)`
  text-align: right;
`;
const InvoiceNumberTd = styled(InvoiceTd)`
  text-align: center;
`;
const InvoiceActionTd = styled(InvoiceTd)`
  text-align: center;
  cursor: pointer;
`;
const InvoiceTh = styled.th`
  padding: 10px 5px !important;
  min-width: 70px;
  font-size: 16px;
`;
const CommentRow = styled.div`
  padding: 10px 0;
`;
const InvoiceTextarea = styled.textarea`
  resize: none;
  padding: 5px;
  margin-top: 2px;
  font-size: 14px;
`;
const InvoiceButton = styled.button`
  margin-right: 10px;
`;

const ActivityRow = styled.tr`
  cursor: pointer;
`;
const InvoiceList = ({ invoices, deleteInvoiceAction, changeStatus }) => {
  const [displayInvoices, setDisplayInvoices] = useState([]);

  useEffect(() => {
    setDisplayInvoices(invoices)
  }, [invoices])

  const deleteInvoiceClick = (invoiceId) => {
    deleteInvoiceAction(invoiceId);
  };

  const expandRow = (id) => {
    const newInvoices = JSON.parse(JSON.stringify(displayInvoices))
    const selectedInvoice = newInvoices.find(inv => inv.id === id);
    selectedInvoice.selected = !selectedInvoice.selected;
    setDisplayInvoices(newInvoices);
  };

  const setStatus = (id, status) => {
    changeStatus(id, status)
  };

  return (
    <div>
      <Maintitle>
        Activity list
      </Maintitle>
      <table className="striped">
        <thead>
          <tr>
            <th ></th>
            <InvoiceTh> Type </InvoiceTh>
            <InvoiceTh> Date </InvoiceTh>
            <InvoiceTh> Quotation </InvoiceTh>
            <InvoiceTh> Module </InvoiceTh>
            <InvoiceTh> Activity </InvoiceTh>
            <InvoiceTh> Per unit </InvoiceTh>
            <InvoiceTh> Units </InvoiceTh>
            <InvoiceTh> Amount </InvoiceTh>
            <InvoiceTh> Status </InvoiceTh>
            <th ></th>
          </tr>
        </thead>
        <tbody>
          {displayInvoices.map(i =>
            !i.selected ?
              <ActivityRow key={i.id} onClick={() => expandRow(i.id)}>
                <td><i className="material-icons">keyboard_arrow_right</i></td>
                <InvoiceTd> {i.type} </InvoiceTd>
                <InvoiceTd> {i.date} </InvoiceTd>
                <InvoiceTd> {i.quotationCode} </InvoiceTd>
                <InvoiceTd> {i.moduleTitle} </InvoiceTd>
                <InvoiceTd> {i.activityTitle} </InvoiceTd>
                <InvoiceAmountTd> {i.unitCost} &euro;  </InvoiceAmountTd>
                <InvoiceNumberTd> {i.unitNumber} </InvoiceNumberTd>
                <InvoiceAmountTd> {i.totalCost} &euro; </InvoiceAmountTd>
                <InvoiceTd> {i.status} </InvoiceTd>
                <InvoiceActionTd onClick={() => deleteInvoiceClick(i.id)}><i className="material-icons">delete</i></InvoiceActionTd>
              </ActivityRow>
              :
              <ActivityRow key={i.id + "open"} onClick={() => expandRow(i.id)}>
                <td colSpan="11">
                  <table>
                    <tbody>
                      <tr>
                        <td><i className="material-icons">keyboard_arrow_down</i></td>
                        <InvoiceTd> {i.type} </InvoiceTd>
                        <InvoiceTd> {i.date} </InvoiceTd>
                        <InvoiceTd> {i.quotationCode} </InvoiceTd>
                        <InvoiceTd> {i.moduleTitle} </InvoiceTd>
                        <InvoiceTd> {i.activityTitle} </InvoiceTd>
                        <InvoiceAmountTd> {i.unitCost} &euro; </InvoiceAmountTd>
                        <InvoiceNumberTd> {i.unitNumber} </InvoiceNumberTd>
                        <InvoiceAmountTd> {i.totalCost} &euro; </InvoiceAmountTd>
                        <InvoiceTd> {i.status} </InvoiceTd>
                        <InvoiceActionTd onClick={() => deleteInvoiceClick(i.id)}><i className="material-icons">delete</i></InvoiceActionTd>
                      </tr>
                      {i.type === "PROVIDER" ?
                        <tr key={i.id + '-provider'}>
                          <td colSpan="11">
                            Provider: {i.provider.title}
                          </td>
                        </tr>
                        : <tr key={i.id + '-no-provider'}><td colSpan="11"></td></tr>
                      }
                      <tr key={i.id + '-comment'}>
                        <td colSpan="11">
                          <CommentRow className="row">
                            <div className="col s8">
                              <InvoiceTextarea value={i.comment} disabled={true} />
                            </div>
                            <div className="col s4">
                              {i.status === "NEW" && i.type === "SPONSOR" ?
                                <InvoiceButton className="btn waves-effect waves-light" onClick={() => setStatus(i.id, "READY")}>Ready</InvoiceButton>
                                : ""}
                              {i.status === "READY" && i.type === "SPONSOR" ?
                                <InvoiceButton className="btn waves-effect waves-light" onClick={() => setStatus(i.id, "INVOICED")}>Invoiced</InvoiceButton>
                                : ""}
                              {i.status === "INVOICED" && i.type === "SPONSOR" ?
                                <InvoiceButton className="btn waves-effect waves-light" onClick={() => setStatus(i.id, "READY")}>Ready</InvoiceButton>
                                : ""}
                              {i.status === "READY" && i.type === "SPONSOR" ?
                                <InvoiceButton className="btn waves-effect waves-light" onClick={() => setStatus(i.id, "NEW")}>New</InvoiceButton>
                                : ""}
                              {i.status === "INVOICED" && i.type === "SPONSOR" ?
                                <InvoiceButton className="btn waves-effect waves-light" onClick={() => setStatus(i.id, "PAID")}>Paid</InvoiceButton>
                                : ""}
                              {i.status === "PAID" && i.type === "SPONSOR" ?
                                <InvoiceButton className="btn waves-effect waves-light" onClick={() => setStatus(i.id, "INVOICED")}>Invoiced</InvoiceButton>
                                : ""}
                              {i.status === "NEW" && i.type === "PROVIDER" ?
                                <InvoiceButton className="btn waves-effect waves-light" onClick={() => setStatus(i.id, "PAID")}>Paid</InvoiceButton>
                                : ""}
                              {i.status === "PAID" && i.type === "PROVIDER" ?
                                <InvoiceButton className="btn waves-effect waves-light" onClick={() => setStatus(i.id, "NEW")}>New</InvoiceButton>
                                : ""}
                            </div>

                          </CommentRow>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </ActivityRow>

          )}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    invoices: getFilteredInvoice(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteInvoiceAction: (invoice) => dispatch(deleteInvoice(invoice)),
    changeStatus: (id, status) => dispatch(setInvoiecStatus(id, status))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);
