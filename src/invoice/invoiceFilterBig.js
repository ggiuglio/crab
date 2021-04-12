import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InvoiceFilterBig = (par) => {
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
          onClick={() => par.clearAllFilters()}
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
                    par.invoiceTypeFilter.find((t) => t === "INCOME")
                      ? true
                      : false
                  }
                  onChange={() => par.setTypeFilter("INCOME")}
                />
                <span>Income</span>{" "}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={
                    par.invoiceTypeFilter.find((t) => t === "EXPENSE")
                      ? true
                      : false
                  }
                  onChange={() => par.setTypeFilter("EXPENSE")}
                />
                <span>Expense</span>{" "}
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
                    par.invoiceStatusFilter.find((t) => t === "NEW") ? true : false
                  }
                  onChange={() => par.setStatusFilter("NEW")}
                />
                <span>New</span>{" "}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={
                    par.invoiceStatusFilter.find((t) => t === "READY")
                      ? true
                      : false
                  }
                  onChange={() => par.setStatusFilter("READY")}
                />
                <span>Ready</span>{" "}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={
                    par.invoiceStatusFilter.find((t) => t === "INVOICED")
                      ? true
                      : false
                  }
                  onChange={() => par.setStatusFilter("INVOICED")}
                />
                <span>Invoiced</span>{" "}
              </label>
            </div>
          </div>
        </li>
        <li>
          <div className="collapsible-header bolder">Quotation</div>
          <div className="collapsible-body">
            {par.quotationEntities.quotations.map((q) => (
              <div key={q.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      par.invoiceQuotationFilter.find((t) => t === q.id)
                        ? true
                        : false
                    }
                    onChange={() => par.setQuotationFilter(q.id)}
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
              {par.quotationEntities.uniqueModules.map((m) => (
                <li key={m.code}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => par.setModuleFilter(m.code)}
                      checked={
                        par.invoiceModuleFilter.find((t) => t === m.code)
                          ? true
                          : false
                      }
                    />
                    <span>
                      {" "}
                      {m.title} - {m.geo.description}{" "}
                    </span>
                  </label>

                  {par.invoiceModuleFilter.includes(m.code) ? (
                    <div className="pad-left bot-separator">
                      <div className="bolder">Activity</div>
                      {par.quotationEntities.activities
                        .filter((a) => a.moduleCode === m.code)
                        .map((activity) => (
                          <div key={activity.id}>
                            <label>
                              <input
                                type="checkbox"
                                onChange={() => par.setActivityFilter(activity.id)}
                                checked={
                                  par.invoiceActivityFilter.find(
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

export default InvoiceFilterBig;
