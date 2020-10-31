import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import { createNewInvoice, selectQuotation } from "../store/actions/actionsCreator";
import { getQuotationsEntityList } from "../store/selectors/quotationSelector";

const MainContainer = styled.div`
  margin: 20px;
`;
const NewInvoiceContainer = styled.div`
  width: 100%;
  display: inline-flex;
`;
const NewInvoiceBody = styled.div`
  display: inline-flex;
`;
const BodyItem = styled.div`
  width: 250px;
  margin: 0 10px;
  &:first-child { 
    margin: 0 10px 0 0;
  }
`;
const BodyItemSmall = styled.div`
  width: 80px;
  margin: 0 10px;

`;
const InvoiceInput = styled.input`
  padding: 5px;
`;
const TotalCost = styled.div`
  padding-top: 10px;
  border-bottom: 1px solid black;
  padding-bottom: 0px;
  height: 40px;
  font-weight: bold;
  font-size: 18px;
  box-sizing: border-box;
`;
const SaveButton = styled.button`
  padding: 5px 10px;
`;
const SelectEntity = styled.select`
  display: block;
`;

const NewInvoice = ({ createInvoice, lists }) => {
  const [quotationList, setQuotationList] = useState(lists.quotations);
  const [moduleList, setModuleList] = useState(lists.modules);
  const [activityList, setActivityList] = useState(lists.activities);

  const [quotationId, setQuotationId] = useState(-1);
  const [moduleId, setModuleId] = useState(-1);
  const [activityId, setActivityId] = useState(-1);
  const [unitCost, setUnitCost] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const quotationChange = (qId) => {
    setQuotationId(qId);
    if (qId === -1) {
      setModuleList(lists.modules);
      let availableActivities = getAvailableActivities(qId);
      setActivityList(availableActivities);
    } else {
      let availableActivities = getAvailableActivities(qId);
      const availableModules = lists.modules.filter(m => m.quotationId === qId || m.id === -1);
      setModuleList(availableModules);
      if (!availableModules.find(m => m.id === moduleId)) {
        setModuleId(-1);
      }
      availableActivities = getAvailableActivities(qId);
      setActivityList(availableActivities);
    }
  };

  const moduleChange = (mId) => {
    setModuleId(mId);
    let availableActivities = getAvailableActivities(null, mId);
    setActivityList(availableActivities);
  };

  const getAvailableActivities = (quotation, module) => {
    const selectedQuotation = quotation ? quotation : quotationId;
    const selectedModule = module ? module : moduleId;

    return lists.activities.filter(
      a => (
        (a.quotationId === selectedQuotation || selectedQuotation === -1) &&
        (a.moduleId === selectedModule || selectedModule === -1)
      ) || 
      a.id === -1
    );
  };

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
  };

  const saveInoice = () => {
    if (quotationId !== -1 && moduleId !== -1 && activityId !== -1 && unitCost && unitNumber) {
      const invoice = {
        date: "12/12/1212",
        type: 'cost',
        quotationCode: lists.quotations.find(q => q.id === quotationId).code,
        moduleCode: lists.modules.find(m => m.id === moduleId).code,
        activityCode: lists.activities.find(a => a.id === activityId).code,
        unitCost: unitCost,
        unitNumber: unitNumber,
        totalCost: totalCost
      }

      createInvoice(invoice);
    }
  };

  return (
    <MainContainer>
      <NewInvoiceContainer>
        <NewInvoiceBody>
          <BodyItem>
            <label htmlFor="quotation">Quotation</label>
            <SelectEntity onChange={e => quotationChange(e.target.value)}>
              {
                quotationList.map(q =>
                  <option key={q.id} value={q.id} >  {q.code} </option>
                )
              }
            </SelectEntity>
          </BodyItem>
          <BodyItem type="text">
            <label>Module</label>
            <SelectEntity onChange={e => moduleChange(e.target.value)}>
              {
                moduleList.map(m =>
                  <option key={m.id} value={m.id} >  {m.title} {m.geo} </option>
                )
              }
            </SelectEntity>
          </BodyItem>
          <BodyItem type="text">
            <label>Activity Code</label>
            <SelectEntity onChange={e => setActivityId(e.target.value)}>
              {
                activityList.map(a =>
                  <option key={a.id} value={a.id}>  {a.title} </option>
                )
              }
            </SelectEntity>
          </BodyItem>
          <BodyItemSmall type="text">
            <label>Unit cost</label>
            <InvoiceInput type="number" min="0.00" step="0.01" value={unitCost} onChange={e => unitCostChange(e.target.value)} />
          </BodyItemSmall>
          <BodyItemSmall type="text">
            <label>Unit number</label>
            <InvoiceInput type="number" min="0" step="1" value={unitNumber} onChange={e => unitNumberChange(e.target.value)} />
          </BodyItemSmall>
          <BodyItemSmall type="text">
            <label>Total cost</label>
            <TotalCost>{totalCost}</TotalCost>
          </BodyItemSmall>
        </NewInvoiceBody>

      </NewInvoiceContainer>
      <SaveButton onClick={() => saveInoice()}>Save Invoice</SaveButton>
    </MainContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    lists: getQuotationsEntityList(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createInvoice: (invoice) => dispatch(createNewInvoice(invoice))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewInvoice);
