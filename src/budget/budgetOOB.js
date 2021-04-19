import React from "react";
import OriginalOOBActivitySponsor from "./originalOOBActivitySponsor";
import OriginalOOBActivityProvider from "./originalOOBActivityProvider";

const BudgetOOB = ({ oob }) => {
  return (
    <li>
      <div className="collapsible-header indigo lighten-2 white-text block">
        <div className="row hide-on-med-and-up">
          <div className="col s9 bolder">
            <span>Out of budget</span>&nbsp;
          </div>
          <div className="col s3 bolder center no-wrap">
            <span title="NET INCOME">NET IN</span>&nbsp;
            <span
              className={`text-darken-4 ${oob.incomes - module.oob > 0 ? "green-text" : "red-text"
                }`}
            >
              {oob.incomes - oob.expenses}
            </span>
          </div>
          <div className="col s4 text-right">
            <span title="INCOME">IN:</span>&nbsp;<span>{oob.incomes}</span>
          </div>
          <div className="col s4 text-right">
            <span title="EXPENSES">EXP:</span>&nbsp;
            <span>{oob.expenses}</span>
          </div>
        </div>
        <div className="row hide-on-small-only">
          <div className="col s4 bolder">
            <span>Out of budget</span>&nbsp;
          </div>
          <div className="col s6">
            <div className="row">
              <div className="col s4 text-right">
              </div>
              <div className="col s4 text-right">
                <span>Income:&nbsp;{oob.incomes}</span>
              </div>
            </div>
            <div className="row">
              <div className="col s4 text-right">
              </div>
              <div className="col s4 text-right">
                <span>Expenses:&nbsp;{oob.expenses}</span>
              </div>
            </div>
          </div>
          <div className="col s2 center bolder">
            <div className="row">
              <div className="col s12">NET INCOME</div>
              <div className="col s12">
                <span
                  className={`text-right text-darken-4 ${oob.incomes - oob.expenses > 0
                    ? "green-text"
                    : "red-text"
                    }`}
                >
                  {Math.round((oob.incomes - oob.expenses) * 100) / 100}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="collapsible-body">
        <ul className="collapsible">
          <li>
            <div className="collapsible-header block">
              <div className="row indigo-text">
                <div className="col s12 m6 center">
                  <span className="bolder s-active-text">Original active</span>
                </div>
                <div className="col s12 m6 center">
                  <span className="bolder s-passive-text">
                    Original passive
                  </span>
                </div>
              </div>
            </div>
            <div className="collapsible-body">
              <div className="row">
                <div className="col s12 m6">
                  <table className="responsive-table">
                    <thead className="s-active">
                      <tr>
                        <th className="hide-on-med-and-up" title="Module">
                          Mod
                        </th>
                        <th
                          className="text-left hide-on-med-and-up"
                          title="Activity"
                        >
                          Act
                        </th>
                        <th
                          className="text-right hide-on-med-and-up"
                          title="Income"
                        >
                          Inc
                        </th>
                        <th className="hide-on-small-only">Module</th>
                        <th className="text-left hide-on-small-only">
                          Activity
                        </th>
                        <th className="text-right hide-on-small-only">
                          Income
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {oob.originalActivities
                        ? oob.originalActivities
                          .filter((oA) => {
                            return oA.type === "INCOME";
                          })
                          .map((oA, i) => {
                            return (
                              <OriginalOOBActivitySponsor
                                key={i}
                                activity={oA}
                              />
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
                <div className="col s12 m6">
                  <table className="responsive-table">
                    <thead className="s-active">
                      <tr>
                        <th className="hide-on-med-and-up" title="Sponsor">
                          Spo
                        </th>
                        <th className="hide-on-med-and-up" title="Module">
                          Mod
                        </th>
                        <th
                          className="text-left hide-on-med-and-up"
                          title="Activity"
                        >
                          Act
                        </th>
                        <th
                          className="text-right hide-on-med-and-up"
                          title="Income"
                        >
                          Inc
                        </th>
                        <th className="hide-on-small-only">Sponsor</th>
                        <th className="hide-on-small-only">Module</th>
                        <th className="text-left hide-on-small-only">
                          Activity
                        </th>
                        <th className="text-right hide-on-small-only">
                          Income
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {oob.originalActivities
                        ? oob.originalActivities
                          .filter((oA) => {
                            return oA.type === "EXPENSE";
                          })
                          .map((oA, i) => {
                            return (
                              <OriginalOOBActivityProvider
                                key={i}
                                activity={oA}
                              />
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </li>
  );
};

export default BudgetOOB;
