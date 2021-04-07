import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getSelectedQuotationId,
  getQuotation,
} from "../../store/selectors/quotationSelectors";
import {
  getSelectedProjectId,
  getProject,
} from "../../store/selectors/projectSelectors";
import {
  selectProject,
  loadProjectAction,
} from "../../store/actions/projectActions";

import { selectQuotation } from "../../store/actions/quotationActions";
import { history } from "../../App";
import Preloader from "../../common/preloader";

const QuotationPrint = ({
  selectedQuotation,
  project,
  selectedProjectId,
  chooseProject,
  chooseQuotation,
  loadProject,
}) => {
  const [quotationCode, setQuotationCode] = useState("");
  
  useEffect(() => {
    const query = new URLSearchParams(history.location.search);
    const queryProject = query.get("project");
    const queryQuotation = query.get("quotation");

    if (!selectedProjectId) {
      if (queryProject) {
        chooseProject(queryProject);
      } else {
        history.push("/");
      }
    } else {
      if (!project || project.id !== selectedProjectId) {
        loadProject(selectedProjectId);
      } else {
        chooseQuotation(queryQuotation);
      }
    } 
    
    if (selectedQuotation) {
      setQuotationCode(selectedQuotation.code);
    }
  }, [project, selectedProjectId]);

  return (
    <div id="page">
      {selectedQuotation ? (
        <div id="selectedQuotation">
          <div>
            <div className="row">
              <div className="col s12" id="quotationGroup-print">
                <ul>
                  {selectedQuotation.modules.map((module) => (
                    <li key={module.id} className="module-li">
                      <div>
                        <div className="row indigo lighten-5">
                          <div className="col s10">
                            <span className="bolder">{module.title}</span>{" "}
                            {module.geo.description}
                          </div>
                          <div className="col s2 text-right price">
                              {module.moduleCost || 0}
                          </div>
                        </div>
                      </div>
                      <div className="activity-print">
                        <ul>
                          {module.activities
                            ? module.activities.map((activity) => {
                                return <li key={activity.id} className="activity-li">
                                  <div>
                                    <div className="row">
                                      <div className="col s3">
                                        <span className="italic">
                                          {activity.title}
                                        </span>
                                      </div>
                                      <div className="col s1">
                                        <span>{activity.unit}</span>
                                      </div>
                                      <div className="col s1">
                                        <div className="center">
                                         {activity.responsibilityCRO === true ? "CRO" : null}
                                         {activity.responsibilitySponsor === true ? "SPO" : null}
                                        </div>
                                      </div>
                                      <div className="col s2">
                                        <div>
                                          {activity.resources
                                            ? activity.resources.map(
                                                (resource, idx) =>
                                                  {
                                                    const add = idx < activity.resources.length -1 ? " + " : "";
                                                    return <span key={resource.id}>{resource.title}&nbsp;x&nbsp;{resource.hours}{add}</span>
                                                  }
                                              )
                                            : null}
                                          {activity.fixedCost &&
                                            activity.fixedCost !== 0
                                              ? (activity.resources.length > 0 ? " + " + activity.fixedCost : activity.fixedCost)
                                              : null}
                                        </div>
                                      </div>
                                      <div className="col s2">
                                        <div className="text-right price">
                                          {activity.unitCost || 0}
                                        </div>
                                      </div>
                                      <div className="col s1">
                                        <div className="text-right">
                                          {activity.unitNumber || 0}
                                        </div>
                                      </div>
                                      <div className="col s2">
                                        <div className="text-right price">
                                          {activity.activityCost || 0}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>;
                              })
                            : null}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="col s4">
                  <h6 className="bolder price center">
                    Price without PT: {selectedQuotation.quotationNotPTCost || 0}
                  </h6>
                </div>
                <div className="col s4">
                  <h6 className="bolder price center">
                    PT only: {selectedQuotation.quotationPTCost || 0}
                  </h6>
                </div>
                <div className="col s4">
                  <h6 className="bolder price center">
                    Quotation cost: {selectedQuotation.quotationCost || 0}
                  </h6>
                </div>
              </div>
            </div>
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
    selectedQuotation: getQuotation(state),
    project: getProject(state),
    selectedProjectId: getSelectedProjectId(state),
    selectedQuotationId: getSelectedQuotationId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    chooseQuotation: (quotationId) => dispatch(selectQuotation(quotationId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationPrint);
