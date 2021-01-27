export const getBudget = (state) => mapBudget(state.quotations, state.invoiceList);

const mapBudget = (quotations, invoices) => {
  const budgetQuotations = JSON.parse(JSON.stringify(quotations));
  const emptyBudget = {
    modules: {},
    budget: 0,              // the total amount quotated to the sponsor
    plannedExpenses: 0,     // the total amount quotated by providers
    incomes: 0,             // the total amount invoiced to the sponsor for quotated activities
    expenses: 0,            // the total amount invoiced by suppliers for quotated activities
    outOfBudgetIncomes: 0,  // the total amount invoiced to the sponsor for NOT quotated activities
    outOfBudgetExpenses: 0  // the total amount invoiced by suppliers for NOT quotated activities
  };

  const projectBudgetData = addQuotationDataToBudget(emptyBudget, budgetQuotations, invoices);
  const projectBudgetDataWithOutOfBudget = calculateOutOfBudget(projectBudgetData, invoices);
  const projectBudget = mapDataToBudget(projectBudgetDataWithOutOfBudget);

  return projectBudget;
}

const addQuotationDataToBudget = (budgetData, quotations, invoices) => {
  if (quotations) {
    Object.keys(quotations).forEach((k) => {
      quotations[k].id = k;
      let quotationInvoices = invoices.filter(i => i.quotationCode === quotations[k].code);
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
      let moduleInvoices = invoices.filter(i => i.moduleCode === quotation.modules[k].code);
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
          activity.unitCost += resource.cost;
          resources.push(resource);
        });
      }
      activity.activityCost = activity.unitCost * activity.unitNumber;
      activity.resources = resources;
      activity.type = quotation.quotationType;
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

const addActivityToBudget = (budgetModule, activity) => {
  if (!budgetModule.activities[activity.code]) {
    budgetModule.activities[activity.code] = {
      code: activity.code,
      title: activity.title,
      budget: 0,
      plannedExpenses: 0,
      incomes: 0,
      expenses: 0,
      originalActivities: []
    };
  }
  if (activity.type === "SPONSOR") {
    budgetModule.activities[activity.code].budget += activity.activityCost;
    budgetModule.activities[activity.code].incomes += activity.totalInvoiced;
  } else {
    budgetModule.activities[activity.code].plannedExpenses += activity.activityCost;
    budgetModule.activities[activity.code].expenses += activity.totalInvoiced;
  }
  activity.sustainedCost = activity.totalInvoiced;
  budgetModule.activities[activity.code].originalActivities.push(activity);

  if (activity.type === "SPONSOR") {
    budgetModule.budget += activity.activityCost;
    budgetModule.incomes += activity.totalInvoiced;
  } else {
    budgetModule.plannedExpenses += activity.activityCost;
    budgetModule.expenses += activity.totalInvoiced;
  }
};

const calculateOutOfBudget = (budget, invoices) => {
  let outOfBudgetInvoices = invoices.filter(i => i.quotationCode === "Out of budget");
  outOfBudgetInvoices.forEach(i => {
    budget.outOfBudgetCost += i.totalCost;
    budget.sustainedCost += i.totalCost;
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