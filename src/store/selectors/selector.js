export const getUser = (state) => state.user;
export const getLoginError = (state) => state.loginError;
export const getProjects = (state) => state.projects ? mapProjectList(state.projects) : undefined;
export const getProject = (state) => state.project ?  state.project : undefined;
export const getSelectedProjectId = (state) => state.selectedProjectId;
export const getSelectedQuotationId = (state) => state.selectedQuotationId;
export const getQuotations = (state) => mapQuotationList(state.quotations);
export const getQuotation = (state) => state.quotations ? getSingleQuotation(state.quotations, state.selectedQuotationId) : undefined;
export const getShowNewInvoice = (state) => state.showNewInvoice;
export const getInvoiceList = (state) => state.invoiceList;
export const getPeople = (state) => state.professionals ? mapPeopleList(state.professionals) : undefined;
export const getBaseModules = (state) => mapBaseModules(state.baseModules);

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
    projectList.push(projects[k]);
  });

  return projectList.reverse();
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

const getSingleQuotation = (quotations, id) => {
  const quotation = mapQuotation(quotations[id]);
  quotation.id = id;
  
  return quotation;
}

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

const mapBaseModules = (modules) => {
  const moduleList = [];
  if (modules) {
    Object.keys(modules).forEach((k) => {
      modules[k].id = k;
      moduleList.push(modules[k]);
    });
  }

  return moduleList;
}