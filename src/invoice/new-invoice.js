import React, { useState } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import { createNewInvoice } from "../store/actions/actionsCreator";

const NewInvoiceContainer = styled.div`
  width: 80%;
  margin-left: 10%;
  display: inline-flex;
`;
const NewInvoiceBody = styled.div`
  display: inline-flex;
`;
const BodyItem = styled.div`
  width: 100px;
  margin: 0 10px;
`;
const InvoiceInput = styled.input`
  padding: 5px;
`;
const TotalCost = styled.div`
  padding-top: 14px;
  border-bottom: 1px solid black;
  padding-bottom: 7px;
  height: 46px;
  box-sizing: border-box;
`;
const SaveButton = styled.button`
  padding: 5px 10px;
  height: 50px;
  margin-left: 30px;
  margin-top: 10px;
`;

const NewInvoice = ({createInvoice}) => {
  const [quotationCode, setQuotationCode] = useState('');
  const [moduleCode, setModuleCode] = useState('');
  const [activityCode, setActivityCode] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const unitCostChange = (newUnitCost) => {
    setUnitCost(newUnitCost);
    if (unitNumber) {
      setTotalCost(newUnitCost * unitNumber);
    }
  };

  const unitNumberChange = (newUnitNumber) => {
    setUnitNumber(newUnitNumber);
    if (unitCost) {
      setTotalCost(unitCost * newUnitNumber);
    }
  }

  const saveInoice = () => {
    if(quotationCode && moduleCode && activityCode && unitCost && unitNumber) {
      const invoice = {
        date: "12/12/1212",
        type: 'cost',
        quotationCode: quotationCode.trim(),
        moduleCode: moduleCode.trim(),
        activityCode: activityCode.trim(),
        unitCost: unitCost,
        unitNumber: unitNumber,
        totalCost: totalCost
      }

      createInvoice(invoice);
    }
  };

  return (
    <NewInvoiceContainer>
      <NewInvoiceBody>
        <BodyItem>
          <label htmlFor="quotation">Quotation Code</label>
          <InvoiceInput type="text" value={quotationCode} onChange={e => setQuotationCode(e.target.value)} />
        </BodyItem>
        <BodyItem type="text">
          <label>Module Code</label>
          <InvoiceInput type="text" value={moduleCode} onChange={e => setModuleCode(e.target.value)} />
        </BodyItem>
        <BodyItem type="text">
          <label>Activity Code</label>
          <InvoiceInput type="text" value={activityCode} onChange={e => setActivityCode(e.target.value)} />
        </BodyItem>
        <BodyItem type="text">
          <label>Unit cost</label>
          <InvoiceInput type="number" min="0.00" step="0.01" value={unitCost} onChange={e => unitCostChange(e.target.value)} />
        </BodyItem>
        <BodyItem type="text">
          <label>Unit number</label>
          <InvoiceInput type="number" min="0" step="1" value={unitNumber} onChange={e => unitNumberChange(e.target.value)}/>
        </BodyItem>
        <BodyItem type="text">
          <label>Total cost</label>
          <TotalCost>{totalCost}</TotalCost>
        </BodyItem>
      </NewInvoiceBody>
      <SaveButton onClick={() => saveInoice()}>Save Invoice</SaveButton>
    </NewInvoiceContainer>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    createInvoice: (invoice) => dispatch(createNewInvoice(invoice))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewInvoice);
