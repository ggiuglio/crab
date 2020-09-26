export const getUser = (state) => state.user;
export const getLoginError = (state) => state.loginError;
export const getProjects = (state) =>
  state.projects ? mapProjectList(state.projects) : undefined;
export const getSelectedProject = (state) => getP(state);
export const getQuotations = (state) =>
  state.quotations ? mapQuotationList(state.quotations) : undefined;
export const getSelectedQuotation = (state) => getQ(state);
export const getShowNewInvoice = (state) => state.showNewInvoice;
export const getInvoiceList = (state) => state.invoiceList;
export const getPeople = (state) =>
  state.people ? mapPeopleList(state.professionals) : undefined;

const mapPeopleList = (people) => {
  const peopleList = [];
  if (people) {
    Object.keys(people).forEach((k) => {
      people[k].id = k;
      peopleList.push(people[k]);
    });
  }

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
  if (quotations) {
    Object.keys(quotations).forEach((k) => {
      quotations[k].id = k;
      quotationList.push(mapQuotation(quotations[k]));
    });
  }

  return quotationList.reverse();
};

const mapQuotation = (quotation) => {
  const modules = [];
  if (quotation.modules) {
    Object.keys(quotation.modules).forEach((k) => {
      quotation.modules[k].id = k;
      modules.push(mapModule(quotation.modules[k]));
    });
  }
  quotation.modules = modules;

  return quotation;
};

const mapModule = (module) => {
  const activities = [];
  if (module.activities) {
    Object.keys(module.activities).forEach((k) => {
      module.activities[k].id = k;
      activities.push(mapActivity(module.activities[k]));
    });
  }
  module.activities = activities;

  return module;
};

const mapActivity = (activity) => {
  const resources = [];
  if (activity.resources) {
    Object.keys(activity.resources).forEach((k) => {
      activity.resources[k].id = k;
      resources.push(activity.resources[k]);
    });
  }
  activity.resources = resources;

  return activity;
};

const getP = (state) => {
  const p = state.projects && state.selectedProject ? state.projects[state.selectedProject] : null;

  return p;
}

const getQ = (state) => {
  const p = state.quotations && state.selectedQuotation ? state.quotations[state.selectedQuotation] : null;

  return p;
}