import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createNewInvoice } from "../store/actions/invoiceActions";
import {
  getSponsorQuotationsEntityList,
  getProviderQuotationsEntityList,
  getAllModulesAndActivities,
} from "../store/selectors/quotationSelectors";
import { getProjectProviders } from "../store/selectors/projectSelectors";
import M from "materialize-css/dist/js/materialize.min.js";

const NewInvoice = ({ createInvoice, sponsorList, providerList, completeList, providers }) => {
  const [activityType, setActivityType] = useState("INCOME");
  // sponsor
  const [sponsorQuotationList, setSponsorQuotationList] = useState([]);
  const [sponsorModuleList, setSponsorModuleList] = useState([]);
  const [sponsorActivityList, setSponsorActivityList] = useState([]);
  const [sponsorQuotationId, setSponsorQuotationId] = useState("-1");
  const [sponsorModuleId, setSponsorModuleId] = useState("-1");
  const [sponsorActivityId, setSponsorActivityId] = useState("-1");
  // provider
  const [providerQuotationList, setProviderQuotationList] = useState([]);
  const [providerModuleList, setProviderModuleList] = useState([]);
  const [providerActivityList, setProviderActivityList] = useState([]);
  const [providerQuotationId, setProviderQuotationId] = useState("-1");
  const [providerModuleId, setProviderModuleId] = useState("-1");
  const [providerActivityId, setProviderActivityId] = useState("-1");

  const [unitCost, setUnitCost] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [hasProvider, setHasProvider] = useState(false);
  const [providerId, setProviderId] = useState("-1");

  useEffect(() => {
    const datePicker = document.getElementById("date");
    if (datePicker) {
      M.Datepicker.init(datePicker, {
        format: "dd/mm/yyyy",
        onClose: () => { setDate(datePicker.value); },
      });
    }
  });

  useEffect(() => {
    setSponsorQuotationList(sponsorList.quotations)
  }, [sponsorList]);

  useEffect(() => {
    setProviderQuotationList(providerList.quotations)
  }, [providerList]);

  const activityTypeChange = (type) => {
    setActivityType(type)
  };

  const providerChange = (provider) => {
    setProviderQuotationList(
      providerList.quotations.filter(
        (q) => provider === "-1" || (q.provider && q.provider.id === provider)
      )
    );
    setProviderQuotationId("-1");
    setProviderModuleId("-1");
    setProviderActivityId("-1");
    setProviderId(provider);
  };

  const sponsorQuotationChange = (qId) => {
    setSponsorQuotationId(qId);
    setSponsorModuleId("-1");
    setSponsorActivityId("-1");
    if (qId === "-1") {
      setSponsorModuleList(sponsorList.modules.filter((m) => m.id === "-1"));
      setSponsorActivityList(getAvailableActivities(qId));
    }
    if (qId === "0") {
      setSponsorModuleList(completeList.modules);
      setSponsorActivityList(getAvailableActivities(qId));
    }
    if (qId !== "-1" && qId !== "0") {
      setSponsorModuleList(
        sponsorList.modules.filter((m) => m.quotationId === qId || m.id === "-1")
      );
      setSponsorActivityList(getAvailableActivities(qId));
    }
  };

  const sponsorModuleChange = (mId) => {
    setSponsorModuleId(mId);
    setSponsorActivityList(getAvailableActivities(sponsorQuotationId, mId));
  };

  const providerQuotationChange = (qId) => {
    setProviderQuotationId(qId);
    setProviderModuleId("-1");
    setProviderActivityId("-1");
    if (qId === "-1") {
      setProviderModuleList(sponsorList.modules.filter((m) => m.id === "-1"));
      setProviderActivityList(getAvailableActivities(qId));
    }
    if (qId === "0") {
      setProviderModuleList(completeList.modules);
      setProviderActivityList(getAvailableActivities(qId));
    }
    if (qId !== "-1" && qId !== "0") {
      setProviderModuleList(
        sponsorList.modules.filter((m) => m.quotationId === qId || m.id === "-1")
      );
      setProviderActivityList(getAvailableActivities(qId));
    }
  };

  const providerModuleChange = (mId) => {
    setProviderModuleId(mId);
    setProviderActivityList(getAvailableActivities(sponsorQuotationId, mId));
  };

  const getAvailableActivities = (quotation, module) => {
    if (quotation === "-1" || module === "-1") {
      return sponsorList.activities.filter((a) => a.id === "-1");
    }

    if (quotation === "0") {
      return completeList.activities.filter(
        (a) => a.moduleId === module || a.id === "-1"
      );
    }

    return sponsorList.activities.filter(
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

  const hasProviderChange = () => {
    if (!hasProvider) {
      setProviderQuotationList([])
    } else {
      setProviderQuotationList(providerList);
    }
    setProviderId("-1");
    setProviderQuotationId("-1");
    setHasProvider(!hasProvider);
  };

  const cannotSave = () => {
    return (
      sponsorQuotationId === "-1" ||
      (sponsorQuotationId !== "0" && (sponsorModuleId === "-1" || sponsorActivityId === "-1")) ||
      !unitCost ||
      !unitNumber ||
      !date ||
      (hasProvider && providerId === "-1")
    );
  };

  const saveInvoice = () => {
    const selectedSponsorModule =
      sponsorQuotationId === "0"
        ? completeList.modules.find((m) => m.id === sponsorModuleId)
        : sponsorList.modules.find((m) => m.id === sponsorModuleId);
    const selectedSponsorActivity =
      sponsorQuotationId === "0"
        ? completeList.activities.find((a) => a.id === sponsorActivityId)
        : sponsorList.activities.find((a) => a.id === sponsorActivityId);
    const sponsorQuotation = sponsorQuotationId === "0" ? "Out of budget" : sponsorList.quotations.find((q) => q.id === sponsorQuotationId);

    const selectedProviderModule =
      providerQuotationId === "0"
        ? completeList.modules.find((m) => m.id === providerModuleId)
        : sponsorList.modules.find((m) => m.id === providerModuleId);
    const selectedProviderActivity =
      providerQuotationId === "0"
        ? completeList.activities.find((a) => a.id === providerActivityId)
        : sponsorList.activities.find((a) => a.id === providerActivityId);
    const providerQuotation = sponsorQuotationId === "0" ? "Out of budget" : providerList.quotations.find((q) => q.id === providerQuotationId);

    if (!cannotSave()) {
      const invoice = {
        date: date,
        type: activityType,
        sponsorQuotationId: sponsorQuotation.id,
        sponsorQuotationCode: sponsorQuotation.code,
        sponsorModuleId: selectedSponsorModule.id,
        sponsorModuleCode: selectedSponsorModule.code,
        sponsorModuleTitle: selectedSponsorModule.title,
        sponsorActivityId: selectedSponsorActivity.id,
        sponsorActivityCode: selectedSponsorActivity.code,
        sponsorActivityTitle: selectedSponsorActivity.title,
        provider: activityType === "quotationType" && hasProvider === true ? providers.find((p) => (p.id = providerId)) : null,
        providerQuotationId: providerQuotation ? providerQuotation.id : null,
        providerQuotationCode: providerQuotation ? providerQuotation.code : null,
        providerModuleId: selectedProviderModule ? selectedProviderModule.id : null,
        providerModuleCode: selectedProviderModule ? selectedProviderModule.code : null,
        providerModuleTitle: selectedProviderModule ? selectedProviderModule.title : null,
        providerActivityId: selectedProviderActivity ? selectedProviderActivity.id : null,
        providerActivityCode: selectedProviderActivity ? selectedProviderActivity.code : null,
        providerActivityTitle: selectedProviderActivity ? selectedProviderActivity.title : null,
        unitCost: unitCost,
        unitNumber: unitNumber,
        totalCost: totalCost,
        comment: comment,
        status: "NEW",
      };

      createInvoice(invoice);
      setSponsorQuotationId("-1");
      setSponsorModuleId("-1");
      setSponsorActivityId("-1");
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
              onChange={(e) => activityTypeChange(e.target.value)}
            >
              <option key={"INCOME"} value={"INCOME"}>
                {" "}
                INCOME{" "}
              </option>
              <option key={"EXPENSE"} value={"EXPENSE"}>
                {" "}
                EXPENSE{" "}
              </option>
            </select>
            <label className="active" htmlFor="invoiceType">
              Activity type
            </label>
          </div>
          {activityType === "EXPENSE" ? (
            <>
              <div className="col s1 m1">
                <label>
                  <input type="checkbox" onChange={e => hasProviderChange()} />
                  <span>Has provider</span>
                </label>
              </div>
              {hasProvider ?
                <div className="input-field col s6 m5">
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
                </div> : ""
              }
            </>
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
              value={sponsorQuotationId}
              onChange={(e) => sponsorQuotationChange(e.target.value)}
            >
              <option key="selectQuotation" value="-1">
                Select a quotation
              </option>
              <option key="outOfBudget" value="0">
                Out of budget
              </option>
              {sponsorQuotationList.map((q) => (
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
              value={sponsorModuleId}
              disabled={sponsorQuotationId === "-1"}
              onChange={(e) => sponsorModuleChange(e.target.value)}
            >
              <option key="module-0" value="-1">
                Select a module
              </option>
              {sponsorModuleList.map((m) => (
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
              value={sponsorActivityId}
              disabled={sponsorModuleId === "-1"}
              onChange={(e) => setSponsorActivityId(e.target.value)}
            >
              <option key="activity-0" value="-1">
                Select an activity
              </option>
              {sponsorActivityList.map((a) => (
                <option key={a.id} value={a.id}>
                  {" "}
                  {a.title}{" "}
                </option>
              ))}
            </select>
            <label className="active" htmlFor="activityCode">
              Activity
            </label>
          </div>
        </div>

        {/* PROVIDER QUOTATION  */}
        {hasProvider && providerId ?
          <div className="row">
            <div className="input-field col s12 m4">
              <select
                id="quotation"
                name="quotation"
                className="browser-default"
                value={providerQuotationId}
                onChange={(e) => providerQuotationChange(e.target.value)}
              >
                <option key="selectQuotation" value="-1">
                  Select a quotation
              </option>
                <option key="outOfBudget" value="0">
                  Out of budget
              </option>
                {providerQuotationList.map((q) => (
                  <option key={q.id} value={q.id}>
                    {" "}
                    {q.code}{" "}
                  </option>
                ))}
              </select>
              <label className="active" htmlFor="quotation">
                Provider quotation
            </label>
            </div>
            <div className="input-field col s12 m4">
              <select
                id="module"
                name="module"
                className="browser-default"
                value={providerModuleId}
                disabled={providerQuotationId === "-1"}
                onChange={(e) => providerModuleChange(e.target.value)}
              >
                <option key="module-0" value="-1">
                  Select a module
              </option>
                {providerModuleList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {" "}
                    {m.title} {m.geo ? m.geo.description : ""}{" "}
                  </option>
                ))}
              </select>
              <label className="active" htmlFor="module">
                Provider module
            </label>
            </div>
            <div className="input-field col s12 m4">
              <select
                id="activityCode"
                name="activityCode"
                className="browser-default"
                value={providerActivityId}
                disabled={providerModuleId === "-1"}
                onChange={(e) => setProviderActivityId(e.target.value)}
              >
                <option key="activity-0" value="-1">
                  Select an activity
              </option>
                {providerActivityList.map((a) => (
                  <option key={a.id} value={a.id}>
                    {" "}
                    {a.title}{" "}
                  </option>
                ))}
              </select>
              <label className="active" htmlFor="activityCode">
                Provider activity
            </label>
            </div>
          </div>
          : ''
        }
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
    sponsorList: getSponsorQuotationsEntityList(state),
    providerList: getProviderQuotationsEntityList(state),
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
