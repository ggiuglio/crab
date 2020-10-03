import React from "react";
import { connect } from "react-redux";
import { getPeople, getSelectedProjectId, getSelectedQuotationId, getQuotation, getProject } from "../store/selectors/selector";
import Module from "./module";
import M from "materialize-css/dist/js/materialize.min.js";
import PersonCost from "../people/personCost";
import { selectProject, selectQuotation, loadProjectAction } from "../store/actions/actionsCreator";
import { history } from "../App";

const Quotation = ({ quotation, project, people, selectedProjectId, selectedQuotationId, chooseProject, chooseQuotation, loadProject }) => {
  React.useEffect(() => {
    if (!selectedProjectId || !selectedQuotationId) {
      const query = new URLSearchParams(history.location.search);
      const queryProject = query.get('project');
      const queryQuotation = query.get('quotation');

      if (queryProject && queryQuotation) {
        chooseQuotation(queryQuotation);
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

    if (quotation) {
      let collapsible = document.querySelectorAll(".collapsible");
      M.Collapsible.init(collapsible, { accordion: false });
    }
  });

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

      rts.forEach((rt) => { rt.classList.remove("side-by-side") });
      rts.forEach((rt) => { rt.classList.add("truncate", "center") });

      acs.forEach((ac) => { ac.classList.remove("m6") });
      acs.forEach((ac) => { ac.classList.add("m4", "s-space-up") });

      qcs.forEach((ac) => { ac.classList.remove("m4") });

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

      rts.forEach((rt) => { rt.classList.remove("truncate", "center") });
      rts.forEach((rt) => { rt.classList.add("side-by-side") });

      acs.forEach((ac) => { ac.classList.remove("m4", "s-space-up") });
      acs.forEach((ac) => { ac.classList.add("m6") });

      qcs.forEach((ac) => { ac.classList.add("m4") });
    }
  };

  const printPersonCost = (person) => {
    let personC = [];
    personC.push(<PersonCost key={person.title} title={person.title} fee={person.fee} />);
    if (person.geobool) {
      Object.keys(project.geo)
        .filter((nation) => {
          return !/^general$/i.test(nation);
        })
        .map((nation) => {
          personC.push(<PersonCost key={person.title + " - " + nation} title={person.title + " - " + nation.description} fee={person.fee} />);
        });
    }
    return personC;
  }

  return (
    <div id="quotation">
      {quotation && people ? (
        <div>
          <h5 className="center page-title">
            {quotation.code} - <span className="italic">{quotation.status}</span>
          </h5>

          <div>
            <div className="container">
              <div className="row">
                <div className="col s6 m3">VALID FROM: {quotation.startDate}</div>
                <div className="col s6 m3 offset-m6">
                  VALID THRU: {quotation.endDate}
                </div>
              </div>
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
                  {quotation.modules.map((module) => (
                    <Module key={module.id} module={module} />
                  ))}
                </ul>
                <div className="col s12 m4 l4 z-depth-1 qtCost">
                  <h6 className="bolder price center">
                    Price without PT  {quotation.quotationCost}
                  </h6>
                </div>
                <div className="col s12 m4 l4 z-depth-1 qtCost">
                  <h6 className="bolder price center">
                    PT only  {quotation.quotationCost}
                  </h6>
                </div>
                <div className="col s12 m4 l4 z-depth-1 qtCost">
                  <h6 className="bolder price center">
                    Quotation cost  {quotation.quotationCost}
                  </h6>
                </div>
              </div>
              <div
                className="col s4 m4 l3 scale-transition scale-out"
                id="peopleTable"
              >
                <div className="row">
                  <div className="col s10 offset-s1 bolder center">Hourly cost</div>
                  <table>
                    <thead>
                      <tr>
                        <th>Person</th>
                        <th>Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {people.map((person) => (
                        printPersonCost(person)
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
          <div className="center valign-page-center">
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quotation: getQuotation(state),
    project: getProject(state),
    people: getPeople(state),
    selectedProjectId: getSelectedProjectId(state),
    selectedQuotationId: getSelectedQuotationId(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    chooseQuotation: (quotationId) => dispatch(selectQuotation(quotationId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quotation);
