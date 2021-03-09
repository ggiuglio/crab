import React, { useState } from "react";
import { connect } from "react-redux";
import {
  setInvoiceFilter,
  clearInvoiceFilter,
} from "../store/actions/invoiceActions";
import { getQuotationsEntityList } from "../store/selectors/quotationSelectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InvoiceFilter = ({ quotationEntities, setFilter, clearFilters }) => {
  const [invoiceTypeFilter, setInvoiceTypeFilter] = useState([]);
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState([]);
  const [invoiceQuotationFilter, setInvoiceQuotationFilter] = useState([]);
  const [invoiceModuleFilter, setInvoiceModuleFilter] = useState([]);
  const [invoiceActivityFilter, setInvoiceActivityFilter] = useState([]);
  const [activitiesShown, setActivitiesShown] = useState(undefined);

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
    <div id="invoice-filters" className="row">
      <div className="col s12">
        <span className="bolder card-text space-right">Filter activities</span>
        <FontAwesomeIcon icon="filter" className="black-text fa-lg" />
      </div>
      <div className="col s12 center">
        <a
          href="#!"
          className="red-text upper-text"
          onClick={() => clearAllFilters()}
        >
          <FontAwesomeIcon icon="times" className="space-right" />
          Clear filters
        </a>
      </div>
      <ul className="collapsible">
        <li>
          <div className="collapsible-header bolder">Type</div>
          <div className="collapsible-body">
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={
                    invoiceTypeFilter.find((t) => t === "SPONSOR")
                      ? true
                      : false
                  }
                  onChange={() => setTypeFilter("SPONSOR")}
                />
                <span>Sponsor</span>{" "}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={
                    invoiceTypeFilter.find((t) => t === "PROVIDER")
                      ? true
                      : false
                  }
                  onChange={() => setTypeFilter("PROVIDER")}
                />
                <span>Provider</span>{" "}
              </label>
            </div>
          </div>
        </li>
        <li>
          <div className="collapsible-header bolder">Status</div>
          <div className="collapsible-body">
            <div>
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
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={
                    invoiceStatusFilter.find((t) => t === "READY")
                      ? true
                      : false
                  }
                  onChange={() => setStatusFilter("READY")}
                />
                <span>Ready</span>{" "}
              </label>
            </div>
            <div>
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
        </li>
        <li>
          <div className="collapsible-header bolder">Quotation</div>
          <div className="collapsible-body">
            {quotationEntities.quotations.map((q) => (
              <div key={q.id}>
                <label>
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
              </div>
            ))}
          </div>
        </li>
        <li>
          <div className="collapsible-header bolder">Module</div>
          <div className="collapsible-body">
            <ul id="filter-module-list">
              {quotationEntities.uniqueModules.map((m) => (
                <li key={m.code}>
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
                    <div className="pad-left bot-separator">
                      <div className="bolder">Activity</div>
                      {quotationEntities.activities
                        .filter((a) => a.moduleCode === m.code)
                        .map((activity) => (
                          <div key={activity.id}>
                            <label>
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
                          </div>
                        ))}
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceFilter);
