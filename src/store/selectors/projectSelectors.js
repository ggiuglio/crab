export const getSelectedProject = (state) => state.selectedProjectData;
export const getProjects = (state) => state.projects ? mapProjectList(state.projects) : undefined;
export const getProject = (state) => state.project ? state.project : undefined;
export const getSelectedProjectId = (state) => state.selectedProjectId;
export const getRegions = (state) => mapRegions(state.regions);
export const getCountries = (state) => mapCountries(state.regions, state.selectedProjectData);
export const getSelectedCountriesInRegion = (state) => mapSelectedCountriesInRegion(state.selectedProjectData.geos, state.selectedProjectData.selectedRegion);
export const getProjectProviders = (state) => state.selectedProjectData ? state.selectedProjectData.providers : [];


const mapProjectList = (projects) => {
  const projectList = [];
  Object.keys(projects).forEach((k) => {
    projectList.push(projects[k]);
  });

  return projectList.reverse();
};

const mapRegions = (regions) => {
  const regionList = [{ code: "-1", name: "Select region" }];
  if (regions) {
    Object.keys(regions).forEach(k => {
      const region = {
        name: regions[k].name,
        code: regions[k].code
      };
      regionList.push(region);
    });
  }
  return regionList;
}

const mapCountries = (regions, project) => {
  const countryList = []
  if (regions && project && project.selectedRegion) {
    const myRegion = regions[project.selectedRegion.code];
    myRegion.countries.forEach(country => {
      const countrySelected = project.geos[project.selectedRegion.code] && project.geos[project.selectedRegion.code][country.cca3] ? true : false;
      countryList.push({
        name: country.common,
        code: country.cca3,
        img:  `https://restcountries.eu/data/${country.cca3.toLowerCase()}.svg`,
        selected: countrySelected
      });
    })
  
  }

  return countryList;
}

const mapSelectedCountriesInRegion = (geos, region) => {
  const countryCodes = [];
  if (geos && region && geos[region.code]) {
    Object.keys(geos[region.code]).forEach(k => {
      if (k !== "description") {
        countryCodes.push(k)
      }
    });
  }

  return countryCodes;
};
