import quotations from "../../quotation/quotations";

export const getBudget = (state) => mapBudget(state);

const mapBudget = (state) => {
  const budget = {
    modules: {},
    estimatedCost: 0,
    sustainedCost: 0,
    outOfBudgetCost: 0
  };

  let outOfBudgetInvoices = state.invoiceList.filter(i => i.quotationCode === "Out of budget");
  outOfBudgetInvoices.forEach(i => {
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
      activity.unitCost = activity.fixedCost ? parseInt(activity.fixedCost) : 0;
      activity.unitNumber = activity.unitNumber ? parseInt(activity.unitNumber) : 0;
      activity.quotation = { id: quotation.id, code: quotation.code };
      activity.module = { id: module.id, code: module.code, title: module.title };
      let activityInvoices = invoices.filter(i => i.activityCode === activity.code && activity.type === quotation.type);
      activity.totalInvoiced = activityInvoices.reduce((total, i) => (total + i.totalCost), 0);
      let resources = [];
      if (activity.resources) {
        Object.keys(activity.resources).forEach((i) => {
          const resource = activity.resources[i];
          const quotationResource = quotation.resources[resource.code];
          resource.id = i;
          resource.hourCost = quotationResource.fee;
          resource.cost = resource.hourCost * resource.hours;
          activity.unitCost += activity.resources[i].cost;
          resources.push(activity.resources[i]);
        });
      }
      activity.activityCost = activity.unitCost * activity.unitNumber;
      activity.resources = resources;
      activity.type = quotation.type;
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
      estimatedIncome: 0,
      sustainedIncome: 0,
      originalActivities: []
    };
  }
  if (activity.type === "SPONSOR") {
    budgetModule.activities[activity.code].estimatedCost += activity.activityCost;
    budgetModule.activities[activity.code].sustainedCost += activity.totalInvoiced;
  } else {
    budgetModule.activities[activity.code].estimatedIncome += activity.activityCost;
    budgetModule.activities[activity.code].sustainedIncome += activity.totalInvoiced;
  }
  budgetModule.activities[activity.code].originalActivities.push(activity);

  budgetModule.estimatedCost += activity.activityCost;
  budgetModule.sustainedCost += activity.sustainedCost;
  budgetModule.estimatedIncome += activity.activityCost;
  budgetModule.sustainedIncome += activity.totalInvoiced;
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