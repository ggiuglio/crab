import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import Geo from "../geo/geo";
import Site from "../geo/site/site";
import { createNewProject } from "../store/actions/actionsCreator";
import CountrySelector from "./countrySelector";
import { InitializeProject } from "../store/actions/projectActions";

const NewProject = ({ createProject, project, initializeNewProject }) => {
  //MATERIALIZE GEO SELECT INSTANCE
  useEffect(() => {
    const geoSelect = document.getElementById("geo");
    M.FormSelect.init(geoSelect);

    let collapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsible);

    let modal = document.querySelector(".modal");
    M.Modal.init(modal);

    if (!project) {
      initializeProject();
    }
  }, []);

  // SUBREGION LIST OBJECT
  const [subregionList, setSubregionList] = useState({
    "Northern%20Africa": [],
    "Western%20Africa": [],
    "Middle%20Africa": [],
    "Eastern%20Africa": [],
    "Southern%20Africa": [],
    "Northern%20America": [],
    "Central%20America": [],
    Caribbean: [],
    "South%20America": [],
    "Western%20Asia": [],
    "Central%20Asia": [],
    "Eastern%20Asia": [],
    "South-Eastern%20Asia": [],
    "Southern%20Asia": [],
    "Australia%20and%20New%20Zealand": [],
    "Northern%20Europe": [],
    "Western%20Europe": [],
    "Eastern%20Europe": [],
    "Southern%20Europe": [],
    Melanesia: [],
    // Micronesia: [],
    // Polynesia: [],
  });

  //Effective state
  const [projectName, setProjectName] = useState("");
  const [geo, setGeo] = useState({});
  const [providers, setProviders] = useState([]);
  const [pmName, setPmName] = useState("");

  //Only for utility use
  const [subregion, setSubregion] = useState("");
  const [siteName, setSiteName] = useState("");
  const [sites, setSites] = useState({});
  const [provider, setProvider] = useState("");

  // ADD PROVIDER TO LIST
  const addProvider = (event) => {
    event.preventDefault();

    if (provider.length === 0 || providers.includes(provider)) return;

    setProviders([...providers, provider]);
    setProvider("");
  };

  const removeProvider = (event) => {
    event.preventDefault();
    let icnId = event.target.id;
    let idx = icnId.substring(icnId.lastIndexOf("_") + 1);
    let providersCopy = providers.slice();
    providersCopy.splice(idx, 1);
    setProviders(providersCopy);
  };

  const checkAddSiteDisabled = !siteName || siteName.length === 0;
  const checkCreateDisabled =
    projectName.length === 0 ||
    Object.keys(geo).length === 0 ||
    providers.length === 0 ||
    pmName.length === 0;

  const addSite = () => {
    let subregion = document.getElementById("siteSubregion").value;
    let nation = document.getElementById("siteNation").value;

    if (
      !geo.hasOwnProperty(subregion) ||
      !geo[subregion].hasOwnProperty(nation)
    ) {
      console.log("error");
      return;
    }

    const siteList = sites.hasOwnProperty(nation) ? sites[nation].sites : [];
    siteList.push({ name: siteName });
    setSites({
      ...sites,
      [nation]: {
        subregion: subregion,
        sites: siteList,
      },
    });

    setGeo({
      ...geo,
      [subregion]: {
        ...geo[subregion],
        [nation]: {
          sites: [...siteList],
          name: getNationName(subregion, nation),
        },
      },
    });
    setSiteName("");
  };

  const getNationName = (subregion, nation) => {
    if (subregionList.hasOwnProperty(subregion)) {
      subregionList[subregion].map(n => {
        if (n.cca3 === nation)
          return n.name;
      });
    }

    return '';
  };

  const removeSite = (subregion, nation, idx) => {
    let sitesCopy = sites[nation].sites.slice();
    sitesCopy.splice(idx, 1);
    if (sitesCopy.length === 0) {
      delete sites[nation];
      setSites({
        ...sites,
      });
    } else {
      setSites({
        ...sites,
        [nation]: {
          sites: sitesCopy,
          subregion: subregion,
        },
      });
    }

    if (
      geo.hasOwnProperty(subregion) &&
      geo[subregion].hasOwnProperty(nation)
    ) {
      setGeo({
        ...geo,
        [subregion]: {
          ...geo[subregion],
          [nation]: {
            sites: sitesCopy,
            name: getNationName(subregion, nation),
          },
        },
      });
    }
  };

  const saveProject = (e) => {
    e.preventDefault();
    const providerObjects = [];

    for (let i = 0; i < providers.length; i++) {
      providerObjects.push({
        id: i.toString(),
        title: providers[i]
      });
    };

    const project = {
      title: projectName,
      geo: geo,
      creationDate: new Date().toLocaleString("It-it").split(",")[0],
      PM: pmName,
      status: "Open",
      providers: providerObjects
    };
    createProject(project);
  };

  const cleanUpGeoName = (name) => {
    const regex = /%20/g;
    return name.replaceAll(regex, " ");
  };

  return (
    <div>
      { project ?
        <div className="container section row">
          <form className="white" onSubmit={(e) => saveProject(e)}>
            <div className="input-field col s12">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                name="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              ></input>
            </div>

            <CountrySelector />


            <div className="row">
              <div className="col s12">
                <ul className="collapsible">
                  <li>
                    <div className="collapsible-header">
                      <div className="center">Selected Geo</div>
                    </div>
                    <div className="collapsible-body">
                      <div className="row">
                        {Object.keys(geo).map((k) => (
                          <Geo
                            key={k}
                            subregion={k}
                            nations={geo[k]}
                            classes="col s12 m6 l4"
                            cleanUpNameFunction={cleanUpGeoName}
                          />
                        ))}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <ul className="collapsible">
                  <li>
                    <div className="collapsible-header">
                      <div className="center">Sites</div>
                    </div>
                    <div className="collapsible-body">
                      <div className="row">
                        {Object.keys(sites).map((k) => (
                          <Site
                            key={k + "_sites"}
                            subregion={sites[k].subregion}
                            nation={k}
                            sites={sites[k].sites}
                            classes="col s12"
                            removeFunction={removeSite}
                          />
                        ))}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div id="providerList" className="col s12">
              <div className="input-field col s6 no-padding">
                <label htmlFor="provider">Provider</label>
                <input
                  className="col s10 m11"
                  type="text"
                  name="provider"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                ></input>
                <a
                  href="#!"
                  className="right btn-floating btn-small waves-effect waves-light indigo"
                  onClick={(e) => addProvider(e)}
                >
                  <i className="material-icons">add</i>
                </a>
              </div>
              <div className="col s6">
                <table className="centered striped">
                  <thead>
                    <tr>
                      <th>Providers</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {providers.map((provider, idx) => (
                      <tr key={provider + "_" + idx}>
                        <td>{provider}</td>
                        <td>
                          <a
                            href="#!"
                            className="right btn-floating btn-small red darken-2 waves-effect waves-light"
                            onClick={(e) => removeProvider(e)}
                          >
                            <i
                              id={"cancelProvider_" + idx}
                              className="material-icons"
                            >
                              clear
                        </i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="input-field col s12">
              <label htmlFor="pmName">PM</label>
              <input
                type="text"
                id="pmName"
                value={pmName}
                onChange={(e) => setPmName(e.target.value)}
              ></input>
            </div>
            <div className="input-field col s12 center">
              <button
                className="btn indigo lighten-1 z-depth-0"
                type="submit"
                disabled={checkCreateDisabled}
              >
                Create
          </button>
            </div>
          </form>

          <div id="modal-site" className="modal">
            <div className="modal-content">
              <h4>
                Insert site for <span id="siteNationTitle"></span>
              </h4>
              <div className="input-field">
                <label htmlFor="siteName">Site name</label>
                <input
                  name="siteName"
                  value={siteName}
                  type="text"
                  onChange={(e) => setSiteName(e.target.value)}
                ></input>
              </div>
              <input id="siteNation" type="text" className="hide" readOnly></input>
              <input
                id="siteSubregion"
                type="text"
                className="hide"
                readOnly
              ></input>
            </div>
            <div className="modal-footer">
              <a
                href="#!"
                className="modal-close waves-effect waves-indigo btn-flat"
                onClick={(e) => setSiteName("")}
              >
                Cancel
          </a>
              <a
                href="#!"
                className="modal-close btn green darken-1 waves-effect waves-light"
                disabled={checkAddSiteDisabled}
                onClick={(e) => addSite()}
              >
                Add
          </a>
            </div>
          </div>
        </div>
        : ''
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    project: getSelectedProject(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    intializeNewProject: () => dispatch(InitializeProject()),
    createProject: (project) => dispatch(createNewProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
