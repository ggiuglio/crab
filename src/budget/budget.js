import React from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import { getSelectedProjectId, getProject } from "../store/selectors/selector";
import { getBudget } from "../store/selectors/budgetSelector";
import { history } from "../App";
import { selectProject, loadProjectAction } from "../store/actions/actionsCreator";

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
      <div>Estimated cost: {budget.estimatedCost} </div>
      <div>Sustained cost: {budget.sustainedCost} </div>
      <div>Out of budget cost: {budget.outOfBudgetCost} </div>
      <div>Remainging budget: <Money positive={(budget.estimatedCost - budget.sustainedCost) > 0}>{budget.estimatedCost - budget.sustainedCost}</Money> </div>
      {
        budget.modules.map(m =>
          <div key={m.code}>
            <span><b>module:</b> </span> <span> {m.title} / {m.code}</span>
            <div>Estimated cost: {m.estimatedCost}</div>
            <div>Sustained cost: {m.sustainedCost}</div>
            {}
            <div>Remainging budget: <Money positive={(m.estimatedCost - m.sustainedCost) > 0 }>{m.estimatedCost - m.sustainedCost}</Money> </div>
            <Act>
              {
                m.activities.map(a =>
                  <div key={a.code}>
                    <span><b>activity:</b> {a.code} </span>
                    <div>Estimated cost: {a.estimatedCost} </div>
                    <div>Sustained cost: {a.sustainedCost} </div>
                    <div>Remainging budget: <Money positive={a.estimatedCost - a.sustainedCost > 0}>{a.estimatedCost - a.sustainedCost}</Money> </div>
                    <Act>
                      <div><b>Original activities:</b></div>
                      {
                        a.originalActivities.map(oa =>
                          <div key={oa.id}>
                            <div>title: {oa.title}</div>
                            <div>code: {oa.code}</div>
                            <div>esitameted cost: {oa.activityCost}</div>
                            <div>sustained cost: {oa.sustainedCost}</div>
                            <div>Remainging budget: <Money positive={oa.activityCost - oa.sustainedCost > 0}>{oa.activityCost - oa.sustainedCost}</Money> </div>
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
