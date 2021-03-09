import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import {
  setInvoiceFilter,
  clearInvoiceFilter,
} from "../store/actions/invoiceActions";
import { getQuotationsEntityList } from "../store/selectors/quotationSelectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InvoiceFilterSmall = ({ quotationEntities, setFilter, clearFilters }) => {
  const [invoiceTypeFilter, setInvoiceTypeFilter] = useState([]);
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState([]);
  const [invoiceQuotationFilter, setInvoiceQuotationFilter] = useState([]);
  const [invoiceModuleFilter, setInvoiceModuleFilter] = useState([]);
  const [invoiceActivityFilter, setInvoiceActivityFilter] = useState([]);
  const [activitiesShown, setActivitiesShown] = useState(undefined);

  useEffect(() => {
    M.AutoInit();
  }, []);

  const setTypeFilter = (value) => {
    if (invoiceTypeFilter.includes(value)) {
      invoiceTypeFilter.splice(invoiceTypeFilter.indexOf(value), 1);
    } else {
      invoiceTypeFilter.push(value);
    }
    setInvoiceTypeFilter(invoiceTypeFilter);
    setFilter("type", invoiceTypeFilter);
  };

  const setStatusFilter = (value) => {
    if (invoiceStatusFilter.includes(value)) {
      invoiceStatusFilter.splice(invoiceStatusFilter.indexOf(value), 1);
    } else {
      invoiceStatusFilter.push(value);
    }
    setInvoiceStatusFilter(invoiceStatusFilter);
    setFilter("status", invoiceStatusFilter);
  };

  const setQuotationFilter = (value) => {
    if (invoiceQuotationFilter.includes(value)) {
      invoiceQuotationFilter.splice(invoiceQuotationFilter.indexOf(value), 1);
    } else {
      invoiceQuotationFilter.push(value);
    }
    setInvoiceQuotationFilter(invoiceQuotationFilter);
    setFilter("quotations", invoiceQuotationFilter);
  };

  const setModuleFilter = (value) => {
    if (invoiceModuleFilter.includes(value)) {
      invoiceModuleFilter.splice(invoiceModuleFilter.indexOf(value), 1);
    } else {
      invoiceModuleFilter.push(value);
    }
    setInvoiceModuleFilter(invoiceModuleFilter);
    setFilter("modules", invoiceModuleFilter);
    showActivitiesForModule(value);
  };

  const setActivityFilter = (value) => {
    if (invoiceActivityFilter.includes(value)) {
      invoiceActivityFilter.splice(invoiceActivityFilter.indexOf(value), 1);
    } else {
      invoiceActivityFilter.push(value);
    }
    setInvoiceActivityFilter(invoiceActivityFilter);
    setFilter("activities", invoiceActivityFilter);
  };

  const showActivitiesForModule = (moduleCode) => {
    const newActivitiesShown =
      activitiesShown === moduleCode ? undefined : moduleCode;

    setActivitiesShown(newActivitiesShown);
  };

  const clearAllFilters = () => {
    setInvoiceTypeFilter([]);
    setInvoiceStatusFilter([]);
    setInvoiceQuotationFilter([]);
    setInvoiceModuleFilter([]);
    setInvoiceActivityFilter([]);
    clearFilters();
  };

  return (
    <div className="collapsible-body">
      <div className="filter-small card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <a
              href="#!"
              className="red-text upper-text"
              onClick={() => clearAllFilters()}
            >
              <FontAwesomeIcon icon="times" className="space-right" />
              Clear filters
            </a>
          </div>
        </div>
      </div>
      <div className="filter-small card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <h6 className="bolder">Type</h6>
            <label>
              <input
                type="checkbox"
                checked={
                  invoiceTypeFilter.find((t) => t === "SPONSOR") ? true : false
                }
                onChange={() => setTypeFilter("SPONSOR")}
              />
              <span>Sponsor</span>{" "}
            </label>
            <label>
              <input
                type="checkbox"
                checked={
                  invoiceTypeFilter.find((t) => t === "PROVIDER") ? true : false
                }
                onChange={() => setTypeFilter("PROVIDER")}
              />
              <span>Provider</span>{" "}
            </label>
          </div>
        </div>
      </div>
      <div className="filter-small card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <h6 className="bolder">Status</h6>
            <label>
              <input
                type="checkbox"
                checked={
                  invoiceStatusFilter.find((t) => t === "NEW") ? true : false
                }
                onChange={() => setStatusFilter("NEW")}
              />
              <span>New</span>{" "}
            </label>
            <label>
              <input
                type="checkbox"
                checked={
                  invoiceStatusFilter.find((t) => t === "READY") ? true : false
                }
                onChange={() => setStatusFilter("READY")}
              />
              <span>Ready</span>{" "}
            </label>
            <label>
              <input
                type="checkbox"
                checked={
                  invoiceStatusFilter.find((t) => t === "INVOICED")
                    ? true
                    : false
                }
                onChange={() => setStatusFilter("INVOICED")}
              />
              <span>Invoiced</span>{" "}
            </label>
          </div>
        </div>
      </div>
      <div className="filter-small card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <h6 className="bolder">Quotation</h6>
            {quotationEntities.quotations.map((q) => (
              <label key={q.id}>
                <input
                  type="checkbox"
                  checked={
                    invoiceQuotationFilter.find((t) => t === q.id)
                      ? true
                      : false
                  }
                  onChange={() => setQuotationFilter(q.id)}
                />
                <span>{q.code}</span>{" "}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="filter-small card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <h6 className="bolder">Module</h6>
            {quotationEntities.uniqueModules.map((m) => (
              <div key={m.code} className="filter-small-module">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setModuleFilter(m.code)}
                    checked={
                      invoiceModuleFilter.find((t) => t === m.code)
                        ? true
                        : false
                    }
                  />
                  <span>
                    {" "}
                    {m.title} - {m.geo.description}{" "}
                  </span>
                </label>

                {activitiesShown === m.code ? (
                  <div className="pad-left">
                    <h6 className="bolder">Activity</h6>
                    {quotationEntities.activities
                      .filter((a) => a.moduleCode === m.code)
                      .map((activity) => (
                        <label key={activity.id}>
                          <input
                            type="checkbox"
                            onChange={() => setActivityFilter(activity.id)}
                            checked={
                              invoiceActivityFilter.find(
                                (t) => t === activity.id
                              )
                                ? true
                                : false
                            }
                          />
                          <span>{activity.title}</span>
                        </label>
                      ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quotationEntities: getQuotationsEntityList(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (filterType, filterValue) =>
      dispatch(setInvoiceFilter(filterType, filterValue)),
    clearFilters: () => dispatch(clearInvoiceFilter()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceFilterSmall);
