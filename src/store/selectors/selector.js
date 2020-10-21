export const getUser = (state) => state.user;
export const getLoginError = (state) => state.loginError;
export const getProjects = (state) => state.projects ? mapProjectList(state.projects) : undefined;
export const getProject = (state) => state.project ? state.project : undefined;
export const getSelectedProjectId = (state) => state.selectedProjectId;
export const getSelectedQuotationId = (state) => state.selectedQuotationId;
export const getQuotations = (state) => mapQuotationList(state.quotations);
export const getQuotation = (state) => state.quotations ? getSingleQuotation(state.quotations, state.selectedQuotationId) : undefined;
export const getShowNewInvoice = (state) => state.showNewInvoice;
export const getInvoiceList = (state) => state.invoiceList;
export const getPeople = (state) => state.professionals ? mapPeopleList(state.professionals) : undefined;
export const getBaseModules = (state) => mapBaseModules(state.baseModules);
export const getBudget = (state) => mapBudget(state.quotations);

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

const mapBudget = (q) => {
  const budget = {
    modules: {}
  };

  if (q) {
    let quotations = JSON.parse(JSON.stringify(q));

    if (quotations) {
      Object.keys(quotations).forEach((k) => {
        quotations[k].id = k;
        const quotation = mapQuotationForBudget(quotations[k]);

        Object.keys(quotation.modules).forEach((j) => {
          addModuleToBudget(budget, quotation.modules[j]);
        });
      });
    }
  }
  return mapBudgetWithData(budget);
}

const mapQuotationForBudget = (quotation) => {
  const modules = {};
  if (quotation.modules) {
    Object.keys(quotation.modules).forEach((k) => {
      quotation.modules[k].id = k;
      modules[quotation.modules[k].code] = mapModuleForBudget(quotation, quotation.modules[k])
    });
  }
  quotation.modules = modules;

  return quotation;
}

const mapModuleForBudget = (quotation, module) => {
  const activities = {};
  if (module.activities) {
    Object.keys(module.activities).forEach((k) => {
      let activity = module.activities[k];
      activity.id = k;
      activity.quotation = { id: quotation.id, code: quotation.code };
      activity.module = { id: module.id, code: module.code, title: module.title };
      let resources = [];
      Object.keys(activity.resources).forEach((k) => {
        resources.push(activity.resources[k]);
      });
      activity.resources = resources;
      activities[activity.code] = activity;
    });
  }
  module.activities = activities;

  return module;
}

const addModuleToBudget = (budget, module) => {
  if (!budget.modules[module.code]) {
    budget.modules[module.code] = {
      code: module.code,
      title: module.title,
      estimatedCost: 0,
      sustainedCost: 0,
      activities: {}
    };
  }

  Object.keys(module.activities).forEach((k) => {
    addActivityToBudget(budget.modules[module.code], module.activities[k]);
  });
}

const addActivityToBudget = (budgetModule, activity) => {
  if (!budgetModule.activities[activity.code]) {
    budgetModule.activities[activity.code] = {
      code: activity.code,
      title: activity.title,
      estimatedCost: 0,
      sustainedCost: 0,
      originalActivities: []
    };
  }
  budgetModule.activities[activity.code].estimatedCost += activity.activityCost;
  budgetModule.activities[activity.code].originalActivities.push(activity);
  budgetModule.estimatedCost += activity.activityCost;
}

const mapBudgetWithData = (budget) => {
  let modules = [];
  Object.keys(budget.modules).forEach((k) => {
    let module = budget.modules[k];
    let activities = [];
    Object.keys(module.activities).forEach((j) => {
      activities.push(module.activities[j]);
    });
    module.activities = activities;
    modules.push(module);
  });
  budget.modules = modules;

  return budget;
}
