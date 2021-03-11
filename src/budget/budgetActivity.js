import React from "react";
import OriginalProviderActivity from "./originalProviderActivity";
import OriginalSponsorActivity from "./originalSponsorActivity";
import "./css/budget.css";
import {printNumbers} from "../util/util";

const BudgetActivity = ({ activity }) => {
  return (
    <li>
      <div className="collapsible-header block">
        <div className="row indigo-text hide-on-med-and-up">
          <div className="col s9">
            <span className="bolder">{activity.title}</span>
          </div>
          <div className="col s3 center bolder no-wrap">
            <span title="NET INCOME">NET IN</span>&nbsp;
            <span
              className={`${
                activity.incomes - activity.expenses > 0
                  ? "green-text"
                  : "red-text"
              }`}
            >
              {activity.incomes - activity.expenses}
            </span>
          </div>
          <div className="col s4 text-right">
            <span title="BUDGET">BUDG:</span>&nbsp;
            <span>{activity.budget}</span>
          </div>
          <div className="col s4 text-right">
            <span title="INCOME">IN:</span>&nbsp;
            <span>{activity.incomes}</span>
          </div>
          <div className="col s4 text-right">
            <span title="REMAINING BUDGET">REM B:</span>&nbsp;
            <span
              className={`${
                activity.budget - activity.incomes > 0
                  ? "green-text"
                  : "red-text"
              }`}
            >
              {activity.budget - activity.incomes}&nbsp; (
              {activity.budget
                ? printNumbers(100 - Math.round((activity.incomes / activity.budget) * 100))
                : 0}
              %)
            </span>
          </div>
          <div className="col s4 text-right">
            <span title="PLANNED EXPENSES">PLAN E:</span>&nbsp;
            <span>{activity.plannedExpenses}</span>
          </div>
          <div className="col s4 text-right">
            <span title="PLANNED EXPENSES">EXP:</span>&nbsp;
            <span>{activity.expenses}</span>
          </div>
          <div className="col s4 text-right">
            <span title="REMAINING EXPENSES">REM E:</span>&nbsp;
            <span
              className={`${
                activity.plannedExpenses - activity.expenses > 0
                  ? "green-text"
                  : "red-text"
              }`}
            >
              {activity.plannedExpenses - activity.expenses}&nbsp;(
              {activity.budget
                ? printNumbers(100 -
                  Math.round(
                    (activity.expenses / activity.plannedExpenses) * 100)
                  )
                : 0}
              %)
            </span>
          </div>
        </div>
        <div className="row hide-on-small-only">
          <div className="col s4 bolder">
            <span>{activity.title}</span>
          </div>
          <div className="col s6">
            <div className="row">
              <div className="col s4 text-right">
                <span>Budget:&nbsp;{activity.budget}</span>
              </div>
              <div className="col s4 text-right">
                <span>Income:&nbsp;{activity.incomes}</span>
              </div>
              <div className="col s4 text-right">
                Remaining budget:&nbsp;
                <span
                  className={`${
                    activity.budget - activity.incomes > 0
                      ? "green-text"
                      : "red-text"
                  }`}
                >
                  {activity.budget - activity.incomes}&nbsp; (
                  {activity.budget
                    ? printNumbers(100 -
                      Math.round((activity.incomes / activity.budget) * 100))
                    : 0}
                  %)
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col s4 text-right">
                <span>Planned expenses:&nbsp;{activity.plannedExpenses}</span>
              </div>
              <div className="col s4 text-right">
                <span>Expenses:&nbsp;{activity.expenses}</span>
              </div>
              <div className="col s4 text-right">
                Remaining expenses:&nbsp;
                <span
                  className={`${
                    activity.plannedExpenses - activity.expenses > 0
                      ? "green-text"
                      : "red-text"
                  }`}
                >
                  {activity.plannedExpenses - activity.expenses}&nbsp;(
                  {activity.budget
                    ? printNumbers(100 -
                      Math.round(
                        (activity.expenses / activity.plannedExpenses) * 100)
                      )
                    : 0}
                  %)
                </span>
              </div>
            </div>
          </div>
          <div className="col s2 center bolder">
            <div className="row">
              <div className="col s12">NET INCOME</div>
              <div className="col s12">
                <span
                  className={`${
                    activity.incomes - activity.expenses > 0
                      ? "green-text"
                      : "red-text"
                  }`}
                >
                  {activity.incomes - activity.expenses}
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
                        <th className="hide-on-med-and-up" title="Quotation">
                          Quot
                        </th>
                        <th
                          className="text-right hide-on-med-and-up"
                          title="Budget"
                        >
                          Budg
                        </th>
                        <th
                          className="text-right hide-on-med-and-up"
                          title="Income"
                        >
                          Inc
                        </th>
                        <th
                          className="text-right hide-on-med-and-up"
                          title="Remaining Budget (%)"
                        >
                          Rem Budg %
                        </th>
                        <th className="hide-on-small-only">Quotation</th>
                        <th className="text-right hide-on-small-only">
                          Budget
                        </th>
                        <th className="text-right hide-on-small-only">
                          Income
                        </th>
                        <th className="text-right hide-on-small-only">
                          Remaining Budget (%)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.originalActivities
                        ? activity.originalActivities
                            .filter((oA) => {
                              return oA.type === "SPONSOR";
                            })
                            .map((oA) => {
                              return (
                                <OriginalSponsorActivity
                                  key={oA.module.id + oA.id + oA.type}
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
                    <thead className="s-passive">
                      <tr>
                        <th className="hide-on-med-and-up" title="Provider">
                          Prov
                        </th>
                        <th className="hide-on-med-and-up" title="Quotation">
                          Quot
                        </th>
                        <th
                          className="text-right hide-on-med-and-up"
                          title="Planned Expenses"
                        >
                          Plan Exp
                        </th>
                        <th
                          className="text-right hide-on-med-and-up"
                          title="Expenses"
                        >
                          Exp
                        </th>
                        <th
                          className="text-right hide-on-med-and-up"
                          title="Remaining Expenses (%)"
                        >
                          Rem Exp (%)
                        </th>
                        <th className="hide-on-small-only">Provider</th>
                        <th className="hide-on-small-only">Quotation</th>
                        <th className="text-right hide-on-small-only">
                          Planned Expenses
                        </th>
                        <th className="text-right hide-on-small-only">
                          Expenses
                        </th>
                        <th className="text-right hide-on-small-only">
                          Remaining Expenses (%)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.originalActivities
                        ? activity.originalActivities
                            .filter((oA) => {
                              return oA.type === "PROVIDER";
                            })
                            .map((oA) => {
                              return (
                                <OriginalProviderActivity
                                  key={oA.module.id + oA.id + oA.type}
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

export default BudgetActivity;
