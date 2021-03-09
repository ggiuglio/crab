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
import {printNumbers} from "../util/util";

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
                <div className="col s12 center">
                  <span title="NET INCOMES" className="space-right">NET INCOMES</span>&nbsp;
                  <h5
                    className={`inline-block ${
                      budget.incomes - budget.expenses > 0
                        ? "light-green-text"
                        : "red-text"
                    }`}
                  >
                    {budget.incomes - budget.expenses}
                  </h5>
                </div>
                {/* <div className="col s6 center">
                  <span title="OUT OF BUDGET INCOMES">OUT BUDG IN</span>&nbsp;
                  <h5>{budget.outOfBudgetIncomes}</h5>
                </div> */}
                <div className="col s4">
                  <h6 className="text-right">
                    <span title="BUDGET">BUDG:</span>&nbsp;{budget.budget}
                  </h6>
                </div>
                <div className="col s4">
                  <h6 className="text-right">
                    <span title="INCOMES">IN:</span>&nbsp;{budget.incomes}
                  </h6>
                </div>
                <div className="col s4">
                  <h6 className="text-right">
                    <span title="REMAINING BUDGET">REM B:</span>&nbsp;
                    <span
                      className={`${
                        budget.budget - budget.incomes > 0
                          ? "light-green-text"
                          : "red-text"
                      }`}
                    >
                      {budget.budget - budget.incomes}&nbsp; (
                      {budget.budget
                        ? printNumbers(100 -
                          Math.round((budget.incomes / budget.budget) * 100))
                        : 0}
                      %)
                    </span>
                  </h6>
                </div>
                <div className="col s4">
                  <h6 className="text-right">
                    <span title="PLANNED EXPENSES">PLAN E:</span>&nbsp;
                    {budget.plannedExpenses}
                  </h6>
                </div>
                <div className="col s4">
                  <h6 className="text-right">
                    <span title="EXPENSES">EXP:</span>&nbsp;{budget.expenses}
                  </h6>
                </div>
                <div className="col s4">
                  <h6 className="text-right">
                    <span title="REMAINING EXPENSES">REM E:</span>&nbsp;
                    <span
                      className={`${
                        budget.plannedExpenses - budget.expenses > 0
                          ? "light-green-text"
                          : "red-text"
                      }`}
                    >
                      {budget.plannedExpenses - budget.expenses}&nbsp;(
                      {budget.budget
                        ? printNumbers(100 -
                          Math.round(
                            (budget.expenses / budget.plannedExpenses) * 100)
                          )
                        : 0}
                      %)
                    </span>
                  </h6>
                </div>
              </div>
              <div className="row hide-on-small-only bolder">
                <div className="col s10">
                  <div className="row">
                    <div className="col s4 text-right">
                      <h6>Budget:&nbsp;{budget.budget}</h6>
                    </div>
                    <div className="col s4 text-right">
                      <h6>Incomes:&nbsp;{budget.incomes}</h6>
                    </div>
                    <div className="col s4 text-right">
                      <h6>
                        Remaining budget:&nbsp;
                        <span
                          className={`${
                            budget.budget - budget.incomes > 0
                              ? "light-green-text"
                              : "red-text"
                          }`}
                        >
                          {budget.budget - budget.incomes}&nbsp; (
                          {budget.budget
                            ? printNumbers(100 -
                              Math.round((budget.incomes / budget.budget) * 100))
                            : 0}
                          %)
                        </span>
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s4 text-right">
                      <h6>Planned expenses:&nbsp;{budget.plannedExpenses}</h6>
                    </div>
                    <div className="col s4 text-right">
                      <h6>Expenses:&nbsp;{budget.expenses}</h6>
                    </div>
                    <div className="col s4 text-right">
                      <h6>
                        Remaining expenses:&nbsp;
                        <span
                          className={`${
                            budget.plannedExpenses - budget.expenses > 0
                              ? "light-green-text"
                              : "red-text"
                          }`}
                        >
                          {budget.plannedExpenses - budget.expenses}&nbsp;(
                          {budget.budget
                            ? printNumbers(100 -
                              Math.round(
                                (budget.expenses / budget.plannedExpenses) * 100)
                              )
                            : 0}
                          %)
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>
                {/* <div className="col s2 center">
                  <div className="row">
                    <div className="col s12">OUT OF BUDGET INCOMES</div>
                    <div className="col s12">
                      <h5>{budget.outOfBudgetIncomes}</h5>
                    </div>
                  </div>
                </div> */}
                <div className="col s2 center">
                  <div className="row">
                    <div className="col s12">NET INCOMES</div>
                    <div className="col s12">
                      <h5
                        className={`${
                          budget.incomes - budget.expenses > 0
                            ? "light-green-text"
                            : "red-text"
                        }`}
                      >
                        {budget.incomes - budget.expenses}
                      </h5>
                    </div>
                  </div>
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
