import React, { useState } from "react";
import { connect } from "react-redux";
import {
  getBaseModules,
  getPeople,
  getSelectedProjectId,
  getProject,
} from "../store/selectors/selector";
import M from "materialize-css/dist/js/materialize.min.js";
import Module from "./module";
import PersonCost from "../people/personCost";
import {
  selectProject,
  loadProjectAction,
} from "../store/actions/actionsCreator";
import { history } from "../App";

const NewQuotation = ({
  baseModules,
  project,
  people,
  selectedProjectId,
  chooseProject,
  loadProject,
}) => {
  //Effective state
  const [quotation, setQuotation] = useState({
    code: "",
    status: "IP",
    validFrom: Date.now(),
    validThru: null,
    modules: [],
  });

  //Only for utility use
  const [minDate, setMinDate] = useState();
  /* Available geos per Module
    {
      module.code : [array of geo]
    }
  */
  const [availableGeos, setAvailableGeos] = useState();
  const [availableActivities, setAvailableActivities] = useState();
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedGeo, setSelectedGeo] = useState("");

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

    let statSel = document.getElementById("quotationStatus");
    M.FormSelect.init(statSel);

    if (project) {
      const projectGeos = {
        General: {
          description: "General",
        },
        ...project.geo,
      };

      if (baseModules) {
        populateModuleSelect();

        const avGeo = {};
        baseModules.map((module) => {
          avGeo[module.id] = projectGeos;
          return;
        });
        setAvailableGeos(avGeo);
      }
    }
    setDates();
  }, [project, people, baseModules]);

  React.useEffect(() => {
    setDates();
    let collapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsible, { accordion: false });
  }, [quotation, minDate]);

  React.useEffect(() => {
    const geoSel = document.getElementById("availableGeo");
    M.FormSelect.init(geoSel);
  }, [availableGeos]);

  const setDates = () => {
    let dateFrom = document.getElementById("quotationValidFrom");
    M.Datepicker.init(dateFrom, {
      format: "dd/mm/yyyy",
      parse: () => {
        return new Date(this.value);
      },
      defaultDate: quotation.validFrom,
      setDefaultDate: true,
      firstDay: 1,
      onSelect: (newDate) => quotationValidFromChange(newDate),
    });
    let dateThru = document.getElementById("quotationValidThru");
    M.Datepicker.init(dateThru, {
      format: "dd/mm/yyyy",
      parse: () => {
        return new Date(this.value);
      },
      defaultDate: quotation.validThru,
      setDefaultDate: true,
      minDate: minDate,
      firstDay: 1,
      onSelect: (newDate) => setQuotationProp("validThru", newDate),
    });
  };

  const populateModuleSelect = () => {
    const moduleSelect = document.getElementById("availableModules");
    baseModules.map((module) => {
      let opt = new Option(`${module.title}`, module.id, false, false);
      opt.setAttribute("id", `module_option_${module.id}`);
      moduleSelect.options[moduleSelect.options.length] = opt;
    });
    M.FormSelect.init(moduleSelect);
  };

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

  const printPersonCost = (person) => {
    let personC = [];
    personC.push(
      <PersonCost key={person.title} title={person.title} fee={person.fee} />
    );
    if (person.geobool) {
      Object.keys(project.geo)
        // .filter((nation) => {
        //   return !/^general$/i.test(nation);
        // })
        .map((nation) => {
          personC.push(
            <PersonCost
              key={person.title + " - " + nation}
              title={person.title + " - " + project.geo[nation].description}
              fee={person.fee}
            />
          );
        });
    }
    return personC;
  };

  console.log(availableGeos)
  console.log(baseModules)

  const setQuotationProp = (propName, propValue) => {
    setQuotation({
      ...quotation,
      [propName]: propValue,
    });
  };

  const quotationValidFromChange = (newDate) => {
    setQuotationProp("validFrom", newDate);
    let dpThru = M.Datepicker.getInstance(
      document.getElementById("quotationValidThru")
    );
    if (dpThru.date && dpThru.date < newDate) {
      setQuotationProp("validThru", newDate);
    }
    setMinDate(newDate);
  };

  const checkAddModuleDisabled = selectedModule.length === 0 || selectedGeo.length === 0;

  const addModule = (e) => {
    if(checkAddModuleDisabled) return;

    const moduleSelect = document.getElementById("availableModules");
    const geoSelect = document.getElementById("availableGeo");

    const moduleIdx = +selectedModule - 1;
    const mods = quotation.modules;
    const module = {
      ...baseModules[moduleIdx],
      geo: geoSelect.options[geoSelect.selectedIndex].text,
    };
    mods.push(module);
    setQuotation({
      ...quotation,
      modules: mods,
    });

    if (availableGeos.hasOwnProperty(selectedModule)) {
      const geosByModule = availableGeos[selectedModule];
      const {[selectedGeo]: geoToRemove, ...rest} = geosByModule;
      setAvailableGeos({ ...availableGeos, [selectedModule]: rest });
    }
    moduleSelect.selectedIndex = 0;
    M.FormSelect.init(moduleSelect);
    availableModulesChange("");
    M.FormSelect.init(geoSelect);
  };

  const availableModulesChange = (e) => {
    setSelectedModule(e);
    const geoSelect = document.getElementById("availableGeo");
    geoSelect.options.length = 0;
    if (availableGeos.hasOwnProperty(e)) {
      Object.keys(availableGeos[e]).map((geoKey) => {
        let opt = new Option(
          `${availableGeos[e][geoKey].description}`,
          geoKey,
          false,
          false
        );
        opt.setAttribute("id", `geo_option_${e}_${geoKey}`);
        geoSelect.options[geoSelect.options.length] = opt;
      });
      setSelectedGeo(geoSelect.options.length > 0 ? geoSelect.options[0].value : "");
    }
    M.FormSelect.init(geoSelect);
  };

  const saveQuotation = (e) => {
    e.preventDefault();
  };

  return (
    <div id="quotation" className="section">
      {people ? (
        <div>
          <form className="white" onSubmit={(e) => saveQuotation(e)}>
            <div className="container">
              <div className="row">
                <div className="input-field col s6">
                  <label htmlFor="quotationCode">Quotation code</label>
                  <input
                    type="text"
                    name="quotationCode"
                    value={quotation.code}
                    onChange={(e) => setQuotationProp("code", e.target.value)}
                  ></input>
                </div>

                <div className="input-field col s6">
                  <select
                    id="quotationStatus"
                    value={quotation.status}
                    onChange={(e) => setQuotationProp("status", e.target.value)}
                  >
                    <option value="IP" defaultValue>
                      In progress
                    </option>
                    <option value="IE">In evaluation</option>
                    <option value="AC">Accepted</option>
                  </select>
                  <label>Status</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <label htmlFor="quotationValidFrom">Valid from</label>
                  <input
                    type="text"
                    className="datepicker"
                    id="quotationValidFrom"
                    name="quotationValidFrom"
                  ></input>
                </div>

                <div className="input-field col s6">
                  <label htmlFor="quotationValidThru">Valid thru</label>
                  <input
                    type="text"
                    className="datepicker"
                    id="quotationValidThru"
                    name="quotationValidThru"
                  ></input>
                </div>
              </div>
              <div className="row">
                <div id="wrapper-select-modules" className="input-field col s6">
                  <select
                    id="availableModules"
                    onChange={(e) => availableModulesChange(e.target.value)}
                  >
                    <option value="" defaultValue></option>
                  </select>
                  <label>Module</label>
                </div>
                <div id="wrapper-select-geo" className="input-field col s6">
                  <select id="availableGeo" onChange={(e) => setSelectedGeo(e.target.value)}></select>
                  <label>Geo</label>
                </div>
                <div className="col s2 offset-s5">
                  <a
                    className="waves-effect waves-light btn indigo"
                    href="#!"
                    disabled={checkAddModuleDisabled}
                    onClick={(e) => addModule()}
                  >
                    Add module
                    <i className="left material-icons" title="Add module">
                      add
                    </i>
                  </a>
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
                    <Module key={module.id+"_"+module.geo} module={module} />
                  ))}
                </ul>
                <div className="col s12 m4 l4 z-depth-1 qtCost">
                  <h6 className="bolder price center">
                    Price without PT {quotation.quotationCost}
                  </h6>
                </div>
                <div className="col s12 m4 l4 z-depth-1 qtCost">
                  <h6 className="bolder price center">
                    PT only {quotation.quotationCost}
                  </h6>
                </div>
                <div className="col s12 m4 l4 z-depth-1 qtCost">
                  <h6 className="bolder price center">
                    Quotation cost {quotation.quotationCost}
                  </h6>
                </div>
              </div>
              <div
                className="col s4 m4 l3 scale-transition scale-out"
                id="peopleTable"
              >
                <div className="row">
                  <div className="col s10 offset-s1 bolder center">
                    Hourly cost
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Person</th>
                        <th>Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {people.map((person) => printPersonCost(person))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </form>
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
    baseModules: getBaseModules(state),
    project: getProject(state),
    people: getPeople(state),
    selectedProjectId: getSelectedProjectId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuotation);
