export const getBudget = (state) => mapBudget(state);

const mapBudget = (state) => {
  const budget = {
    modules: {},
    estimatedCost: 0,
    sustainedCost: 0,
    outOfBudgetCost: 0
  };

  let outOfBudgetInvoices = state.invoiceList.filter( i => i.quotationCode === "Out of budget");
  outOfBudgetInvoices.forEach( i => {
    budget.outOfBudgetCost += i.totalCost;
    budget.sustainedCost += i.totalCost;
  });


  if (state.quotations) {
    let quotations = JSON.parse(JSON.stringify(state.quotations));

    if (quotations) {
      Object.keys(quotations).forEach((k) => {
        quotations[k].id = k;
        let quotationInvoices = state.invoiceList.filter(i => i.quotationCode === quotations[k].code);
        const quotation = mapQuotationForBudget(quotations[k], quotationInvoices);

        Object.keys(quotation.modules).forEach((j) => {
          addModuleToBudget(budget, quotation.modules[j]);
        });
      });
    }
  }
  return mapBudgetWithData(budget);
}

const mapQuotationForBudget = (quotation, invoices) => {
  const modules = {};
  if (quotation.modules) {
    Object.keys(quotation.modules).forEach((k) => {
      let moduleInvoices = invoices.filter(i => i.moduleCode === quotation.modules[k].code);
      quotation.modules[k].id = k;
      modules[quotation.modules[k].code] = mapModuleForBudget(quotation, quotation.modules[k], moduleInvoices);
    });
  }
  quotation.modules = modules;

  return quotation;
}

const mapModuleForBudget = (quotation, module, invoices) => {
  const activities = {};
  if (module.activities) {
    Object.keys(module.activities).forEach((k) => {
      let activity = module.activities[k];
      activity.id = k;
      activity.quotation = { id: quotation.id, code: quotation.code };
      activity.module = { id: module.id, code: module.code, title: module.title };
      let activityInvoices = invoices.filter(i => i.activityCode === activity.code);
      activity.sustainedCost = activityInvoices.reduce((total, i) => (total + i.totalCost), 0);
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
  budgetModule.activities[activity.code].sustainedCost += activity.sustainedCost;
  budgetModule.activities[activity.code].originalActivities.push(activity);

  budgetModule.estimatedCost += activity.activityCost;
  budgetModule.sustainedCost += activity.sustainedCost;
}

const mapBudgetWithData = (budget) => {
  let modules = [];
  Object.keys(budget.modules).forEach((k) => {
    let module = budget.modules[k];
    budget.estimatedCost += module.estimatedCost;
    budget.sustainedCost += module.sustainedCost;
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