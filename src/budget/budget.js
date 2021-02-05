import React from "react";
import { connect } from "react-redux";
import {
  getSelectedProjectId,
  getProject,
} from "../store/selectors/projectSelectors";
import { getBudget } from "../store/selectors/budgetSelectors";
import { history } from "../App";
import M from "materialize-css/dist/js/materialize.min.js";
import {
  selectProject,
  loadProjectAction,
} from "../store/actions/projectActions";
import BudgetModule from "./budgetModule";
import Preloader from "../common/preloader";

const Budget = ({
  selectedProjectId,
  chooseProject,
  budget,
  project,
  loadProject,
}) => {
  React.useEffect(() => {
    if (!selectedProjectId) {
      const query = new URLSearchParams(history.location.search);
      const queryProject = query.get("project");
      if (queryProject) {
        chooseProject(queryProject);
      } else {
        history.push("/");
      }
    } else {
      if (!project || project.id !== selectedProjectId) {
        loadProject(selectedProjectId);
      }
    }

    let collapsible = document.querySelectorAll(".collapsible");
    if (collapsible) M.Collapsible.init(collapsible, { accordion: false });
  });
  return (
    <div>
      {project ? (
        <div className="row">
          <div className="col s12">
            <div id="budget-data" className="card indigo darken-1 white-text">
              <div className="row hide-on-med-and-up bolder">
                <div className="col s6 center">
                  <h5
                    className={`text-darken-4 ${
                      budget.incomes - budget.expenses > 0
                        ? "green-text"
                        : "red-text"
                    }`}
                  >
                    {budget.incomes - budget.expenses}
                  </h5>
                </div>
                <div className="col s6 center">
                  <h5>{budget.outOfBudgetIncomes}</h5>
                </div>
                <div className="col s4">
                  <span className="text-right">{budget.budget}</span>
                </div>
                <div className="col s4">
                  <span className="text-right">{budget.incomes}</span>
                </div>
                <div className="col s4">
                  <span
                    className={`text-right text-darken-4 ${
                      budget.budget - budget.incomes > 0
                        ? "green-text"
                        : "red-text"
                    }`}
                  >
                    {budget.budget - budget.incomes}&nbsp; (
                    {budget.budget
                      ? 100 - Math.round((budget.incomes / budget.budget) * 100)
                      : 0}
                    %)
                  </span>
                </div>
                <div className="col s4">
                  <span className="text-right">{budget.plannedExpenses}</span>
                </div>
                <div className="col s4">
                  <span className="text-right">{budget.expenses}</span>
                </div>
                <div className="col s4">
                  <span
                    className={`text-right text-darken-4 ${
                      budget.plannedExpenses - budget.expenses > 0
                        ? "green-text"
                        : "red-text"
                    }`}
                  >
                    {budget.plannedExpenses - budget.expenses}&nbsp;(
                    {budget.budget
                      ? 100 -
                        Math.round(
                          (budget.expenses / budget.plannedExpenses) * 100
                        )
                      : 0}
                    %)
                  </span>
                </div>
              </div>
              <div className="row hide-on-small-only bolder">
                <div className="col s3 center">
                  <h5
                    className={`text-darken-4 ${
                      budget.incomes - budget.expenses > 0
                        ? "green-text"
                        : "red-text"
                    }`}
                  >
                    {budget.incomes - budget.expenses}
                  </h5>
                </div>
                <div className="col s6">
                  <div className="row">
                    <div className="col s4">
                      <span className="text-right">{budget.budget}</span>
                    </div>
                    <div className="col s4">
                      <span className="text-right">{budget.incomes}</span>
                    </div>
                    <div className="col s4">
                      <span
                        className={`text-right text-darken-4 ${
                          budget.budget - budget.incomes > 0
                            ? "green-text"
                            : "red-text"
                        }`}
                      >
                        {budget.budget - budget.incomes}&nbsp; (
                        {budget.budget
                          ? 100 -
                            Math.round((budget.incomes / budget.budget) * 100)
                          : 0}
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s4">
                      <span className="text-right">
                        {budget.plannedExpenses}
                      </span>
                    </div>
                    <div className="col s4">
                      <span className="text-right">{budget.expenses}</span>
                    </div>
                    <div className="col s4">
                      <span
                        className={`text-right text-darken-4 ${
                          budget.plannedExpenses - budget.expenses > 0
                            ? "green-text"
                            : "red-text"
                        }`}
                      >
                        {budget.plannedExpenses - budget.expenses}&nbsp;(
                        {budget.budget
                          ? 100 -
                            Math.round(
                              (budget.expenses / budget.plannedExpenses) * 100
                            )
                          : 0}
                        %)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col s3 center">
                  <h5>{budget.outOfBudgetIncomes}</h5>
                </div>
              </div>
            </div>
            <ul className="collapsible">
              {budget.modules.map((m) => (
                <BudgetModule key={m.code} module={m} />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="center valign-page-center">
          <Preloader classes="preloader-wrapper big active" />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProjectId: getSelectedProjectId(state),
    budget: getBudget(state),
    project: getProject(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
