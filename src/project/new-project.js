import React, { useState } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import Geo from "../geo/geo";
import Site from "../geo/site/site";
// import { createNewProject } from "../store/actions/actionsCreator";

const NewProject = (
  {
    /*createProject*/
  }
) => {
  //MATERIALIZE GEO SELECT INSTANCE
  React.useEffect(() => {
    let subSel = document.getElementById("subregion");
    M.FormSelect.init(subSel);
    const geoSelect = document.getElementById("geo");
    M.FormSelect.init(geoSelect);

    let collapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsible);

    let modal = document.querySelector(".modal");
    M.Modal.init(modal);
  }, []);

  const [projectName, setProjectName] = useState("");
  const [subregion, setSubregion] = useState("");
  const [geo, setGeo] = useState({});
  const [siteName, setSiteName] = useState("");
  const [sites, setSites] = useState({});
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState("");
  const [pmName, setPmName] = useState("");

  // SUBREGION LIST OBJECT
  const [subregionList, setSubregionList] = useState({
    "Australia%20and%20New%20Zealand": [],
    Caribbean: [],
    "Central%20America": [],
    "Central%20Asia": [],
    "Eastern%20Africa": [],
    "Eastern%20Asia": [],
    "Eastern%20Europe": [],
    Melanesia: [],
    // Micronesia: [],
    "Middle%20Africa": [],
    "Northern%20Africa": [],
    "Northern%20America": [],
    "Northern%20Europe": [],
    // Polynesia: [],
    "South%20America": [],
    "South-Eastern%20Asia": [],
    "Southern%20Africa": [],
    "Southern%20Asia": [],
    "Southern%20Europe": [],
    "Western%20Africa": [],
    "Western%20Asia": [],
    "Western%20Europe": [],
  });

  // URI PROXY, ENDPOINT GEO
  const proxyUrl = "https://cors-anywhere.herokuapp.com/",
    targetUrl = "https://restcountries.herokuapp.com/api/v1/subregion/";

  // SUBREGION CHANGE
  const subregionChange = (newSubregion) => {
    //DOM ELEMENTS
    const geoSelect = document.getElementById("geo");
    const loader = document.querySelector(".preloader-wrapper");

    setSubregion(newSubregion);
    // the geo nations select is the second one in the page
    const geoSelectDD = document.querySelectorAll(".select-wrapper");

    geoSelectDD[1].classList.add("hide");
    loader.classList.remove("hide");
    geoSelect.options.length = 0;
    if (newSubregion.length === 0) {
      geoSelectDD[1].classList.remove("hide");
      loader.classList.add("hide");
      M.FormSelect.init(geoSelect);
      return;
    }
    if (subregionList[newSubregion].length === 0) {
      fetch(proxyUrl + targetUrl + newSubregion)
        .then((response) => response.json())
        .then((data) => {
          let nationsList = [];
          data.map((nation) => {
            nationsList.push({
              cca3: nation.cca3,
              name: nation.name.common,
            });
            addNationToGeoSelect(nation.cca3, nation.name.common, newSubregion);
          });
          setSubregionList({ ...subregionList, [newSubregion]: nationsList });
          M.FormSelect.init(geoSelect);
          geoSelectDD[1].classList.remove("hide");
          loader.classList.add("hide");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else {
      subregionList[newSubregion].map((nation) => {
        addNationToGeoSelect(nation.cca3, nation.name, newSubregion);
      });
      M.FormSelect.init(geoSelect);
      geoSelectDD[1].classList.remove("hide");
      loader.classList.add("hide");
    }
  };

  // ADD NATION TO GEO SELECT
  const addNationToGeoSelect = (cca3, name, newSubregion) => {
    const geoSelect = document.getElementById("geo");
    let opt = new Option(
      `${cca3} - ${name}`,
      cca3,
      false,
      geo.hasOwnProperty(newSubregion) && geo[newSubregion].includes(cca3)
    );
    opt.setAttribute(
      "data-icon",
      `https://restcountries.eu/data/${cca3.toLowerCase()}.svg`
    );
    geoSelect.options[geoSelect.options.length] = opt;
  };

  // GEO SELECT CHANGE
  const geoChange = () => {
    const geoSelect = document.getElementById("geo");
    setGeo({
      ...geo,
      [subregion]: M.FormSelect.getInstance(geoSelect).getSelectedValues(),
    });
  };

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

  const checkDisabled = !siteName || siteName.length === 0;

  const addSite = () => {
    let nation = document.getElementById("siteNation").value;
    const siteList = sites.hasOwnProperty(nation) ? sites[nation].sites : [];
    siteList.push({ name: siteName });
    setSites({
      ...sites,
      [nation]: {
        sites: siteList,
      },
    });
    setSiteName("");
  };

  const removeSite = (nation, idx) => {
    let sitesCopy = sites[nation].sites.slice();
    sitesCopy.splice(idx, 1);
    if (sitesCopy.length === 0) delete sites[nation];
    else {
      setSites({
        ...sites,
        [nation]: {
          sites: sitesCopy,
        },
      });
    }
  };

  const saveProject = (e) => {
    e.preventDefault();
    console.log(projectName);
    console.log(geo);
    console.log(sites);
    console.log(providers);
    console.log(pmName);
  };

  return (
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
        <div className="input-field col s6">
          <select
            id="subregion"
            onChange={(e) => subregionChange(e.target.value)}
          >
            <option value="" defaultValue>
              No Subregion
            </option>
            <option value="Australia%20and%20New%20Zealand">
              Australia and New Zealand
            </option>
            <option value="Caribbean">Caribbean</option>
            <option value="Central%20America">Central America</option>
            <option value="Central%20Asia">Central Asia</option>
            <option value="Eastern%20Africa">Eastern Africa</option>
            <option value="Eastern%20Asia">Eastern Asia</option>
            <option value="Eastern%20Europe">Eastern Europe</option>
            <option value="Melanesia">Melanesia</option>
            {/* <option value="Micronesia">Micronesia</option> */}
            <option value="Middle%20Africa">Middle Africa</option>
            <option value="Northern%20Africa">Northern Africa</option>
            <option value="Northern%20America">Northern America</option>
            <option value="Northern%20Europe">Northern Europe</option>
            {/* <option value="Polynesia">Polynesia</option> */}
            <option value="South%20America">South America</option>
            <option value="South-Eastern%20Asia">South-Eastern Asia</option>
            <option value="Southern%20Africa">Southern Africa</option>
            <option value="Southern%20Asia">Southern Asia</option>
            <option value="Southern%20Europe">Southern Europe</option>
            <option value="Western%20Africa">Western Africa</option>
            <option value="Western%20Asia">Western Asia</option>
            <option value="Western%20Europe">Western Europe</option>
          </select>
          <label>Geo subregion</label>
        </div>
        <div className="input-field col s6">
          <div className="center">
            <div className="preloader-wrapper small active hide">
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
          <select multiple id="geo" onChange={(e) => geoChange()}></select>
          <label>Geo</label>
        </div>

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
          <button className="btn indigo lighten-1 z-depth-0" type="submit">
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
            disabled={checkDisabled}
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    // createProject: (project) => dispatch(createNewProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
