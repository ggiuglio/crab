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
  setProjectSponsor,
  addProjectProvider,
  removeProjectProvider
} from "../store/actions/projectActions";
import { getSelectedProject } from "../store/selectors/projectSelectors";
import { VIEW_MODES } from "../constants/constants";
import ProjectViewMode from "./projectViewMode";

const Project = ({ project, setProjectGeos, setProjectTitle, setProjectSponsor, setProjectPM, addProjectProvider, removeProjectProvider }) => {
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

  const [siteName, setSiteName] = useState("");
  const [sites, setSites] = useState({});
  const [provider, setProvider] = useState("");

  const checkAddSiteDisabled = !siteName || siteName.length === 0;
  const checkAddProviderDisabled = !provider || provider.length === 0;

  const setTitle = (title) => {
    setProjectTitle(title)
  }

  const setSponsor = (sponsor) => {
    setProjectSponsor(sponsor)
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
    if (currentGeos[subregion][nation].sites) {
    currentGeos[subregion][nation].sites.push({ name: siteName });
    } else {
      currentGeos[subregion][nation].sites = [{ name: siteName }];
    }

    setProjectGeos(currentGeos);
    setSiteName("");
  };

  const removeSite = (subregion, nation, idx) => {
    const currentGeos = project.geos;
    currentGeos[subregion][nation].sites.splice(idx, 1);

    setProjectGeos(currentGeos);
  };
  const titleWidth = project ? (project.viewMode === VIEW_MODES.CREATE ? "m12" : "m11") : '';

  return (
    <div>
      { project ?
        <div className="section container">
          <form className="white">
            <div className="row">
              <ProjectViewMode />
              <div className={`input-field col s12 ${titleWidth}`}>
              <label htmlFor="projectName" className="active">Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  value={project.title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={project.viewMode === VIEW_MODES.VIEW ? true : null}
                ></input>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 m6">
              <label htmlFor="projectSponsor" className="active">Sponsor</label>
                <input
                  type="text"
                  name="projectSponsor"
                  value={project.sponsor}
                  onChange={(e) => setSponsor(e.target.value)}
                  disabled={project.viewMode === VIEW_MODES.VIEW ? true : null}
                ></input>
              </div>
              <div className="input-field col s12 m6">
                <label htmlFor="pmName" className="active">PM</label> 
                <input
                  type="text"
                  id="pmName"
                  value={project.pm}
                  onChange={(e) => setPM(e.target.value)}
                  disabled={project.viewMode === VIEW_MODES.VIEW ? true : null}
                ></input>
              </div>
            </div>

            {
              project.viewMode !== VIEW_MODES.VIEW ?
                <CountrySelector /> :
                ""
            }

            <div className="row">
              <div className="col s12 m6">
                <ul className="collapsible">
                  <li className="active">
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
              <div className="col s12 m6">
                <ul className="collapsible">
                  <li className="active">
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
              <div className="row">
                <div id="providerList" className="col s12">
                  <div className="col s12 m6 no-padding">
                    <div className="input-field col s11">
                      <label htmlFor="provider">Provider</label>
                      <input
                        type="text"
                        name="provider"
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                      ></input>
                    </div>
                    <div className="col s1">
                      <a
                        href="#!"
                        className="btn-flat btn-large no-padding indigo-text"
                        onClick={(e) => addProvider(e)}
                        disabled={checkAddProviderDisabled}
                      >
                        <i className="material-icons">add</i>
                      </a>
                    </div>
                  </div>
                  <div className="col s12 m6">
                  <ul className="collapsible">
                      <li className="active">
                        <div className="collapsible-header">
                          <div className="center">Providers</div>
                        </div>
                        <div className="collapsible-body">
                          <div className="row">
                            {project.providers ? project.providers.map(provider =>
                              <span key={provider.id}>{provider.title}
                              <a href="#!" title="Remove provider" onClick={(e) => removeProvider(e, provider.id)} className="remove-site-icon">
                                <i className="tiny material-icons red-text text-darken-2">clear</i>
                              </a>
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div></div> :
                project.providers && project.providers.length > 0 ? 
                <div className="row">
                  <div className="col s12 m6">
                    <ul className="collapsible">
                      <li className="active">
                        <div className="collapsible-header">
                          <div className="center">Providers</div>
                        </div>
                        <div className="collapsible-body">
                          <div className="row">
                            {project.providers ? project.providers.map(provider =>
                              <span key={provider.id}>{provider.title}{" "}</span>
                            ) : ''}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div> : null
            }
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
    setProjectSponsor: (sponsor) => dispatch(setProjectSponsor(sponsor)),
    setProjectPM: (pm) => dispatch(setProjectPM(pm)),
    addProjectProvider: (provider) => dispatch(addProjectProvider(provider)),
    removeProjectProvider: (providerId) => dispatch(removeProjectProvider(providerId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
