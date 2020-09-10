import React from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import InvoiceList from './invoice-list';
import NewInvoice from './new-invoice';
import add from '../assets/images/add.png';
import { ShowNewInvoice } from '../store/actions/actionsCreator';
import { getShowNewInvoice } from '../store/selectors/selector';;

const AddInvoice = styled.div`
  height: 30px; 
  width: 100%;
  cursor: pointer;
  font-weight: bold;
  display: inline-flex;
`;
const AddArticleImage = styled.img`
  width: 30px;
  vertical-align: -8px;
  margin-right: 10px;
`;

const Invoice = ({openNewInvoice, isNewInvoiceOpen}) => {

const addInvoiceClick = () => {
  openNewInvoice();
};

  return (
    <div>
      <AddInvoice onClick={() => addInvoiceClick()}>
        <AddArticleImage src={add} /> Insert new invoice
      </AddInvoice>

      { isNewInvoiceOpen ? <NewInvoice /> : '' }

      <InvoiceList />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isNewInvoiceOpen: getShowNewInvoice(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openNewInvoice: () => dispatch(ShowNewInvoice()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);