import React, { useState } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
// import { createNewProject } from "../store/actions/actionsCreator";

const NewProject = (
  {
    /*createProject*/
  }
) => {
  //MATERIALIZE GEO SELECT INSTANCE
  let geoSelectInstance;
  React.useEffect(() => {
    let sel = document.querySelectorAll("select");
    geoSelectInstance = M.FormSelect.init(sel);
  }, []);

  const [projectName, setProjectName] = useState("");
  const [geo, setGeo] = useState({});
  //   const [siteNumber, setSiteNumber] = useState("");
  //   const [siteCodeList, setSiteCodeList] = useState("");
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState("");
  const [pmName, setPmName] = useState("");

  //   const unitCostChange = (newUnitCost) => {
  //     setUnitCost(newUnitCost);
  //     if (unitNumber) {
  //       setTotalCost(newUnitCost * unitNumber);
  //     }
  //   };

  // SUBREGION LIST OBJECT
  const subregions = {
    Caribbean: undefined,
    "Central%20America": undefined,
    "Central%20Asia": undefined,
    "Eastern%20Africa": undefined,
    "Eastern%20Asia": undefined,
    "Eastern%20Europe": undefined,
    Melanesia: undefined,
    Micronesia: undefined,
    "Middle%20Africa": undefined,
    "Northern%20Africa": undefined,
    "Northern%20America": undefined,
    "Northern%20Europe": undefined,
    Polynesia: undefined,
    "South%20America": undefined,
    "South-Eastern%20Asia": undefined,
    "Southern%20Africa": undefined,
    "Southern%20Asia": undefined,
    "Southern%20Europe": undefined,
    "Western%20Africa": undefined,
    "Western%20Asia": undefined,
    "Western%20Europe": undefined,
  };

  // URI PROXY, ENDPOINT GEO
  const proxyUrl = "https://cors-anywhere.herokuapp.com/",
    targetUrl = "https://restcountries.herokuapp.com/api/v1/subregion/";

  //DOM ELEMENTS
  const geoSelect = document.getElementById("geo");
  const loader = document.querySelector(".preloader-wrapper");

  // THE SELECTED SUBREGION
  let selectedSubregion;

  // SUBREGION CHANGE
  const subregionChange = (newSubregion) => {
    selectedSubregion = newSubregion;
    // the geo nations select is the second one in the page
    const geoSelectDD = document.querySelectorAll(".select-wrapper");

    geoSelectDD[1].classList.add("hide");
    loader.classList.remove("hide");
    geoSelect.options.length = 0;
    if (newSubregion.length === 0) {
      geoSelectDD[1].classList.remove("hide");
      loader.classList.add("hide");
      geoSelectInstance = M.FormSelect.init(geoSelect);
      return;
    }
    if (!subregions[newSubregion]) {
      fetch(proxyUrl + targetUrl + newSubregion)
        .then((response) => response.json())
        .then((data) => {
          let nationsList = [];
          data.map((nation) => {
            nationsList.push({
              cca3: nation.cca3,
              name: nation.name.common,
            });
            addNationToGeoSelect(nation.cca3, nation.name.common);
          });
          subregions[newSubregion] = nationsList;
          geoSelectInstance = M.FormSelect.init(geoSelect);
          geoSelectDD[1].classList.remove("hide");
          loader.classList.add("hide");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      subregions[newSubregion].map((nation) => {
        addNationToGeoSelect(nation.cca3, nation.name);
      });
      geoSelectInstance = M.FormSelect.init(geoSelect);
      geoSelectDD[1].classList.remove("hide");
      loader.classList.add("hide");
    }
  };

  // SELECTED GEO OBJECT
  const selectedGeo = {};

  // ADD NATION TO GEO SELECT
  const addNationToGeoSelect = (cca3, name) => {
    geoSelect.options[geoSelect.options.length] = new Option(
      `${cca3} - ${name}`,
      cca3,
      false,
      selectedGeo.hasOwnProperty(selectedSubregion) &&
        selectedGeo[selectedSubregion].includes(cca3)
    );
  };

  // GEO SELECT CHANGE
  const geoChange = () => {
    selectedGeo[selectedSubregion] = geoSelectInstance.getSelectedValues();
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
    let idx = icnId.substring(icnId.lastIndexOf("_")+1);
    let providersCopy = providers.slice();
    providersCopy.splice(idx, 1)
    setProviders(providersCopy);
  };

  const saveProject = (e) => {
      e.preventDefault();
    setGeo(selectedGeo);
    console.log(geo)
  };

  return (
    <div className="container row">
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
            name="geoRegion"
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
            <option value="Micronesia">Micronesia</option>
            <option value="Middle%20Africa">Middle Africa</option>
            <option value="Northern%20Africa">Northern Africa</option>
            <option value="Northern%20America">Northern America</option>
            <option value="Northern%20Europe">Northern Europe</option>
            <option value="Polynesia">Polynesia</option>
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
            <div className="preloader-wrapper active hide">
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
        <div id="providerList">
          <div className="input-field col s6">
            <label>Provider</label>
            <input
              className="col s10 m11"
              type="text"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            ></input>
            <a
              href="#"
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
                    <td><a
                        href="#"
                        className="right btn-floating btn-small red darken-2 waves-effect waves-light"
                        onClick={(e) => removeProvider(e)}
                        ><i id={"cancelProvider_"+idx} className="material-icons">cancel</i>
                        </a></td>
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
            >
              Create
            </button>
          </div>
      </form>
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
