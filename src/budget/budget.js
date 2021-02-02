import React from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import { getSelectedProjectId, getProject } from "../store/selectors/projectSelectors";
import { getBudget } from "../store/selectors/budgetSelectors";
import { history } from "../App";
import { selectProject, loadProjectAction } from "../store/actions/projectActions";

const Act = styled.div`{
  margin-left: 30px;
}`;

const Money = styled.span`
  color: ${prop => prop.positive ? 'green' : 'red'};
`;

const Budget = ({ selectedProjectId, chooseProject, budget, project, loadProject }) => {
  React.useEffect(() => {
    if (!selectedProjectId) {
      const query = new URLSearchParams(history.location.search);
      const queryProject = query.get('project')
      if (queryProject) {
        chooseProject(queryProject);
      }
      else {
        history.push('/');
      }
    } else {
      if (!project || project.id !== selectedProjectId) {
        loadProject(selectedProjectId);
      }
    }
  });

  return (
    <div>
      { project ?
        <div>
          <h3>Budget</h3>
          <div>Budget: {budget.budget} </div>
          <div>Incomes: {budget.incomes} </div>
          <div>Planned expenses: {budget.plannedExpenses} </div>
          <div>Expenses: {budget.expenses} </div>
          <div>Remainging budget:
            <Money positive={budget.budget - budget.incomes > 0}> {budget.budget - budget.incomes}</Money>
            {budget.budget ?
              <span> ({100 - Math.round((budget.incomes / budget.budget * 100))}%)</span>
              : <span> (0%)</span>
            }
          </div>
          <div>Remainging expenses:
            <Money positive={budget.plannedExpenses - budget.expenses > 0}> {budget.plannedExpenses - budget.expenses}</Money>
            {budget.plannedExpenses ?
              <span> ({100 - Math.round((budget.expenses / budget.plannedExpenses * 100))}%)</span>
              : <span> (0%)</span>
            }
          </div>
          <div>Net income: <Money positive={(budget.incomes - budget.expenses) > 0}> {budget.incomes - budget.expenses}</Money> </div>
          <div>Out of budget incomes: {budget.outOfBudgetIncomes} </div>
          {
            budget.modules.map(m =>
              <div key={m.code}>
                <span><b>module:</b> </span> <span> {m.title} / {m.code}</span>
                <div>Module budget: {m.budget}</div>
                <div>Module incomes: {m.incomes}</div>
                <div>Planned expenses: {m.plannedExpenses} </div>
                <div>Expenses: {m.expenses} </div>
                <div>Remainging budget:
                  <Money positive={m.budget - m.incomes > 0}> {m.budget - m.incomes}</Money>
                  {m.budget ?
                    <span> ({100 - Math.round((m.incomes / m.budget * 100))}%)</span>
                    : <span> (0%)</span>
                  }
                </div>
                <div>Remainging expenses:
                  <Money positive={m.plannedExpenses - m.expenses > 0}> {m.plannedExpenses - m.expenses}</Money>
                  {m.plannedExpenses ?
                    <span> ({100 - Math.round((m.expenses / m.plannedExpenses * 100))}%)</span>
                    : <span> (0%)</span>
                  }
                </div>
                <div>Net income: <Money positive={(m.incomes - m.expenses) > 0}> {m.incomes - m.expenses}</Money> </div>
                <Act>
                  {
                    m.activities.map(a =>
                      <div key={a.code}>
                        <span><b>activity:</b> {a.code} </span>
                        <div>Activity budget: {a.budget} </div>
                        <div>Activity incomes: {a.incomes} </div>
                        <div>Planned expenses: {a.expenses} </div>
                        <div>Activity expenses: {a.expenses} </div>
                        <div>Remainging budget:
                          <Money positive={a.budget - a.incomes > 0}> {a.budget - a.incomes}</Money>
                          {a.budget ?
                            <span> ({100 - Math.round((a.incomes / a.budget * 100))}%)</span>
                            : <span> (0%)</span>
                          }
                        </div>
                        <div>Remainging expenses:
                          <Money positive={a.plannedExpenses - a.expenses > 0}> {a.plannedExpenses - a.expenses}</Money>
                          {a.plannedExpenses ?
                            <span> ({100 - Math.round((a.expenses / a.plannedExpenses * 100))}%)</span>
                            : <span> (0%)</span>
                          }
                        </div>
                        <div>Net income: <Money positive={(a.incomes - a.expenses) > 0}> {a.incomes - a.expenses}</Money> </div>
                        <Act>
                          <div><b>Original activities: </b></div>
                          {
                            a.originalActivities.map(oa =>
                              <div key={oa.id}>
                                <div>title: {oa.title}</div>
                                <div>code: {oa.code}</div>
                                <div>quotation: {oa.quotationCode}</div>
                                {oa.provider ?
                                  <div>provider: {oa.provider}</div>
                                  : ''
                                }
                                {oa.type === "SPONSOR" ?
                                  <div>
                                    <div>budget: {oa.activityCost}</div>
                                    <div>incomes: {oa.incomes}</div>
                                    <div>Remainging budget: <Money positive={oa.activityCost - oa.incomes > 0}>{oa.activityCost - oa.incomes}</Money> ({100 - Math.round((oa.incomes / oa.activityCost * 100))}%) </div>
                                  </div> :
                                  <div>
                                    <div>planned expenses: {oa.activityCost}</div>
                                    <div>expenses: {oa.expenses}</div>
                                    <div>Remainging expenses: <Money positive={oa.activityCost - oa.expenses > 0}>{oa.activityCost - oa.expenses}</Money> ({100 - Math.round((oa.expenses / oa.activityCost * 100))}%) </div>
                                  </div>

                                }
                              </div>
                            )
                          }
                        </Act>
                      </div>
                    )
                  }
                </Act>
              </div>
            )
          }
        </div>
        : ''}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedProjectId: getSelectedProjectId(state),
    budget: getBudget(state),
    project: getProject(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
