export const getBudget = (state) => mapBudget(state.quotations, state.invoiceList);
const mapBudget = (quotations, invoices) => {

  let projectBudget = {
    modules: {},
    budget: 0,              // the total amount quotated to the sponsor
    plannedExpenses: 0,     // the total amount quotated by providers
    incomes: 0,             // the total amount invoiced to the sponsor for quotated activities
    expenses: 0,            // the total amount of cost activities
    outOfBudget: {
      incomes: 0,  // the total amount invoiced to the sponsor for NOT quotated activities
      expenses: 0, // the total amount of cost activities NOT quotated
      originalActivities: [] // original OOB activities
    }
  };

  if (quotations) {
    const budgetQuotations = JSON.parse(JSON.stringify(quotations));
    projectBudget = addQuotationDataToBudget(projectBudget, budgetQuotations, invoices);
    projectBudget = calculateOutOfBudget(projectBudget, invoices);
    projectBudget = mapDataToBudget(projectBudget);
  }

  return projectBudget;
}

const addQuotationDataToBudget = (budgetData, quotations, invoices) => {
  if (quotations) {
    Object.keys(quotations).forEach((k) => {
      quotations[k].id = k;
      let quotationInvoices = invoices.filter(i => i.sponsorQuotationCode === quotations[k].code);
      const quotation = mapQuotationForBudget(quotations[k], quotationInvoices);

      Object.keys(quotation.modules).forEach((j) => {
        addModuleToBudget(budgetData, quotation.modules[j]);
      });
    });
  }

  return budgetData;
};

const mapQuotationForBudget = (quotation, invoices) => {
  const modules = {};
  if (quotation.modules) {
    Object.keys(quotation.modules).forEach((k) => {
      let moduleInvoices = invoices.filter(i => i.sponsorModuleCode === quotation.modules[k].code);
      quotation.modules[k].id = k;
      modules[quotation.modules[k].code] = mapModuleForBudget(quotation, quotation.modules[k], moduleInvoices);
    });
  }
  quotation.modules = modules;

  return quotation;
};

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

      let resources = [];
      if (activity.resources) {
        Object.keys(activity.resources).forEach((i) => {
          const resource = activity.resources[i];
          const quotationResource = quotation.resources[resource.code];
          resource.id = i;
          resource.hourCost = quotationResource.fee;
          resource.cost = resource.hourCost * resource.hours;
          activity.unitCost += resource.cost;
          resources.push(resource);
        });
      }
      activity.activityCost = activity.unitCost * activity.unitNumber;
      activity.resources = resources;
      activity.type = quotation.quotationType;
      let activityInvoices = invoices.filter(i => i.sponsorActivityCode === activity.code);
      activity.incomes = activityInvoices.filter(i => i.type === 'INCOME').reduce((total, i) => (total + i.totalCost), 0);
      activity.expenses = activityInvoices.filter(i => i.type === 'EXPENSE').reduce((total, i) => (total + i.totalCost), 0);
      activity.quotationCode = quotation.code;
      activities[activity.code] = activity;
    });
  }
  module.activities = activities;

  return module;
};

const addModuleToBudget = (budget, module) => {
  if (!budget.modules[module.code]) {
    budget.modules[module.code] = {
      code: module.code,
      title: module.title,
      geo: module.geo,
      budget: 0,
      plannedExpenses: 0,
      incomes: 0,
      expenses: 0,
      activities: {}
    };
  }

  Object.keys(module.activities).forEach((k) => {
    addActivityToBudget(budget.modules[module.code], module.activities[k]);
  });
};

const addActivityToBudget = (module, activity) => {
  initializeAggregatedActiyty(module, activity);
  aggregateActivity(activity, module.activities[activity.code]);
  updateModuleTotals(module, activity);
};

const initializeAggregatedActiyty = (module, activity) => {
  if (!module.activities[activity.code]) {
    module.activities[activity.code] = {
      code: activity.code,
      title: activity.title,
      budget: 0,
      plannedExpenses: 0,
      incomes: 0,
      expenses: 0,
      originalActivities: []
    };
  }
};

const aggregateActivity = (activity, aggregatedActivity) => {
  if (activity.type === "SPONSOR") {
    aggregatedActivity.budget += activity.activityCost;
  } else {
    aggregatedActivity.plannedExpenses += activity.activityCost;
  }
  aggregatedActivity.incomes += activity.incomes;
  aggregatedActivity.expenses += activity.expenses;
  aggregatedActivity.originalActivities.push(activity);
};

const updateModuleTotals = (module, activity) => {
  if (activity.type === "SPONSOR") {
    module.budget += activity.activityCost;
  } else {
    module.plannedExpenses += activity.activityCost;
  }
  module.incomes += activity.incomes;
  module.expenses += activity.expenses;
};

const calculateOutOfBudget = (budget, invoices) => {
  let outOfBudgetInvoices = invoices.filter(i => i.sponsorQuotationCode === "Out of budget");
  outOfBudgetInvoices.forEach(i => {
    if (i.type === 'INCOME') {
      budget.outOfBudget.incomes += i.totalCost;
      budget.incomes += i.totalCost;
    } else {
      budget.outOfBudget.expenses += i.totalCost;
      budget.expenses += i.totalCost;
    }
    budget.outOfBudget.originalActivities.push(i);
  });

  return budget;
};

const mapDataToBudget = (budget) => {
  let modules = [];
  Object.keys(budget.modules).forEach((k) => {
    let module = budget.modules[k];
    budget.budget += module.budget;
    budget.incomes += module.incomes;
    budget.plannedExpenses += module.plannedExpenses;
    budget.expenses += module.expenses;
    let activities = [];
    Object.keys(module.activities).forEach((j) => {
      activities.push(module.activities[j]);
    });
    module.activities = activities;
    modules.push(module);
  });
  budget.modules = modules;

  return budget;
};