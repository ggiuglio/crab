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
  color: ${ prop => prop.positive ? 'green' : 'red' };
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
      <h3>Budget</h3>
      <div>Project budget: {budget.budget} </div>
      <div>Project incomes: {budget.incomes} </div>
      <div>Planned expenses: {budget.plannedExpenses} </div>
      <div>Expenses: {budget.expenses} </div>
      <div>Out of budget incomes: {budget.outOfBudgetIncomes} </div>
      <div>Remainging budget: <Money positive={(budget.budget - budget.incomes) > 0}>{budget.budget - budget.incomes}</Money> </div>
      <div>Net income: <Money positive={(budget.incomes - budget.expenses) > 0}>{budget.incomes - budget.expenses}</Money> </div>
      {
        budget.modules.map(m =>
          <div key={m.code}>
            <span><b>module:</b> </span> <span> {m.title} / {m.code}</span>
            <div>Module budget: {m.budget}</div>
            <div>Module incomes: {m.incomes}</div>
            {}
            <div>Remainging budget: <Money positive={(m.budget - m.incomes) > 0 }>{m.budget - m.incomes}</Money> </div>
            <Act>
              {
                m.activities.map(a =>
                  <div key={a.code}>
                    <span><b>activity:</b> {a.code} </span>
                    <div>Activity budget: {a.budget} </div>
                    <div>Activity incomes: {a.incomes} </div>
                    <div>Remainging budget: <Money positive={a.budget - a.incomes > 0}>{a.budget - a.incomes}</Money> </div>
                    <Act>
                      <div><b>Original activities:</b></div>
                      {
                        a.originalActivities.map(oa =>
                          <div key={oa.id}>
                            <div>title: {oa.title}</div>
                            <div>code: {oa.code}</div>
                            <div>budget: {oa.activityCost}</div>
                            <div>incomes: {oa.totalInvoiced}</div>
                            <div>Remainging budget: <Money positive={oa.activityCost - oa.totalInvoiced > 0}>{oa.activityCost - oa.totalInvoiced}</Money> </div>
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
