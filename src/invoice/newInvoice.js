import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import { createNewInvoice } from '../store/actions/invoiceActions';
import { getQuotationsEntityList, getAllModulesAndActivities } from "../store/selectors/quotationSelectors";
import M from "materialize-css/dist/js/materialize.min.js";

const MainContainer = styled.div`
  margin: 20px;
`;
const NewInvoiceContainer = styled.div`
  width: 100%;
`;
const NewInvoiceBody = styled.div`
  display: inline-flex;
  width: 100%;
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
const BodyItemFull = styled.div`
  width: 100%;
`;
const InvoiceInput = styled.input`
  padding: 5px;
`;
const InvoiceTextArea = styled.textarea`
  padding: 5px;
  resize: none;
  width: 80%;
  display: block;
  height: 50px;
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
  margin-top: 20px;
`;
const SelectEntity = styled.select`
  display: block;
`;

const NewInvoice = ({ createInvoice, lists, completeList }) => {
  const [quotationList, setQuotationList] = useState(lists.quotations.filter(q => q.type === "SPONSOR" || q.type === "any"));
  const [moduleList, setModuleList] = useState(lists.modules);
  const [activityList, setActivityList] = useState(lists.activities);
  const [quotationId, setQuotationId] = useState("-1");
  const [quotationType, setQuotationType] = useState("SPONSOR");
  const [moduleId, setModuleId] = useState("-1");
  const [activityId, setActivityId] = useState("-1");
  const [unitCost, setUnitCost] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    let datePicker = document.getElementById("date");
    if (datePicker) {
      let d = M.Datepicker.init(datePicker, { format: "dd/mm/yyyy", onClose: () => invoiceDateChange(datePicker.value) });
    }
  }, []);

  const invoiceTypeChange = (type) => {
    setQuotationList(lists.quotations.filter(q => q.type === type || q.type === "any"));
    setQuotationType(type);
    setQuotationId("-1");
    setModuleId("-1");
    setActivityId("-1");
  };

  const invoiceDateChange = (date) => {
    setDate(date);
  };

  const quotationChange = (qId) => {
    setQuotationId(qId);
    setModuleId("-1");
    setActivityId("-1");
    if (qId === "-1") {
      setModuleList(lists.modules.filter(m => m.id === "-1"));
      setActivityList(getAvailableActivities(qId));
    }
    if (qId === "0") {
      setModuleList(completeList.modules);
      setActivityList(getAvailableActivities(qId));
    }
    if (qId !== "-1" && qId !== "0") {
      setModuleList(lists.modules.filter(m => m.quotationId === qId || m.id === "-1"));
      setActivityList(getAvailableActivities(qId));
    }
  };

  const moduleChange = (mId) => {
    setModuleId(mId);
    setActivityList(getAvailableActivities(quotationId, mId));
  };

  const getAvailableActivities = (quotation, module) => {
    if (quotation === "-1" || module === "-1") {
      return lists.activities.filter(a => a.id === "-1")
    }

    if (quotation === "0") {
      return completeList.activities.filter(
        a => (
          (a.moduleId === module) ||
          a.id === "-1"
        )
      );
    }

    return lists.activities.filter(
      a => (
        (a.quotationId === quotation && a.moduleId === module) ||
        a.id === "-1"
      )
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

  const cannotSave = () => {
    return (quotationId === "-1" || (quotationId !== "0" && (moduleId === "-1" || activityId === "-1")) || !unitCost || !unitNumber || !date);
  };

  const saveInvoice = () => {
    const selectedModule = quotationId === "0" ? completeList.modules.find(m => m.id === moduleId) : lists.modules.find(m => m.id === moduleId);
    const selectedActivity = quotationId === "0" ? completeList.activities.find(a => a.id === activityId) : lists.activities.find(a => a.id === activityId);

    if (!cannotSave()) {
      const invoice = {
        date: date,
        type: quotationType,
        quotationCode: lists.quotations.find(q => q.id === quotationId).code,
        moduleCode: selectedModule.code ? selectedModule.code : "N/A",
        activityCode: selectedActivity.code,
        moduleTitle: selectedModule.title,
        activityTitle: selectedActivity.title,
        unitCost: unitCost,
        unitNumber: unitNumber,
        totalCost: totalCost,
        comment: comment,
        status: "NEW"
      }

      createInvoice(invoice);
      setQuotationId("-1");
      setModuleId("-1");
      setActivityId("-1");
      setUnitCost("");
      setUnitNumber("");
      setTotalCost("");
      setDate("");
      setComment("");
      let datePicker = document.getElementById("date");
      datePicker.value = "";
    }
  };

  return (
    <MainContainer>
      <NewInvoiceContainer>
        <NewInvoiceBody>
          <BodyItem>
            <label htmlFor="type">Invoice type</label>
            <SelectEntity onChange={e => invoiceTypeChange(e.target.value)}>
              <option key={"SPONSOR"} value={"SPONSOR"}> SPONSOR </option>
              <option key={"PROVIDER"} value={"PROVIDER"}> PROVIDER </option>
            </SelectEntity>
          </BodyItem>
          <BodyItem>
            <label htmlFor="date">Date</label>
            <input type="text" id="date" className="datepicker" onClose={e => invoiceDateChange(e.target.value)} />
          </BodyItem>
        </NewInvoiceBody>
        <NewInvoiceBody>
          <BodyItem>
            <label htmlFor="quotation">Quotation</label>
            <SelectEntity value={quotationId} onChange={e => quotationChange(e.target.value)}>
              {
                quotationList.map(q =>
                  <option key={q.id} value={q.id}>  {q.code} </option>
                )
              }
            </SelectEntity>
          </BodyItem>
          <BodyItem type="text">
            <label>Module</label>
            <SelectEntity value={moduleId} disabled={quotationId === "-1"} onChange={e => moduleChange(e.target.value)}>
              {
                moduleList.map(m =>
                  <option key={m.id} value={m.id} >  {m.title} {m.geo ? m.geo.description : ''} </option>
                )
              }
            </SelectEntity>
          </BodyItem>
          <BodyItem type="text">
            <label>Activity Code</label>
            <SelectEntity value={activityId} disabled={moduleId === "-1"} onChange={e => setActivityId(e.target.value)}>
              {
                activityList.map(a =>
                  <option key={a.id} value={a.id}>  {a.title} </option>
                )
              }
            </SelectEntity>
          </BodyItem>
          <BodyItemSmall>
            <label>Unit cost</label>
            <InvoiceInput type="number" min="0.00" step="0.01" value={unitCost} onChange={e => unitCostChange(e.target.value)} />
          </BodyItemSmall>
          <BodyItemSmall>
            <label>Unit number</label>
            <InvoiceInput type="number" min="0" step="1" value={unitNumber} onChange={e => unitNumberChange(e.target.value)} />
          </BodyItemSmall>
          <BodyItemSmall>
            <label>Total cost</label>
            <TotalCost>{totalCost}</TotalCost>
          </BodyItemSmall>
        </NewInvoiceBody>
        <NewInvoiceBody>
          <BodyItemFull>
            <label>Comment</label>
            <InvoiceTextArea value={comment} onChange={e => setComment(e.target.value)} />
          </BodyItemFull>
        </NewInvoiceBody>

      </NewInvoiceContainer>
      <SaveButton disabled={cannotSave()} onClick={() => saveInvoice()}>Save Invoice</SaveButton>
    </MainContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    lists: getQuotationsEntityList(state),
    completeList: getAllModulesAndActivities(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createInvoice: (invoice) => dispatch(createNewInvoice(invoice))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewInvoice);
