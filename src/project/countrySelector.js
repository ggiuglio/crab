import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import Preloader from "../common/preloader";
import { getSelectedProject } from "../store/selectors/projectSelectors";
import { setProjectGeos } from "../store/actions/projectActions";

const CountrySelector = ({ project, setNewProjectGeos }) => {
 
  useEffect(() => {
    let subSel = document.getElementById("subregion");
    M.FormSelect.init(subSel);

    const geoSelect = document.getElementById("geo");
    M.FormSelect.init(geoSelect);
  });



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
  const [geo, setGeo] = useState({});
  const [subregion, setSubregion] = useState("");
  const [sites, setSites] = useState({});

  const cleanUpGeoName = (name) => {
    const regex = /%20/g;
    return name.replaceAll(regex, " ");
  };

  // URI PROXY, ENDPOINT GEO
  const proxyUrl = "https://cors-anywhere.herokuapp.com/",
    targetUrl = "https://restcountries.herokuapp.com/api/v1/subregion/";

  // ADD NATION TO GEO SELECT
  const addNationToGeoSelect = (cca3, name, newSubregion) => {
    const geoSelect = document.getElementById("geo");
    let opt = new Option(
      `${cca3} - ${name}`,
      cca3,
      false,
      geo.hasOwnProperty(newSubregion) && geo[newSubregion].hasOwnProperty(cca3)
    );
    opt.setAttribute(
      "data-icon",
      `https://restcountries.eu/data/${cca3.toLowerCase()}.svg`
    );
    opt.setAttribute("id", `geo_option_${cca3}`);
    geoSelect.options[geoSelect.options.length] = opt;
  };

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
          //**TODO REMOVE */
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

  // GEO SELECT CHANGE
  const geoChange = () => {
    const geoSelect = document.getElementById("geo");
    let hasSubregion = geo.hasOwnProperty(subregion);
    const geoKeysArray = hasSubregion ? Object.keys(geo[subregion]) : [];
    const geoSelectedArray = M.FormSelect.getInstance(
      geoSelect
    ).getSelectedValues();
    const sitesKeysArray = Object.keys(sites).filter((k) => {
      return sites[k].subregion == subregion;
    });

    let geoObj = {};
    let geoDesc = cleanUpGeoName(subregion);

    geoSelectedArray.map((k, idx, list) => {
      if (geoKeysArray.includes(k)) {
        geoObj[k] = geo[subregion][k];
      } else {
        geoObj[k] = {
          sites: [],
          name: document.getElementById(`geo_option_${k}`).text,
        };
      }

      if (sitesKeysArray.indexOf(k) >= 0)
        sitesKeysArray.splice(sitesKeysArray.indexOf(k), 1); // For the sites rendering. The remainigs will be removed
      geoDesc += ` ${k}${list.length === idx + 1 ? "" : ","}`;
    });

    let currentGeos = geo;
    if (Object.keys(geoObj).length > 0) {
      geoObj.description = geoDesc;

    currentGeos = {
      ...geo,
      [subregion]: geoObj,
    };

    } else {
      delete currentGeos[subregion];
    }
    setGeo(currentGeos);
    setNewProjectGeos(currentGeos);

    sitesKeysArray.map((k) => {
      delete sites[k];
      setSites({ ...sites });
    });
  };


  return (
    <div className="row">
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
      <div id="wrapper-select-geo" className="input-field col s6">
        <select multiple id="geo" onChange={(e) => geoChange()}></select>
        <label>Geo</label>
        <div className="center">
          <Preloader classes="preloader-wrapper small active hide" />
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    project: getSelectedProject(state)

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewProjectGeos: (geos) => dispatch(setProjectGeos(geos)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);