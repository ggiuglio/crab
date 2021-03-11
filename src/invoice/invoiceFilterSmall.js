import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InvoiceFilterSmall = (par) => {
  return (
    <div className="collapsible-body">
      <div className="filter-small card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <a
              href="#!"
              className="red-text upper-text"
              onClick={() => par.clearAllFilters()}
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
                  par.invoiceTypeFilter.find((t) => t === "SPONSOR")
                    ? true
                    : false
                }
                onChange={() => par.setTypeFilter("SPONSOR")}
              />
              <span>Income</span>{" "}
            </label>
            <label>
              <input
                type="checkbox"
                checked={
                  par.invoiceTypeFilter.find((t) => t === "PROVIDER")
                    ? true
                    : false
                }
                onChange={() => par.setTypeFilter("PROVIDER")}
              />
              <span>Expense</span>{" "}
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
                  par.invoiceStatusFilter.find((t) => t === "NEW")
                    ? true
                    : false
                }
                onChange={() => par.setStatusFilter("NEW")}
              />
              <span>New</span>{" "}
            </label>
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
      </div>
      <div className="filter-small card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <h6 className="bolder">Quotation</h6>
            {par.quotationEntities.quotations.map((q) => (
              <label key={q.id}>
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
            ))}
          </div>
        </div>
      </div>
      <div className="filter-small card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            {par.quotationEntities.uniqueModules.map((m) => (
              <div key={m.code} className="filter-small-module space-right">
                <h6 className="bolder">Module</h6>
                <div>
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
                    <div className="pad-left">
                      <h6 className="bolder">Activity</h6>
                      {par.quotationEntities.activities
                        .filter((a) => a.moduleCode === m.code)
                        .map((activity) => (
                          <label key={activity.id}>
                            <input
                              type="checkbox"
                              onChange={() =>
                                par.setActivityFilter(activity.id)
                              }
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
                        ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFilterSmall;
