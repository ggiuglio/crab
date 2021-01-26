import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { getRegions, getCountries, getSelectedProject, getSelectedCountriesInRegion } from "../store/selectors/projectSelectors";
import { selectProjectRegion, setProjectGeos } from "../store/actions/projectActions";

const CountrySelector = ({ project, setNewProjectGeos, regions, countries, selectNewProjectRegion, selectedCountriesInRegion }) => {
  const [geoSelect, setGeoSelect] = useState({});
  useEffect(() => {
    M.AutoInit();
    const select = document.getElementById("geo");
    setGeoSelect(M.FormSelect.init(select));
  }, [project]);

  const selectRegion = (regionCode) => {
    if (regionCode != "-1") {
      const region = regions.find(r => r.code === regionCode);
      selectNewProjectRegion(region);
    }
  }

  const selectCountry = () => {
    const selectedCodes = geoSelect.getSelectedValues();
    let currentGeos = JSON.parse(JSON.stringify(project.geos));

    if (selectedCodes.length > 0) {
      const selectedCountries = { description: `${project.selectedRegion.name} -` };
      selectedCodes.forEach(code => {
        const country = countries.find(c => c.code === code);
        selectedCountries[code] = { name: `${country.code} - ${country.name}`, sites: [] }
        selectedCountries.description += ` ${country.code}`
      });
      currentGeos[project.selectedRegion.code] = selectedCountries;

      M.toast({html: 'Please, click on the highlighted GEO name to add a site!', classes: 'rounded amber lighten-1 black-text bolder', displayLength: 2000});
    } else if (currentGeos[project.selectedRegion.code]) {
      delete currentGeos[project.selectedRegion.code];
    }

    setNewProjectGeos(currentGeos);
  }

  return (
    <div className="row">
      <div className="input-field col s6">
        <select
          id="subregion"
          className="browser-default"
          value={project.selectedRegion ? project.selectedRegion.code : "-1"}
          onChange={(e) => selectRegion(e.target.value)}
        >
          {
            regions.map(r => <option key={r.code} value={r.code}>
              {r.name}
            </option>)
          }

        </select>
        <label className="active">Geo subregion</label>
      </div>

      <div className="input-field col s6">
        <div id="wrapper-select-geo" className="multi-select-wrapper">
          <select multiple id="geo" onChange={() => selectCountry()} value={selectedCountriesInRegion}>
            {
              countries.map(country =>
                <option key={country.code} value={country.code} data-icon={country.img}>
                  {country.name}
                </option>
              )
            }
          </select>
          <label>Geo</label>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    project: getSelectedProject(state),
    regions: getRegions(state),
    countries: getCountries(state),
    selectedCountriesInRegion: getSelectedCountriesInRegion(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewProjectGeos: (geos) => dispatch(setProjectGeos(geos)),
    selectNewProjectRegion: (region) => dispatch(selectProjectRegion(region))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);