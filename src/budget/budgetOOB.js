import React from "react";
import OriginaOOBActivity from "./originalOOBActivity";

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
          {
            oob.originalActivities.map((oa, i) =>
              <OriginaOOBActivity key={i} activity={oa} />
            )
          }
        </ul>
      </div>
    </li>
  );
};

export default BudgetOOB;
