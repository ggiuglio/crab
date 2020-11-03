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
import Person from "../people/person";
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
  const [selectedResourceId, setSelectedResourceId] = useState("");
  const [selectedResource, setSelectedResource] = useState("");
  const [resourceHours, setResourceHours] = useState("");

  const [persons, setPersons] = React.useState([]);

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
        const avGeo = {};
        baseModules.map((module) => {
          avGeo[module.id] = projectGeos;
          return;
        });
        setAvailableGeos(avGeo);
      }
    }
    setDates();

    let modal = document.querySelectorAll(".modal");
    M.Modal.init(modal);
  }, [project, people, baseModules]);

  React.useEffect(() => {
    setDates();
    let collapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsible, { accordion: false });
    console.log(quotation)
  }, [quotation, minDate]);

  React.useEffect(() => {
    const geoSel = document.getElementById("availableGeo");
    M.FormSelect.init(geoSel);

    populateModuleSelect();
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
    if (!moduleSelect) return;
    moduleSelect.options.length = 0;
    moduleSelect.options[0] = new Option("", "", true, true);
    baseModules.map((module) => {
      let opt = new Option(`${module.title}`, module.id, false, false);
      opt.setAttribute("id", `module_option_${module.id}`);
      if (
        availableGeos &&
        (!availableGeos.hasOwnProperty(module.id) ||
          Object.keys(availableGeos[module.id]).length === 0)
      ) {
        opt.setAttribute("disabled", true);
      }
      moduleSelect.options[moduleSelect.options.length] = opt;
    });
    M.FormSelect.init(moduleSelect);
  };

  const handlePersonsTableCreate = (pArray) => {
    setPersons(pArray);
  };

  const handlePersonsTableChange = (geo, personId, value, isGeoBool) => {
    const personsCopy = [...persons];
    const pIdx = personsCopy.findIndex((p) => {
      return p.id === personId && p.geo === geo;
    });
    if (pIdx != -1) {
      personsCopy[pIdx] = {
        ...personsCopy[pIdx],
        fee: value,
      };
    }
    setPersons(personsCopy);

    const mods = [...quotation.modules];

    if (isGeoBool) {
      mods
        .map((m, idx) => {
          if (m.geo === geo) return idx;
        })
        .filter((idx) => idx !== undefined)
        .map((idx) => {
          const m = { ...mods[idx] };
          recalculateResourcesCosts(m, personId, value);
        });
    } else {
      mods.map((m) => {
        recalculateResourcesCosts(m, personId, value);
      });
    }

    setQuotation({
      ...quotation,
      modules: mods,
    });
  };

  const recalculateResourcesCosts = (mod, personId, value) => {
    const activities = { ...mod.activities };
    Object.keys(activities).map((key) => {
      if (!activities[key].hasOwnProperty("resources")) return;
      const resources = activities[key].resources.map((res) => {
        if (res.resourceId === personId) {
          return {
            ...res,
            resourceHourCost: value,
            resourceCost: value * res.hours,
          };
        } else {
          return { ...res };
        }
      });
      activities[key].resources = resources;
    });
    mod.activities = activities;
  };

  function getScrollTop() {
    if (typeof window.pageYOffset !== "undefined" ) {
        // Most browsers
        return window.pageYOffset;
    }
  
    var d = document.documentElement;
    if (typeof d.clientHeight !== "undefined") {
        // IE in standards mode
        return d.scrollTop;
    }
  
    // IE in quirks mode
    return document.body.scrollTop;
}

  window.onscroll = () => {
    const peopleTable = document.getElementById("peopleTable");
    const quotationGroup = document.getElementById("quotationGroup");
    const scroll = getScrollTop();
    const groupOffset = quotationGroup.offsetTop;
    if(scroll <= groupOffset)
      peopleTable.setAttribute("style", "margin-top: 0");
    else
      peopleTable.setAttribute("style", `margin-top: ${scroll - groupOffset}px`);
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

  const setQuotationProp = (propName, propValue) => {
    setQuotation({
      ...quotation,
      [propName]: propValue,
    });
  };

  const setActivityProp = (moduleId, geo, activityId, propName, propValue) => {
    const mods = [...quotation.modules];
    const modIdx = mods.findIndex((mod) => {
      return mod.id === moduleId && mod.geo === geo;
    });
    if (modIdx != -1) {
      const activities = mods[modIdx].activities;
      if (activities && activities.hasOwnProperty(activityId)) {
        activities[activityId] = {
          ...activities[activityId],
          [propName]: propValue,
        };
        mods[modIdx].activities = activities;

        setQuotation({
          ...quotation,
          modules: mods,
        });
      }
    }
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

  const checkAddModuleDisabled =
    selectedModule.length === 0 || selectedGeo.length === 0;
  const checkAddResourceDisabled =
    selectedResourceId.length === 0 ||
    resourceHours.length === 0 ||
    resourceHours == 0;

  const addModule = (e) => {
    if (checkAddModuleDisabled) return;

    const moduleSelect = document.getElementById("availableModules");
    const geoSelect = document.getElementById("availableGeo");

    const moduleIdx = +selectedModule - 1;
    const mods = [...quotation.modules];

    let acts = {};
    Object.keys(baseModules[moduleIdx].activities).map((k) => {
      acts = {
        ...acts,
        [k]: { ...baseModules[moduleIdx].activities[k] },
      };
    });

    const module = {
      ...baseModules[moduleIdx],
      activities: acts,
      geo: geoSelect.options[geoSelect.selectedIndex].text,
    };
    mods.push(module);

    setQuotation({
      ...quotation,
      modules: mods,
    });

    if (availableGeos.hasOwnProperty(selectedModule)) {
      const geosByModule = availableGeos[selectedModule];
      const { [selectedGeo]: geoToRemove, ...rest } = geosByModule;
      setAvailableGeos({ ...availableGeos, [selectedModule]: rest });
    }
    moduleSelect.selectedIndex = 0;
    M.FormSelect.init(moduleSelect);
    availableModulesChange("");
    M.FormSelect.init(geoSelect);
  };

  const removeModule = (e, moduleId, geo) => {
    e.preventDefault();

    const mods = [...quotation.modules];
    mods.splice(mods.findIndex((mod) => {
      return mod.id === moduleId && mod.geo === geo;
    }), 1);

    setQuotation({
      ...quotation,
      modules: mods,
    });

    const avGeos = {
      ...availableGeos,
      moduleId: {
        ...avGeos[moduleId],
        
      }
    };
  }
console.log(availableGeos)
console.log(project)
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
      setSelectedGeo(
        geoSelect.options.length > 0 ? geoSelect.options[0].value : ""
      );
    }
    M.FormSelect.init(geoSelect);
  };

  const setModalResources = (
    moduleId,
    moduleTitle,
    geo,
    activityId,
    activity
  ) => {
    const resourceModule = document.getElementById("resourceModule");
    const resourceGeo = document.getElementById("resourceGeo");
    const resourceActivity = document.getElementById("resourceActivity");

    document.getElementById(
      "resourceFor"
    ).innerText = `${moduleTitle} - ${geo}: ${activity.title}`;
    resourceModule.value = moduleId;
    resourceGeo.value = geo;
    resourceActivity.value = activityId;

    initAvailableResourceSelect(
      resourceModule.value,
      resourceGeo.value,
      resourceActivity.value
    );
  };

  const initAvailableResourceSelect = (
    resourceModule,
    resourceGeo,
    resourceActivity
  ) => {
    const resSelect = document.getElementById("availableResources");
    if (!resSelect) return;
    resSelect.options.length = 0;

    const mods = [...quotation.modules];
    const modIdx = mods.findIndex((mod) => {
      return mod.id === resourceModule && mod.geo === resourceGeo;
    });
    if (modIdx != -1) {
      const activities = mods[modIdx].activities;
      if (activities && activities.hasOwnProperty(resourceActivity)) {
        const resources = activities[resourceActivity].resources || [];
        let avResources = [];
        if (resources.length === 0) {
          avResources = people;
        } else {
          let resIdArray = resources.map(({ resourceId }) => resourceId);
          avResources = people.filter((p) => {
            return !resIdArray.includes(p.id);
          });
        }
        avResources.map((res) => {
          let opt = new Option(`${res.title}`, res.id, false, false);
          resSelect.options[resSelect.options.length] = opt;
        });
        M.FormSelect.init(resSelect);
        let resId = "";
        let res = "";
        if (resSelect.options.length > 0) {
          resId = resSelect.options[0].value;
          res = resSelect.options[0].text;
        }
        setSelectedResourceId(resId);
        setSelectedResource(res);
      }
    }
  };

  const resourceChange = (value) => {
    const resSelect = document.getElementById("availableResources");
    setSelectedResourceId(value);
    setSelectedResource(resSelect.options[resSelect.selectedIndex].text);
  };

  const addResource = (e) => {
    if (checkAddResourceDisabled) return;

    const resourceModule = document.getElementById("resourceModule").value;
    const resourceGeo = document.getElementById("resourceGeo").value;
    const resourceActivity = document.getElementById("resourceActivity").value;

    handleResource(resourceModule, resourceGeo, resourceActivity);
  };

  const editResource = (
    resourceModule,
    resourceGeo,
    resourceActivity,
    resource,
    value
  ) => {
    handleResource(
      resourceModule,
      resourceGeo,
      resourceActivity,
      resource,
      value
    );
  };

  const handleResource = (
    resourceModule,
    resourceGeo,
    resourceActivity,
    resource = undefined,
    value
  ) => {
    let mods = [...quotation.modules];
    const modIdx = mods.findIndex((mod) => {
      return mod.id === resourceModule && mod.geo === resourceGeo;
    });

    if (modIdx != -1) {
      let activities = { ...mods[modIdx].activities };

      if (activities && activities.hasOwnProperty(resourceActivity)) {
        let resources = activities[resourceActivity].resources
          ? [...activities[resourceActivity].resources]
          : [];

        if (resource) {
          const resIdx = resources.findIndex((res) => {
            return res.resourceId === resource.resourceId;
          });
          if (resIdx != -1) {
            resources[resIdx] = {
              ...resources[resIdx],
              hours: value,
              resourceCost: resource.resourceHourCost * value,
            };
          }
        } else {
          const personFee = persons.filter((p) => {
            return (
              (p.id === selectedResourceId && p.geo === resourceGeo) ||
              (p.id === selectedResourceId && p.geo === "General")
            );
          });
          let person;
          switch (personFee.length) {
            case 1:
              person = personFee[0];
              break;
            case 2:
              person = personFee.filter((p) => {
                return p.geo === resourceGeo;
              })[0];
              break;
            default:
              return;
          }
          resources.push({
            resourceId: selectedResourceId,
            resourceType: selectedResource,
            resourceHourCost: person.fee,
            hours: resourceHours,
            resourceCost: person.fee * resourceHours,
          });
        }

        activities[resourceActivity].resources = resources;

        mods[modIdx].activities = activities;

        setQuotation({
          ...quotation,
          modules: mods,
        });
      }
    }

    setSelectedResourceId("");
    setSelectedResource("");
    setResourceHours("");
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
                  ></select>
                  <label>Module</label>
                </div>
                <div id="wrapper-select-geo" className="input-field col s6">
                  <select
                    id="availableGeo"
                    onChange={(e) => setSelectedGeo(e.target.value)}
                  ></select>
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
                    <Module
                      key={module.id + "_" + module.geo}
                      module={module}
                      handleModalResources={setModalResources}
                      setActivityProp={setActivityProp}
                      editResource={editResource}
                      removeModule={removeModule}
                    />
                  ))}
                </ul>
                <div className="col s12 m4 l4 z-depth-1 qtCost">
                  <h6 className="bolder price center">
                    Price without PT {quotation.quotationCostNoPt}
                  </h6>
                </div>
                <div className="col s12 m4 l4 z-depth-1 qtCost">
                  <h6 className="bolder price center">
                    PT only {quotation.quotationCostPtOnly}
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
                <Person
                  project={project}
                  people={people}
                  persons={persons}
                  handleCreate={handlePersonsTableCreate}
                  handleChange={handlePersonsTableChange}
                />
              </div>
            </div>
          </form>

          <div id="modal-resource" className="modal">
            <div className="modal-content">
              <h6 id="resourceFor"></h6>
              <div className="section">
                <div
                  id="wrapper-select-resource"
                  className="input-field col s12 m6"
                >
                  <select
                    id="availableResources"
                    onChange={(e) => resourceChange(e.target.value)}
                  ></select>
                  <label>Resource</label>
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="resourceHours">Hours</label>
                  <input
                    id="resourceHours"
                    name="resourceHours"
                    type="number"
                    min="0"
                    max="9999"
                    value={resourceHours}
                    onChange={(e) => setResourceHours(e.target.value)}
                  ></input>
                </div>
                <input
                  id="resourceModule"
                  type="text"
                  className="hide"
                  readOnly
                ></input>
                <input
                  id="resourceGeo"
                  type="text"
                  className="hide"
                  readOnly
                ></input>
                <input
                  id="resourceActivity"
                  type="text"
                  className="hide"
                  readOnly
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <a
                href="#!"
                className="modal-close waves-effect waves-indigo btn-flat"
                onClick={(e) => {
                  setSelectedResourceId("");
                  setSelectedResource("");
                  setResourceHours("");
                }}
              >
                Cancel
              </a>
              <a
                href="#!"
                className="modal-close btn green darken-1 waves-effect waves-light"
                disabled={checkAddResourceDisabled}
                onClick={(e) => addResource()}
              >
                Add
              </a>
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
