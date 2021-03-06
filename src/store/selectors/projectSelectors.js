export const getSelectedProject = (state) => state.selectedProjectData;
export const getProjects = (state) => state.projects ? mapProjectList(state.projects) : undefined;
export const getProject = (state) => state.project ? state.project : undefined;
export const getSelectedProjectId = (state) => state.selectedProjectId;
export const getRegions = (state) => mapRegions(state.regions);
export const getCountries = (state) => mapCountries(state.regions, state.selectedProjectData);
export const getSelectedCountriesInRegion = (state) => mapSelectedCountriesInRegion(state.selectedProjectData.geos, state.selectedProjectData.selectedRegion);
export const getProjectProviders = (state) => state.selectedProjectData ? state.selectedProjectData.providers : [];
export const getSelectedProjectModules = (state) => state.selectedProjectData ? mapModules(state.selectedProjectData.modules) : [];

const mapProjectList = (projects) => {
  const projectList = [];
  Object.keys(projects).forEach((k) => {
    // console.log(projects[k])
    if(projects[k].archived) return;
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
        img: `https://restcountries.eu/data/${country.cca3.toLowerCase()}.svg`,
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

const mapModules = (modules) => {
  const modulesList = [];
  if (modules) {
    Object.keys(modules).forEach(k => {
      const module = JSON.parse(JSON.stringify(modules[k]));
      module.id = k.toString();
      module.activities = mapActivity(module.activities);
      modulesList.push(module)
    })
  }
  return modulesList;
}

const mapActivity = (activities) => {
  const activitiesList = [];
  if (activities) {
    Object.keys(activities).forEach(k => {
      const activity = activities[k];
      activity.id = k.toString();
      activitiesList.push(activity)
    })
  }
  return activitiesList;
}

