export const getUser = (state) => state.user;
export const getLoginError = (state) => state.loginError;
export const getProjects = (state) =>
  state.projects ? mapProjectList(state.projects) : undefined;
export const getSelectedProject = (state) =>
  state.selectedProject
    ? getFirsProject(state.projects, state.selectedProject)
    : undefined;
export const getQuotations = (state) =>
  state.quotations ? mapQuotationList(state.quotations) : undefined;
export const getSelectedQuotation = (state) =>
  state.quotations && state.selectedQuotation
    ? getFirsQuotation(state.quotations, state.selectedQuotation)
    : undefined;
export const getShowNewInvoice = (state) => state.showNewInvoice;
export const getInvoiceList = (state) => state.invoiceList;
export const getPeople = (state) =>
  state.people ? mapPeopleList(state.people) : undefined;

const mapPeopleList = (people) => {
  const peopleList = [];
  Object.keys(people).forEach((k) => {
    people[k].id = k;
    peopleList.push(people[k]);
  });

  return peopleList;
};

const mapProjectList = (projects) => {
  const projectList = [];
  Object.keys(projects).forEach((k) => {
    projects[k].id = k;
    projectList.push(mapProject(projects[k]));
  });

  return projectList.reverse();
};

const mapProject = (project) => {
  const geo = [];
  Object.keys(project.GEO).forEach((k) => {
    project.GEO[k].id = k;
    geo.push(project.GEO[k]);
  });
  project.GEO = geo;

  return project;
};

const mapQuotationList = (quotations) => {
  const quotationList = [];
  Object.keys(quotations).forEach((k) => {
    quotations[k].id = k;
    quotationList.push(mapQuotation(quotations[k]));
  });

  return quotationList.reverse();
};

const mapQuotation = (quotation) => {
  const modules = [];
  Object.keys(quotation.modules).forEach((k) => {
    quotation.modules[k].id = k;
    modules.push(mapModule(quotation.modules[k]));
  });
  quotation.modules = modules;

  return quotation;
};

const mapModule = (module) => {
  const activities = [];
  Object.keys(module.activities).forEach((k) => {
    module.activities[k].id = k;
    activities.push(mapActivity(module.activities[k]));
  });
  module.activities = activities;

  return module;
};

const mapActivity = (activity) => {
  const resources = [];
  Object.keys(activity.resources).forEach((k) => {
    activity.resources[k].id = k;
    resources.push(activity.resources[k]);
  });
  activity.resources = resources;

  return activity;
};

const getFirsProject = (projects, selectedProjects) =>
  mapProject(projects[selectedProjects]);

const getFirsQuotation = (quotations, selectedQuotation) =>
  mapQuotation(quotations[selectedQuotation]);
