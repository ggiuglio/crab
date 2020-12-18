import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getBaseModules,
  getSelectedProjectId,
  getProject,
  getViewMode,
  getResources,
  getProfessionals
} from "../store/selectors/selector";
import {
  getSelectedQuotationId,
  getQuotation,
} from "../store/selectors/quotationSelector";
import M from "materialize-css/dist/js/materialize.min.js";
import Module from "./module";
import ResourceList from "../resource/resourceList";
import {
  selectProject,
  loadProjectAction,
} from "../store/actions/actionsCreator";
import { selectQuotation } from "../store/actions/quotationActions";
import { history } from "../App";
import { addQuotation, startNewQuotation, editSelectedQuotationCode } from "../store/actions/quotationActions";
import { QUOTATION_TYPES, VIEW_MODES } from "../store/constants/constants";
import NewModule from "./newModule";
import NewResource from "./newResource";
import Preloader from "../common/preloader";
import Provider from "./provider";

const NewQuotation = ({
  selectedQuotation,
  baseModules,
  project,
  resources,
  selectedProjectId,
  selectedQuotationId,
  chooseProject,
  chooseQuotation,
  loadProject,
  saveQuotationToDb,
  viewMode,
  editQuotationCode,
  startNewQuotation,
  professionals
}) => {

  const [quotationCode, setQuotationCode] = useState('');
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(history.location.search);
    const locationToken = history.location.pathname.split('/');
    const location = locationToken[locationToken.length - 1];
    const queryProject = query.get("project");
    const queryQuotation = query.get("quotation");
    const queryQuotationType = query.get("quotation-type");

    if (!selectedProjectId) {
      if (queryProject) {
        chooseProject(queryProject);
      }
      else {
        history.push('/');
      }
    } else {
      if (!project || project.id !== selectedProjectId) {
        loadProject(selectedProjectId);
      } else if (professionals) {
        if (!selectedQuotationId && location !== "new-quotation") {
          chooseQuotation(queryQuotation);
        }
        if (!selectedQuotationId && location == "new-quotation") {
          startNewQuotation(queryQuotationType);
        }
      }
    }

    if (selectedQuotation) {
      setQuotationCode(selectedQuotation.code);
    }
  }, [project, baseModules, selectedQuotation, professionals]);

  useEffect(() => {
    let collapsible = document.querySelectorAll(".collapsible");
    if (collapsible)
      M.Collapsible.init(collapsible, { accordion: false });
  });

  useEffect(() => {
    let unInputs = document.querySelectorAll(".unit-number-input");
    Object.keys(unInputs).map((i) => {
      unInputs[i].addEventListener(
        "click",
        (e) => {
          e.stopImmediatePropagation();
        },
        true
      );
    });

    let numberInputs = document.querySelectorAll("input[type=number]");
    Object.keys(numberInputs).map((key) => {
      numberInputs[key].onkeydown = function (e) {
        if (
          !(
            (e.keyCode > 95 && e.keyCode < 106) ||
            (e.keyCode > 47 && e.keyCode < 58) ||
            e.keyCode == 8
          )
        ) {
          return false;
        }
      };
    });
  }, [selectedQuotation]);

  const togglePeopleTable = (evt) => {
    evt.preventDefault();
    let qg = document.getElementById("quotationGroup");
    let pt = document.getElementById("peopleTable");
    let checks = document.querySelectorAll(".activityCheck");
    let rts = document.querySelectorAll(".resourcesTrigger");
    let acs = document.querySelectorAll(".activityComment");
    let qcs = document.querySelectorAll(".qtCost");
    if (pt.classList.contains("scale-out")) {
      qg.classList.remove("s12");
      qg.classList.add("s8", "m8", "l9");

      checks.forEach((check) => {
        check.classList.remove("s5", "m2");
      });
      checks.forEach((check) => {
        check.classList.add("s6", "m3");
      });

      rts.forEach((rt) => {
        rt.classList.remove("side-by-side");
      });
      rts.forEach((rt) => {
        rt.classList.add("truncate", "center");
      });

      acs.forEach((ac) => {
        ac.classList.remove("m6");
      });
      acs.forEach((ac) => {
        ac.classList.add("m4", "s-space-up");
      });

      qcs.forEach((ac) => {
        ac.classList.remove("m4");
      });

      pt.classList.remove("scale-out");
      pt.classList.add("scale-in");
    } else {
      pt.classList.remove("scale-in");
      pt.classList.add("scale-out");

      qg.classList.remove("s8", "m8", "l9");
      qg.classList.add("s12");

      checks.forEach((check) => {
        check.classList.remove("s6", "m3");
      });
      checks.forEach((check) => {
        check.classList.add("s5", "m2");
      });

      rts.forEach((rt) => {
        rt.classList.remove("truncate", "center");
      });
      rts.forEach((rt) => {
        rt.classList.add("side-by-side");
      });

      acs.forEach((ac) => {
        ac.classList.remove("m4", "s-space-up");
      });
      acs.forEach((ac) => {
        ac.classList.add("m6");
      });

      qcs.forEach((ac) => {
        ac.classList.add("m4");
      });
    }
  };

  const saveQuotation = (e) => {
    e.preventDefault();
    saveQuotationToDb();
    history.push(`/project/quotations/?project=${project.id}`)
  };

  const checkCreateDisabled = () => {
    return !selectedQuotation || !selectedQuotation.code
  };

  const editQuotationCodeInput = (code) => {
    setQuotationCode(code);
    editQuotationCode(code);
  };

  return (
    <div>
      {
        selectedQuotation ?
          <div id="selectedQuotation" className="section">
            <div>
              <form className="white" onSubmit={(e) => saveQuotation(e)}>
                <div className="container">
                  <div className="row">
                    <div className="input-field col s12">
                      <label className="active" htmlFor="quotationCode">
                        quotation code
                  </label>
                      <input
                        type="text"
                        name="quotationCode"
                        value={quotationCode}
                        onChange={(e) => editQuotationCodeInput(e.target.value)}
                        disabled={viewMode === VIEW_MODES.VIEW ? true : null}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    {
                      selectedQuotation.quotationType === "PROVIDER" ?
                        <div>
                          <Provider />
                        </div> :
                        <div>
                        </div>
                    }
                  </div>
                  {viewMode === VIEW_MODES.CREATE || viewMode === VIEW_MODES.EDIT ?
                    <NewModule />
                    : ''}
                </div>
                <div className="row">
                  <div className="col s1 offset-s11">
                    <a
                      href="#"
                      id="peopleTableTrigger"
                      onClick={(evt) => togglePeopleTable(evt)}
                    >
                      <i
                        className="material-icons indigo-text right"
                        title="People Fees Table"
                      >
                        assignment_ind
                    </i>
                    </a>
                  </div>
                </div>

                <div className="row">
                  <div className="col s12" id="quotationGroup">
                    <ul className="collapsible">
                      {selectedQuotation.modules.map((module) => (
                        <Module
                          key={module.id}
                          module={module}
                          viewMode={viewMode}
                          quotationType={selectedQuotation.quotationType}
                        />
                      ))}
                    </ul>
                    <div className="col s12 m4 l4 z-depth-1 qtCost">
                      <h6 className="bolder price center">
                        Price without PT {selectedQuotation.quotationNotPTCost || 0}
                      </h6>
                    </div>
                    <div className="col s12 m4 l4 z-depth-1 qtCost">
                      <h6 className="bolder price center">
                        PT only {selectedQuotation.quotationPTCost || 0}
                      </h6>
                    </div>
                    <div className="col s12 m4 l4 z-depth-1 qtCost">
                      <h6 className="bolder price center">
                        Quotation cost {selectedQuotation.quotationCost || 0}
                      </h6>
                    </div>
                    {viewMode === VIEW_MODES.VIEW ? null : (
                      <div className="input-field col s12 center">
                        <button
                          className="btn indigo lighten-1 z-depth-0"
                          type="submit"
                          disabled={checkCreateDisabled()}
                        >
                          Create
                    </button>
                      </div>
                    )}
                  </div>
                  <div
                    className="col s4 m4 l3 scale-transition scale-out"
                    id="peopleTable"
                  >
                    <ResourceList resources={resources} />
                  </div>
                </div>
              </form>

              {viewMode !== VIEW_MODES.VIEW ? (
                <div>
                  <NewResource />
                </div>
              ) : null}
            </div>
          </div>
          : <div className="center valign-page-center">
            <Preloader classes="preloader-wrapper big active" />
          </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedQuotation: getQuotation(state),
    baseModules: getBaseModules(state),
    project: getProject(state),
    selectedProjectId: getSelectedProjectId(state),
    selectedQuotationId: getSelectedQuotationId(state),
    viewMode: getViewMode(state),
    resources: getResources(state),
    professionals: getProfessionals(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    chooseQuotation: (quotationId) => dispatch(selectQuotation(quotationId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId)),
    saveQuotationToDb: (selectedQuotation) => dispatch(addQuotation(selectedQuotation)),
    startNewQuotation: (type) => dispatch(startNewQuotation(type)),
    editQuotationCode: (quotationCode) => dispatch(editSelectedQuotationCode(quotationCode))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuotation);
