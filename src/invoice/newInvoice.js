import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createNewInvoice } from "../store/actions/invoiceActions";
import {
  getQuotationsEntityList,
  getAllModulesAndActivities,
} from "../store/selectors/quotationSelectors";
import { getProjectProviders } from "../store/selectors/projectSelectors";
import M from "materialize-css/dist/js/materialize.min.js";

const NewInvoice = ({ createInvoice, lists, completeList, providers }) => {
  const [quotationList, setQuotationList] = useState(
    lists.quotations.filter((q) => q.type === "SPONSOR" || q.type === "any")
  );
  const [moduleList, setModuleList] = useState(lists.modules);
  const [activityList, setActivityList] = useState(lists.activities);
  const [quotationId, setQuotationId] = useState("-1");
  const [quotationType, setQuotationType] = useState("SPONSOR");
  const [moduleId, setModuleId] = useState("-1");
  const [activityId, setActivityId] = useState("-1");
  const [unitCost, setUnitCost] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [providerId, setProviderId] = useState("-1");
  useEffect(() => {
    const datePicker = document.getElementById("date");
    if (datePicker) {
      M.Datepicker.init(datePicker, {
        format: "dd/mm/yyyy",
        onClose: () => {setDate(datePicker.value);},
      });
    }
  });

  const invoiceTypeChange = (type) => {
    if (type === "SPONSOR") {
      setQuotationList(lists.quotations.filter((q) => q.type === type));
    } else {
      setQuotationList([]);
    }
    setQuotationType(type);
    setQuotationId("-1");
    setModuleId("-1");
    setActivityId("-1");
    setProviderId("-1");
  };

  const providerChange = (provider) => {
    setQuotationList(
      lists.quotations.filter(
        (q) => q.type === "PROVIDER" && q.provider && q.provider.id === provider
      )
    );
    setQuotationId("-1");
    setModuleId("-1");
    setActivityId("-1");
    setProviderId(provider);
  };

  const quotationChange = (qId) => {
    setQuotationId(qId);
    setModuleId("-1");
    setActivityId("-1");
    if (qId === "-1") {
      setModuleList(lists.modules.filter((m) => m.id === "-1"));
      setActivityList(getAvailableActivities(qId));
    }
    if (qId === "0") {
      setModuleList(completeList.modules);
      setActivityList(getAvailableActivities(qId));
    }
    if (qId !== "-1" && qId !== "0") {
      setModuleList(
        lists.modules.filter((m) => m.quotationId === qId || m.id === "-1")
      );
      setActivityList(getAvailableActivities(qId));
    }
  };

  const moduleChange = (mId) => {
    setModuleId(mId);
    setActivityList(getAvailableActivities(quotationId, mId));
  };

  const getAvailableActivities = (quotation, module) => {
    if (quotation === "-1" || module === "-1") {
      return lists.activities.filter((a) => a.id === "-1");
    }

    if (quotation === "0") {
      return completeList.activities.filter(
        (a) => a.moduleId === module || a.id === "-1"
      );
    }

    return lists.activities.filter(
      (a) =>
        (a.quotationId === quotation && a.moduleId === module) || a.id === "-1"
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
    return (
      quotationId === "-1" ||
      (quotationId !== "0" && (moduleId === "-1" || activityId === "-1")) ||
      !unitCost ||
      !unitNumber ||
      !date ||
      (quotationType === "PROVIDER" && providerId === "-1")
    );
  };

  const saveInvoice = () => {
    const selectedModule =
      quotationId === "0"
        ? completeList.modules.find((m) => m.id === moduleId)
        : lists.modules.find((m) => m.id === moduleId);
    const selectedActivity =
      quotationId === "0"
        ? completeList.activities.find((a) => a.id === activityId)
        : lists.activities.find((a) => a.id === activityId);

    if (!cannotSave()) {
      const invoice = {
        date: date,
        type: quotationType,
        quotationCode: lists.quotations.find((q) => q.id === quotationId).code,
        moduleCode: selectedModule.code ? selectedModule.code : "N/A",
        activityCode: selectedActivity.code,
        quotationId: lists.quotations.find((q) => q.id === quotationId).id,
        provider: providers.find((p) => (p.id = providerId)),
        moduleId: selectedModule.id,
        activityId: selectedActivity.id,
        moduleTitle: selectedModule.title,
        activityTitle: selectedActivity.title,
        unitCost: unitCost,
        unitNumber: unitNumber,
        totalCost: totalCost,
        comment: comment,
        status: "NEW",
      };

      createInvoice(invoice);
      setQuotationId("-1");
      setModuleId("-1");
      setActivityId("-1");
      setProviderId("-1");
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
    <div className="collapsible-body">
      <div className="section">
        <div className="row">
          <div className="input-field col s6 m3">
            <label className="active" htmlFor="date">
              Date
            </label>
            <input
              type="text"
              id="date"
              name="date"
              className="datepicker"
            />
          </div>
          <div className="input-field col s6 m3">
            <select
              id="invoiceType"
              name="invoiceType"
              className="browser-default"
              onChange={(e) => invoiceTypeChange(e.target.value)}
            >
              <option key={"SPONSOR"} value={"SPONSOR"}>
                {" "}
                SPONSOR{" "}
              </option>
              <option key={"PROVIDER"} value={"PROVIDER"}>
                {" "}
                PROVIDER{" "}
              </option>
            </select>
            <label className="active" htmlFor="invoiceType">
              Invoice type
            </label>
          </div>
          {quotationType === "PROVIDER" ? (
            <div className="input-field col s12 m6">
              <select
                id="provider"
                name="provider"
                className="browser-default"
                value={providerId}
                onChange={(e) => providerChange(e.target.value)}
              >
                <option key="selectProvider" value="-1">
                  Select a provider
                </option>
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
              <label className="active" htmlFor="provider">
                Provider
              </label>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="row">
          <div className="input-field col s12 m4">
            <select
              id="quotation"
              name="quotation"
              className="browser-default"
              value={quotationId}
              onChange={(e) => quotationChange(e.target.value)}
            >
              <option key="selectQuotation" value="-1">
                Select a quotation
              </option>
              <option key="outOfBudget" value="0">
                Out of budget
              </option>
              {quotationList.map((q) => (
                <option key={q.id} value={q.id}>
                  {" "}
                  {q.code}{" "}
                </option>
              ))}
            </select>
            <label className="active" htmlFor="quotation">
              Quotation
            </label>
          </div>
          <div className="input-field col s12 m4">
            <select
              id="module"
              name="module"
              className="browser-default"
              value={moduleId}
              disabled={quotationId === "-1"}
              onChange={(e) => moduleChange(e.target.value)}
            >
              {moduleList.map((m) => (
                <option key={m.id} value={m.id}>
                  {" "}
                  {m.title} {m.geo ? m.geo.description : ""}{" "}
                </option>
              ))}
            </select>
            <label className="active" htmlFor="module">
              Module
            </label>
          </div>
          <div className="input-field col s12 m4">
            <select
              id="activityCode"
              name="activityCode"
              className="browser-default"
              value={activityId}
              disabled={moduleId === "-1"}
              onChange={(e) => setActivityId(e.target.value)}
            >
              {activityList.map((a) => (
                <option key={a.id} value={a.id}>
                  {" "}
                  {a.title}{" "}
                </option>
              ))}
            </select>
            <label className="active" htmlFor="activityCode">
              Activity code
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s4 m2 l1">
            <label className="active" htmlFor="unitCost">
              Unit cost
            </label>
            <input
              name="unitCost"
              type="number"
              min="0.00"
              step="0.01"
              value={unitCost}
              onChange={(e) => unitCostChange(e.target.value)}
            ></input>
          </div>
          <div className="input-field col s4 m2 l1">
            <label className="active" htmlFor="unitNumber">
              Unit number
            </label>
            <input
              name="unitNumber"
              type="number"
              min="0"
              step="1"
              value={unitNumber}
              onChange={(e) => unitNumberChange(e.target.value)}
            ></input>
          </div>
          <div className="input-field col s4 m2 l1">
            <label className="active" htmlFor="totalCost">
              Total cost
            </label>
            <input className="bolder" name="totalCost" value={totalCost} readOnly={true}></input>
          </div>
          <div className="input-field col s12 m6 l9">
            <i className="material-icons prefix">mode_edit</i>
            <textarea
              id="invoiceComment"
              className="materialize-textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <label htmlFor="invoiceComment">Comment</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 center">
            <button
              className="btn indigo lighten-1 z-depth-0"
              disabled={cannotSave()}
              onClick={() => saveInvoice()}
            >
              Create activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    lists: getQuotationsEntityList(state),
    completeList: getAllModulesAndActivities(state),
    providers: getProjectProviders(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createInvoice: (invoice) => dispatch(createNewInvoice(invoice)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewInvoice);
