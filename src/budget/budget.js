import React from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import { getBudget, getSelectedProjectId, getProject } from "../store/selectors/selector";
import { history } from "../App";
import { selectProject, loadProjectAction } from "../store/actions/actionsCreator";

const Act = styled.div`{
  margin-left: 30px;
}`;

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

  console.log('budget component', budget);

  return (
    <div>
      <h3>Budget</h3>
      <div>Estimated cost: {budget.estimatedCost} </div>
      <div>Sustained cost: {budget.sustainedCost} </div>
      {
        budget.modules.map(m =>
          <div key={m.code}>
            <span><b>module:</b> </span> <span> {m.title} / {m.code}</span>
            <div>Estimated cost: {m.estimatedCost}</div>
            <div>Sustained cost: {m.sustainedCost}</div>
            <Act>
              {
                m.activities.map(a =>
                  <div key={a.code}>
                    <span><b>activity:</b> {a.code} </span>
                    <div>Estimated cost: {a.estimatedCost} </div>
                    <div>Sustained cost: {a.sustainedCost} </div>

                    <Act>
                      <div><b>Original activities:</b></div>
                      {
                        a.originalActivities.map(oa =>
                          <div key={oa.id}>
                            <div>title: {oa.title}</div>
                            <div>code: {oa.code}</div>
                            <div>esitameted cost: {a.activityCost}</div>
                            <div>sustained cost: {a.sustainedCost}</div>
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
