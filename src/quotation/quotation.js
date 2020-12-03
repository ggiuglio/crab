import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getBaseModules,
  getPeople,
  getSelectedProjectId,
  getProject,
  getViewMode
} from "../store/selectors/selector";
import {
  getSelectedQuotationId,
  getQuotation,
} from "../store/selectors/quotationSelector";
import M from "materialize-css/dist/js/materialize.min.js";
import Module from "./module";
import Person from "../people/person";
import {
  selectProject,
  loadProjectAction,
} from "../store/actions/actionsCreator";
import { selectQuotation } from "../store/actions/quotationActions";
import { history } from "../App";
import { addQuotation, startNewQuotation, editSelectedQuotation } from "../store/actions/quotationActions";
import { QUOTATION_TYPES, VIEW_MODES } from "../store/constants/constants";
import QuotationNewModule from "./quotationNewModule";
import NewResource from "./newResource";

const NewQuotation = ({
  selectedQuotation,
  baseModules,
  project,
  people,
  selectedProjectId,
  selectedQuotationId,
  chooseProject,
  chooseQuotation,
  loadProject,
  saveQuotationToDb,
  viewMode,
  editQuotationCode,
  startNewQuotation
}) => {

  //Only for utility use
  /* Available geos per Module
    {
      module.code : [array of geo]
    }
  */
  const [quotationCode, setQuotationCode] = useState('');
  const [persons, setPersons] = useState([]);

  React.useEffect(() => {
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
      } else {
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
  }, [project, people, baseModules, selectedQuotation]);
  React.useEffect(() => {
    let collapsible = document.querySelectorAll(".collapsible");
    if (collapsible)
      M.Collapsible.init(collapsible, { accordion: false });
  });

  React.useEffect(() => {
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

  /*  function getScrollTop() {
     if (typeof window.pageYOffset !== "undefined") {
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
   } */

  /*  window.onscroll = () => {
     const peopleTable = document.getElementById("peopleTable");
     const quotationGroup = document.getElementById("quotationGroup");
     if (!peopleTable || !quotationGroup) return;
     const scroll = getScrollTop();
     const groupOffset = quotationGroup.offsetTop;
     if (scroll <= groupOffset)
       peopleTable.setAttribute("style", "margin-top: 0");
     else
       peopleTable.setAttribute(
         "style",
         `margin-top: ${scroll - groupOffset}px`
       );
   }; */

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

  // *********************
  // refactored untill here
  // *********************

  const checkCreateDisabled = () => {
    return !selectedQuotation || !selectedQuotation.code
  }

  const checkAddResourceDisabled = false;

  /*  React.useEffect(() => {
     if (viewMode !== VIEW_MODES.CREATE && selectedQuotation)
       setQuotation(selectedQuotation);
   }, [selectedQuotation]);
 
   React.useEffect(() => {
     const geoSel = document.getElementById("availableGeo");
     M.FormSelect.init(geoSel);
 
     populateModuleSelect();
   }, [availableGeos]);
 
   React.useEffect(() => {
     const actSel = document.querySelectorAll(".addActivitySelect");
     M.FormSelect.init(actSel);
   }, [availableActivities]); */

  /* const populateModuleSelect = () => {
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
  */

  /* const handlePersonsTableCreate = (pArray) => {
    setPersons(pArray);
  }; */

  /* const handlePersonsTableChange = (geo, personId, value, isGeoBool) => {
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

    const mods = [...selectedQuotation.modules];

    if (isGeoBool) {
      mods
        .map((m, idx) => {
          if (m.geo[Object.keys(m.geo)[0]].description === geo) return idx;
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

    const quot = {
      ...selectedQuotation,
      modules: mods,
    };

    //calculateAllModulesTotals(quot);
  }; */

  /*  const recalculateResourcesCosts = (mod, personId, value) => {
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
   }; */

  /* const setActivityProp = (
    moduleId,
    geo,
    activityId,
    propName,
    propValue = undefined
  ) => {
    const mods = [...selectedQuotation.modules];
    const modIdx = mods.findIndex((mod) => {
      return (
        mod.id === moduleId &&
        mod.geo[Object.keys(mod.geo)[0]].description === geo
      );
    });
    if (modIdx != -1) {
      const activities = { ...mods[modIdx].activities };
      if (activities && activities.hasOwnProperty(activityId)) {
        if (propValue !== undefined) {
          activities[activityId] = {
            ...activities[activityId],
            [propName]: propValue,
          };
        } else {
          const { [propName]: propToRemove, ...rest } = activities[activityId];
          activities[activityId] = {
            ...rest,
          };
        }

        mods[modIdx].activities = activities;

        const quot = {
          ...selectedQuotation,
          modules: mods,
        };

        if (propName === "fixedCost" || propName === "unitNumber")
          calculateChangedModuleTotals(quot, moduleId, geo);
        else setQuotation(quot);
      }
    }
  };
 */

  /*  const addModule = (e) => {
       if (checkAddModuleDisabled) return;
       const moduleSelect = document.getElementById("availableModules");
       const geoSelect = document.getElementById("availableGeo");
       const moduleIdx = +selectedModule - 1;
       const mods = [...selectedQuotation.modules];
   
       let acts = {};
       Object.keys(baseModules[moduleIdx].activities).map((k) => {
         acts = {
           ...acts,
           [k]: { ...baseModules[moduleIdx].activities[k] },
         };
       });
   
       if (availableGeos.hasOwnProperty(selectedModule)) {
         const geosByModule = availableGeos[selectedModule];
         const { [selectedGeo]: geoToRemove, ...rest } = geosByModule;
         setAvailableGeos({ ...availableGeos, [selectedModule]: rest });
   
         const module = {
           ...baseModules[moduleIdx],
           activities: acts,
           geo: {
             [selectedGeo]: geoToRemove,
           },
         };
         mods.push(module);
   
         setQuotation({
           ...selectedQuotation,
           modules: mods,
         });
       }
   
       moduleSelect.selectedIndex = 0;
       M.FormSelect.init(moduleSelect);
       availableModulesChange("");
       M.FormSelect.init(geoSelect);
     }; */

  /* const removeModule = (e, moduleId, geo) => {
    e.preventDefault();

    const mods = [...selectedQuotation.modules];
    const moduleToRemove = mods.splice(
      mods.findIndex((mod) => {
        return (
          mod.id === moduleId &&
          mod.geo[Object.keys(mod.geo)[0]].description ===
          geo[Object.keys(geo)[0]].description
        );
      }),
      1
    );

    const mods = selectedQuotation.modules.filter(mod => {
      return !(
        mod.id === moduleId &&
        mod.geo[Object.keys(mod.geo)[0]].description ===
        geo[Object.keys(geo)[0]].description
      );
    });

    const quot = {
      ...selectedQuotation,
      modules: mods,
    };

    calculateChangedModuleTotals(
      quot,
      moduleId,
      geo[Object.keys(geo)[0]].description,
      moduleToRemove[0]
    );

    const avGeos = {
      ...availableGeos,
      [moduleId]: {
        ...availableGeos[moduleId],
        ...geo,
      },
    };
    setAvailableGeos(avGeos);

    const moduleSelect = document.getElementById("availableModules");
    const geoSelect = document.getElementById("availableGeo");
    moduleSelect.selectedIndex = 0;
    M.FormSelect.init(moduleSelect);
    availableModulesChange("");
    M.FormSelect.init(geoSelect);
  }; */

  /* const availableModulesChange = (e) => {
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
 * /


 const removeActivity = (e, moduleId, geo, activityId, activity) => {
   e.preventDefault();
 
   const mods = [...selectedQuotation.modules];
   const modIdx = mods.findIndex((mod) => {
     return (
       mod.id === moduleId &&
       mod.geo[Object.keys(mod.geo)[0]].description === geo
     );
   });
   if (modIdx != -1) {
     const activities = { ...mods[modIdx].activities };
 
     const { [activityId]: activityToRemove, ...rest } = activities;
 
     mods[modIdx] = {
       ...mods[modIdx],
       activities: {
         ...rest,
       },
     };
 
     const quot = {
       ...selectedQuotation,
       modules: mods,
     };
 
     calculateChangedModuleTotals(quot, moduleId, geo);
   }
 
   const { code: code, title: title, unit: unit } = activity;
 
   let avActivitiesModule = {};
   let avActivitiesGeo = {};
   if (availableActivities.hasOwnProperty(moduleId)) {
     avActivitiesModule = { ...availableActivities[moduleId] };
     if (availableActivities[moduleId].hasOwnProperty(geo)) {
       avActivitiesGeo = { ...availableActivities[moduleId][geo] };
     }
   }
 
   setAvailableActivities({
     ...availableActivities,
     [moduleId]: {
       ...avActivitiesModule,
       [geo]: {
         ...avActivitiesGeo,
         [activityId]: {
           code: code,
           title: title,
           unit: unit,
         },
       },
     },
   });
 };
 

 /* const activityChange = (moduleId, geo, value) => {
   setSelectedActivity({
     ...selectedActivity,
     [moduleId]: {
       [geo]: value,
     },
   });
   const addActivityBtn = document.getElementById(
     "availableActivitiesButton" + moduleId + geo
   );
   if (addActivityBtn)
     value.length === 0
       ? addActivityBtn.setAttribute("disabled", "true")
       : addActivityBtn.removeAttribute("disabled");
 };
*/

  // const addActivity = (e, moduleId, geo) => {
  //   e.preventDefault();
  //   if (
  //     !selectedActivity.hasOwnProperty(moduleId) ||
  //     !selectedActivity[moduleId].hasOwnProperty(geo)
  //   )
  //     return;

  //   const activityId = selectedActivity[moduleId][geo];

  //   const mods = [...selectedQuotation.modules];
  //   const modIdx = mods.findIndex((mod) => {
  //     return (
  //       mod.id === moduleId &&
  //       mod.geo[Object.keys(mod.geo)[0]].description === geo
  //     );
  //   });
  //   if (modIdx != -1) {
  //     const activities = { ...mods[modIdx].activities };

  //     const bmods = [...baseModules];
  //     const bmodIdx = bmods.findIndex((mod) => {
  //       return mod.id === moduleId;
  //     });
  //     const bactivities = { ...bmods[bmodIdx].activities };

  //     mods[modIdx] = {
  //       ...mods[modIdx],
  //       activities: {
  //         ...activities,
  //         [activityId]: {
  //           ...bactivities[activityId],
  //         },
  //       },
  //     };

  //     setQuotation({
  //       ...selectedQuotation,
  //       modules: mods,
  //     });
  //   }

  //   if (
  //     availableActivities.hasOwnProperty(moduleId) &&
  //     availableActivities[moduleId].hasOwnProperty(geo)
  //   ) {
  //     const { [activityId]: activityToRemove, ...rest } = availableActivities[
  //       moduleId
  //     ][geo];
  //     setAvailableActivities({
  //       ...availableActivities,
  //       [moduleId]: {
  //         ...availableActivities[moduleId],
  //         [geo]: {
  //           ...rest,
  //         },
  //       },
  //     });
  //   }

  //   setSelectedActivity({
  //     ...selectedActivity,
  //     [moduleId]: {
  //       [geo]: "",
  //     },
  //   });
  // };

  /*  const setModalResources = (
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
   }; */

  /*   const initAvailableResourceSelect = (
      resourceModule,
      resourceGeo,
      resourceActivity
    ) => {
      const resSelect = document.getElementById("availableResources");
      if (!resSelect) return;
      resSelect.options.length = 0;
  
      const mods = [...selectedQuotation.modules];
      const modIdx = mods.findIndex((mod) => {
        return (
          mod.id === resourceModule &&
          mod.geo[Object.keys(mod.geo)[0]].description === resourceGeo
        );
      });
      if (modIdx != -1) {
        const activities = { ...mods[modIdx].activities };
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
      let mods = [...selectedQuotation.modules];
      const modIdx = mods.findIndex((mod) => {
        return (
          mod.id === resourceModule &&
          mod.geo[Object.keys(mod.geo)[0]].description === resourceGeo
        );
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
  
          // setQuotation({
          //   ...selectedQuotation,
          //   modules: mods,
          // });
  
          const quot = {
            ...selectedQuotation,
            modules: mods,
          };
  
          calculateChangedModuleTotals(quot, resourceModule, resourceGeo);
        }
      }
  
      setSelectedResourceId("");
      setSelectedResource("");
      setResourceHours("");
    };
  
    const removeResource = (
      e,
      resourceModule,
      resourceGeo,
      resourceActivity,
      resourceId
    ) => {
      e.preventDefault();
  
      let mods = [...selectedQuotation.modules];
      const modIdx = mods.findIndex((mod) => {
        return (
          mod.id === resourceModule &&
          mod.geo[Object.keys(mod.geo)[0]].description === resourceGeo
        );
      });
  
      if (modIdx != -1) {
        let activities = { ...mods[modIdx].activities };
  
        if (activities && activities.hasOwnProperty(resourceActivity)) {
          let resources = activities[resourceActivity].resources
            ? [...activities[resourceActivity].resources]
            : [];
  
          const filteredResources = resources.filter((res) => {
            return res.resourceId !== resourceId;
          });
  
          activities[resourceActivity].resources = filteredResources;
  
          mods[modIdx].activities = activities;
  
          // setQuotation({
          //   ...selectedQuotation,
          //   modules: mods,
          // });
  
          const quot = {
            ...selectedQuotation,
            modules: mods,
          };
  
          calculateChangedModuleTotals(quot, resourceModule, resourceGeo);
        }
      }
    }; */

  /*   const calculateChangedModuleTotals = (
      quot,
      moduleId,
      geo,
      module = undefined
    ) => {
      let mods = [...quot.modules];
      let changedModule;
      let modIdx = -1;
      if (module) {
        //remove module case
        //empty activities object to avoid unuseful calculateModuleTotals calculations
        changedModule = module;
        module.activities = {};
      } else {
        modIdx = mods.findIndex((mod) => {
          return (
            mod.id === moduleId &&
            mod.geo[Object.keys(mod.geo)[0]].description === geo
          );
        });
        if (modIdx != -1) changedModule = mods[modIdx];
      }
  
      if (!changedModule) return;
  
      let ptOnly = quot.quotationCostPtOnly || 0;
      let noPt = quot.quotationCostNoPt || 0;
      const prevModTotal = changedModule.moduleCost || 0;
  
      changedModule = calculateModuleTotals(changedModule);
  
      if (changedModule.boolpt)
        ptOnly = +ptOnly - prevModTotal + +changedModule.moduleCost;
      else noPt = +noPt - prevModTotal + +changedModule.moduleCost;
  
      if (modIdx != -1) mods[modIdx] = changedModule;
  
      setQuotation({
        ...quot,
        modules: mods,
        quotationCostPtOnly: ptOnly,
        quotationCostNoPt: noPt,
        quotationCost: +ptOnly + +noPt,
      });
    };
  
    const calculateAllModulesTotals = (quot) => {
      let ptOnly = quot.quotationCostPtOnly || 0;
      let noPt = quot.quotationCostNoPt || 0;
  
      const changedModules = quot.modules.map((m) => {
        const prevModTotal = m.moduleCost || 0;
        const module = calculateModuleTotals(m);
        if (module.boolpt) ptOnly = +ptOnly - prevModTotal + +module.moduleCost;
        else noPt = +noPt - prevModTotal + +module.moduleCost;
  
        return module;
      });
  
      setQuotation({
        ...quot,
        modules: changedModules,
        quotationCostPtOnly: ptOnly,
        quotationCostNoPt: noPt,
        quotationCost: +ptOnly + +noPt,
      });
    };
  
    const calculateModuleTotals = (m) => {
      let activities = { ...m.activities };
      let total = 0;
      Object.keys(activities).map((key) => {
        let actTotal = activities[key].fixedCost || 0;
        let resources = activities[key].resources
          ? [...activities[key].resources]
          : [];
        resources.map((r) => {
          actTotal = +actTotal + +r.resourceCost;
        });
        const activityCost = +actTotal * +activities[key].unitNumber || 0;
        activities[key] = {
          ...activities[key],
          unitCost: actTotal,
          activityCost: activityCost,
        };
        total += activityCost;
      });
  
      m = {
        ...m,
        activities: activities,
        moduleCost: total,
      };
  
      return m;
    }; 
    
    */

  // *******************
  // new implementations
  //  ****************

  const editQuotationCodeInput = (code) => {
    setQuotationCode(code);
    editQuotationCode(code);
  };

  const addResource = (e) => {

  };


  // do we need this stuff?

  const handlePersonsTableCreate = () => { }

  const handlePersonsTableChange = () => { }

  return (
    <div>
      {selectedQuotation ?
        <div id="selectedQuotation" className="section">
          {people ? (
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
                  {viewMode === VIEW_MODES.CREATE || viewMode === VIEW_MODES.EDIT ?
                    <QuotationNewModule />
                    : ''}
                </div>
                {selectedQuotation.type === QUOTATION_TYPES.SPONSOR ? (
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
                ) : null}

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
                        Price without PT {selectedQuotation.quotationCostNoPt || 0}
                      </h6>
                    </div>
                    <div className="col s12 m4 l4 z-depth-1 qtCost">
                      <h6 className="bolder price center">
                        PT only {selectedQuotation.quotationCostPtOnly || 0}
                      </h6>
                    </div>
                    <div className="col s12 m4 l4 z-depth-1 qtCost">
                      <h6 className="bolder price center">
                        selectedQuotation cost {selectedQuotation.quotationCost || 0}
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
                  {selectedQuotation.type === QUOTATION_TYPES.SPONSOR ? (
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
                        viewMode={viewMode}
                      />
                    </div>
                  ) : null}
                </div>
              </form>

              {selectedQuotation.quotationType === QUOTATION_TYPES.SPONSOR &&
                viewMode !== VIEW_MODES.VIEW ? (
                  <div>
                  <NewResource />
                  </div>
                ) : null}
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
        : ''}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedQuotation: getQuotation(state),
    baseModules: getBaseModules(state),
    project: getProject(state),
    people: getPeople(state),
    selectedProjectId: getSelectedProjectId(state),
    selectedQuotationId: getSelectedQuotationId(state),
    viewMode: getViewMode(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    chooseQuotation: (quotationId) => dispatch(selectQuotation(quotationId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId)),
    saveQuotationToDb: (selectedQuotation) => dispatch(addQuotation(selectedQuotation)),
    startNewQuotation: (type) => dispatch(startNewQuotation(type)),
    editQuotationCode: (quotationCode) => dispatch(editSelectedQuotation(quotationCode))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuotation);
