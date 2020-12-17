export const getUser = (state) => state.user;
export const getLoginError = (state) => state.loginError;
export const getProjects = (state) => state.projects ? mapProjectList(state.projects) : undefined;
export const getProject = (state) => state.project ? state.project : undefined;
export const getSelectedProjectId = (state) => state.selectedProjectId;
export const getShowNewInvoice = (state) => state.showNewInvoice;
export const getBaseModules = (state) => mapBaseModules(state.baseModules);
export const getBaseModulesWithActivitiesAsList = (state) => mapBaseModulesWithActivitiesAsList(state.baseModules);
export const getViewMode = (state) => state.viewMode;
export const getResources = (state) => state.selectedQuotationData ? mapResourcesToList(state.selectedQuotationData) : [];
export const getProfessionals = (state) => state.professionals;

const mapProjectList = (projects) => {
  const projectList = [];
  Object.keys(projects).forEach((k) => {
    projectList.push(projects[k]);
  });

  return projectList.reverse();
};

const mapBaseModules = (modules) => {
  const moduleList = [];
  if (modules) {
    Object.keys(modules).forEach((k) => {
      const module = JSON.parse(JSON.stringify(modules[k]));
      module.id = k;
      moduleList.push(module);
    });
  }

  return moduleList;
};

const mapBaseModulesWithActivitiesAsList = (modules) => {
  const moduleList = [];
  if (modules) {
    Object.keys(modules).forEach((k) => {
      const module = JSON.parse(JSON.stringify(modules[k]));
      module.id = k;
      const activityList = [];
      if (module.activities) {
        Object.keys(module.activities).forEach((j) => {
          module.activities[j].id = j;
          module.activities[j].moduleId = module.id;
          activityList.push(module.activities[j]);
        });
      }
      module.activities = activityList;
      moduleList.push(module);
    });
  }
  return moduleList;
};

const mapResourcesToList = (quotation) => {
  const resources = [];
  if (quotation.resources) {
    Object.keys(quotation.resources).forEach((j) => {
      resources.push({
        id: j,
        fee: quotation.resources[j].fee,
        geo: quotation.resources[j].geo,
        title: quotation.resources[j].title,
        isFeeGeoBased: quotation.resources[j].isFeeGeoBased
      })
    });
  }

  return resources;
};