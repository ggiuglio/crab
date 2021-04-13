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
        <div>
          <div className="row">
            <div className="col s12">Introduction:</div>
            <div className="box col s12">
              Qui ci va una descrizione della company che emette il preventivo e
              gli identificativi di preventivo (nome sponsor, codice progetto)
            </div>
          </div>
          <div className="row">
            <div className="col s12">Scenario:</div>
            <div className="box col s12">
              Qui va inserito un campo testuale che dovrebbe essere preso dalla
              definizione del progetto. Non lo abbiamo mai inserito ma dovremmo
              avere un campo che permetta di definire uno scenario di progetto.
            </div>
          </div>
          <div id="selectedQuotation">
            <div className="row">
              <div className="col s12" id="quotationGroup-print">
                <ul>
                  {selectedQuotation.modules.map((module) => (
                    <li key={module.id} className="module-li">
                      <div className="row indigo lighten-5">
                        <div className="col s10">
                          <span className="bolder">{module.title}</span>{" "}
                          {module.geo.description}
                        </div>
                        <div className="col s2 text-right price">
                          {module.moduleCost || 0}
                        </div>
                      </div>
                      <div className="activity-print">
                        {module.activities ? (
                          <ul>
                            <li
                              key={`${module.id}-activity-li`}
                              className="activity-li grey lighten-4 bolder"
                            >
                              <div className="row">
                                <div className="col s4">Activity name</div>
                                <div className="col s1">Type</div>
                                <div className="col s2">Cost specifics</div>
                                <div className="col s2">
                                  <div className="text-right">Unit cost</div>
                                </div>
                                <div className="col s1">
                                  <div className="text-right">Unit n.</div>
                                </div>
                                <div className="col s2">
                                  <div className="text-right">Total budget</div>
                                </div>
                              </div>
                            </li>
                            {module.activities.map((activity) => {
                              return (
                                <li key={activity.id} className="activity-li">
                                  <div className="row">
                                    <div className="col s4">
                                      <span className="italic">
                                        {activity.title}
                                      </span>
                                    </div>
                                    <div className="col s1">
                                      <span>{activity.unit}</span>
                                    </div>
                                    <div className="col s2">
                                      <div>
                                        {activity.resources
                                          ? activity.resources.map(
                                              (resource, idx) => {
                                                const add =
                                                  idx <
                                                  activity.resources.length - 1
                                                    ? " + "
                                                    : "";
                                                return (
                                                  <span key={resource.id}>
                                                    {resource.title}
                                                    &nbsp;x&nbsp;
                                                    {resource.hours}
                                                    {add}
                                                  </span>
                                                );
                                              }
                                            )
                                          : null}
                                        {activity.fixedCost &&
                                        activity.fixedCost !== 0
                                          ? activity.resources.length > 0
                                            ? " + " + activity.fixedCost
                                            : activity.fixedCost
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
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col s12">Costs summary</div>
              <div className="box col s4">
                <h6 className="bolder price">
                  Price without PT: {selectedQuotation.quotationNotPTCost || 0}
                </h6>
              </div>
              <div className="box col s4">
                <h6 className="bolder price">
                  PT only: {selectedQuotation.quotationPTCost || 0}
                </h6>
              </div>
              <div className="box col s4">
                <h6 className="bolder price">
                  Quotation cost: {selectedQuotation.quotationCost || 0}
                </h6>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">Other notes:</div>
            <div className="box col s12"></div>
          </div>
          <div className="row">
            <div className="col s12">Terms of payments:</div>
            <div className="box col s12"></div>
          </div>
          <div className="row signature">
            <div className="col s12">Signatures:</div>
            <div className="col s5">Per Sintesi Research</div>
            <div className="col s5 offset-s1">Per {project.sponsor}</div>
            <div className="col s12 empty-field"></div>
            <div className="col s5">
              <div className="row">
                <div className="col s2 center">Data</div>
                <div className="col s10 underline empty-field"></div>
              </div>
            </div>
            <div className="col s5 offset-s1">
              <div className="row">
                <div className="col s2 center">Data</div>
                <div className="col s10 underline empty-field"></div>
              </div>
            </div>
            <div className="col s5">
              <div className="row">
                <div className="col s2 center">Firma</div>
                <div className="col s10 underline empty-field"></div>
              </div>
            </div>
            <div className="col s5 offset-s1">
              <div className="row">
                <div className="col s2 center">Firma</div>
                <div className="col s10 underline empty-field"></div>
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
