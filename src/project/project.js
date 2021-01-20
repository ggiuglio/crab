import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import Geo from "../geo/geo";
import Site from "../geo/site";
import CountrySelector from "./countrySelector";
import {
  setProjectGeos,
  setProjectTitle,
  setProjectPM,
  addProjectProvider,
  removeProjectProvider
} from "../store/actions/projectActions";
import { getSelectedProject } from "../store/selectors/projectSelectors";
import { VIEW_MODES } from "../constants/constants";

const Project = ({ project, setProjectGeos, setProjectTitle, setProjectPM, addProjectProvider, removeProjectProvider }) => {
  useEffect(() => {
    if (project) {
      let collapsible = document.querySelectorAll(".collapsible");
      M.Collapsible.init(collapsible);

      let modal = document.querySelector(".modal");
      M.Modal.init(modal);

      const selectedSites = {};
      Object.keys(project.geos).forEach(regionKey => {
        const region = project.geos[regionKey];
        Object.keys(region).forEach(geoKey => {
          const nation = region[geoKey];
          if (nation.sites && nation.sites.length > 0) {
            selectedSites[geoKey] = {
              subregion: regionKey,
              sites: nation.sites
            }
          }
        });
      })

      setSites(selectedSites);
    }
  }, [project]);
  useEffect(() => {

  }, [project])

  const [siteName, setSiteName] = useState("");
  const [sites, setSites] = useState({});
  const [provider, setProvider] = useState("");

  const checkAddSiteDisabled = !siteName || siteName.length === 0;
  const checkAddProviderDisabled = !provider || provider.length === 0;

  const setTitle = (title) => {
    setProjectTitle(title)
  }

  const setPM = (pm) => {
    setProjectPM(pm);
  }

  const addProvider = (event) => {
    event.preventDefault();
    addProjectProvider(provider);
    setProvider("");
  };

  const removeProvider = (event, id) => {
    event.preventDefault();
    removeProjectProvider(id);
  };

  const addSite = () => {
    let subregion = document.getElementById("siteSubregion").value;
    let nation = document.getElementById("siteNation").value;

    const currentGeos = project.geos;
    currentGeos[subregion][nation].sites.push({ name: siteName });
    setProjectGeos(currentGeos);

    setSiteName("");
  };

  const removeSite = (subregion, nation, idx) => {
    const currentGeos = project.geos;
    currentGeos[subregion][nation].sites.splice(idx, 1);

    setProjectGeos(currentGeos);
  };

  return (
    <div>
      { project ?
        <div className="container section row">
          <form className="white">
            <div className="input-field col s12">
             <label htmlFor="projectName" className="active">Project Name</label>
              <input
                type="text"
                name="projectName"
                value={project.title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={project.viewMode === VIEW_MODES.VIEW ? true : null}
              ></input>

            </div>
            {
              project.viewMode !== VIEW_MODES.VIEW ?
                <CountrySelector /> :
                ""
            }

            <div className="row">
              <div className="col s12">
                <ul className="collapsible">
                  <li>
                    <div className="collapsible-header">
                      <div className="center">Selected Geo</div>
                    </div>
                    <div className="collapsible-body">
                      <div className="row">

                        {Object.keys(project.geos).map((k) => (
                          <Geo
                            key={k}
                            subregion={k}
                            nations={project.geos[k]}
                            viewMode={project.viewMode}
                            classes="col s12 m6 l4"
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
                            viewMode={project.viewMode}
                            removeFunction={removeSite}
                          />
                        ))}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {
              project.viewMode !== VIEW_MODES.VIEW ?
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
                      disabled={checkAddProviderDisabled}
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
                        {project.providers.map((provider) => (
                          <tr key={provider.id}>
                            <td>{provider.title}</td>
                            <td>
                              <a
                                href="#!"
                                className="right btn-floating btn-small red darken-2 waves-effect waves-light"
                                onClick={(e) => removeProvider(e, provider.id)}
                              >
                                <i
                                  id={"cancelProvider_" + provider.id}
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
                </div> :
                <div className="row">
                  <div className="col s12">
                    <ul className="collapsible">
                      <li>
                        <div className="collapsible-header">
                          <div className="center">Providers</div>
                        </div>
                        <div className="collapsible-body">
                          <div className="row">
                            {project.providers.map(provider =>
                              <div>{provider.title}</div>
                            )}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
            }

            <div className="input-field col s12">
           <label htmlFor="pmName" className="active">PM</label> 
              <input
                type="text"
                id="pmName"
                value={project.pm}
                onChange={(e) => setPM(e.target.value)}
                disabled={project.viewMode === VIEW_MODES.VIEW ? true : null}
              ></input>
            </div>
          </form>

        </div>
        : ''
      }

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
            />
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
  );
};

const mapStateToProps = (state) => {
  return {
    project: getSelectedProject(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProjectGeos: (geos) => dispatch(setProjectGeos(geos)),
    setProjectTitle: (title) => dispatch(setProjectTitle(title)),
    setProjectPM: (pm) => dispatch(setProjectPM(pm)),
    addProjectProvider: (provider) => dispatch(addProjectProvider(provider)),
    removeProjectProvider: (providerId) => dispatch(removeProjectProvider(providerId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
