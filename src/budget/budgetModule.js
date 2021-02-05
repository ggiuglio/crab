import React from "react";
import BudgetActivity from "./budgetActivity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BudgetModule = ({ module }) => {
  const getGeoIcon = (geo) => {
    if (geo) {
      let geoLower = geo.toLowerCase();
      if (geoLower.includes("africa")) {
        return "globe-africa";
      } else if (geoLower.includes("america")) {
        return "globe-americas";
      } else if (geoLower.includes("asia")) {
        return "globe-asia";
      } else if (geoLower.includes("europe")) {
        return "globe-europe";
      }
    }
    return "globe";
  };

  return (
    <li>
      <div className="collapsible-header indigo lighten-2 white-text block">
        <div className="row hide-on-med-and-up bolder">
          <div className="col s9">
            <span>{module.title}</span>&nbsp;
            <FontAwesomeIcon
              icon={getGeoIcon(module.geo.description)}
              className="white-text"
              fixedWidth
            />&nbsp;
            {module.geo.description}
          </div>
          <div className="col s3">
            <span
              className={`text-right text-darken-4 ${
                module.incomes - module.expenses > 0 ? "green-text" : "red-text"
              }`}
            >
              {module.incomes - module.expenses}
            </span>
          </div>
          <div className="col s4">
            <span className="text-right">{module.budget}</span>
          </div>
          <div className="col s4">
            <span className="text-right">{module.incomes}</span>
          </div>
          <div className="col s4">
            <span
              className={`text-right text-darken-4 ${
                module.budget - module.incomes > 0 ? "green-text" : "red-text"
              }`}
            >
              {module.budget - module.incomes}&nbsp; (
              {module.budget
                ? 100 - Math.round((module.incomes / module.budget) * 100)
                : 0}
              %)
            </span>
          </div>
          <div className="col s4">
            <span className="text-right">{module.plannedExpenses}</span>
          </div>
          <div className="col s4">
            <span className="text-right">{module.expenses}</span>
          </div>
          <div className="col s4">
            <span
              className={`text-right text-darken-4 ${
                module.plannedExpenses - module.expenses > 0
                  ? "green-text"
                  : "red-text"
              }`}
            >
              {module.plannedExpenses - module.expenses}&nbsp;(
              {module.budget
                ? 100 -
                  Math.round((module.expenses / module.plannedExpenses) * 100)
                : 0}
              %)
            </span>
          </div>
        </div>
        <div className="row hide-on-small-only bolder">
          <div className="col s4">
            <span className="bolder">{module.title}</span>&nbsp;
            <FontAwesomeIcon
              icon={getGeoIcon(module.geo.description)}
              className="white-text"
              fixedWidth
            />&nbsp;
            {module.geo.description}
          </div>
          <div className="col s6">
            <div className="row">
              <div className="col s4">
                <span className="text-right">{module.budget}</span>
              </div>
              <div className="col s4">
                <span className="text-right">{module.incomes}</span>
              </div>
              <div className="col s4">
                <span
                  className={`text-right text-darken-4 ${
                    module.budget - module.incomes > 0
                      ? "green-text"
                      : "red-text"
                  }`}
                >
                  {module.budget - module.incomes}&nbsp; (
                  {module.budget
                    ? 100 - Math.round((module.incomes / module.budget) * 100)
                    : 0}
                  %)
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col s4">
                <span className="text-right">{module.plannedExpenses}</span>
              </div>
              <div className="col s4">
                <span className="text-right">{module.expenses}</span>
              </div>
              <div className="col s4">
                <span
                  className={`text-right text-darken-4 ${
                    module.plannedExpenses - module.expenses > 0
                      ? "green-text"
                      : "red-text"
                  }`}
                >
                  {module.plannedExpenses - module.expenses}&nbsp;(
                  {module.budget
                    ? 100 -
                      Math.round(
                        (module.expenses / module.plannedExpenses) * 100
                      )
                    : 0}
                  %)
                </span>
              </div>
            </div>
          </div>
          <div className="col s2">
            <span
              className={`text-right text-darken-4 ${
                module.incomes - module.expenses > 0 ? "green-text" : "red-text"
              }`}
            >
              {module.incomes - module.expenses}
            </span>
          </div>
        </div>
      </div>
      <div className="collapsible-body">
        <ul className="collapsible">
          {module.activities
            ? module.activities.map((activity) => {
                return (
                  <BudgetActivity key={activity.code} activity={activity} />
                );
              })
            : null}
        </ul>
      </div>
    </li>
  );
};

export default BudgetModule;
