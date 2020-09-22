export const getUser = state => state.user;
export const getLoginError = state => state.loginError;
export const getQuotations = state => state.quotations ? mapQuotationList(state.quotations) : undefined;
export const getSelectedQuotation = state => state.quotations && state.selectedQuotation ? getFirsQuotation(state.quotations, state.selectedQuotation) : undefined;
export const getShowNewInvoice = state => state.showNewInvoice;
export const getInvoiceList = state => state.invoiceList;

const mapQuotationList = (quotations) => {
  const quotationList = [];
  Object.keys(quotations).forEach(k => {
      quotations[k].id = k;
      quotationList.push(mapQuotation(quotations[k]));
  });

  return quotationList.reverse();
};

const mapQuotation = (quotation => {
  const modules = [];
  Object.keys(quotation.modules).forEach(k => {
      quotation.modules[k].id = k;
      modules.push(mapModule(quotation.modules[k]));
  });
  quotation.modules = modules;

  return quotation;
});

const mapModule = (module => {
  const activities = [];
  Object.keys(module.activities).forEach(k => {
      module.activities[k].id = k;
      activities.push(mapActivity(module.activities[k]));
  });
  module.activities = activities;

  return module;
});

const mapActivity = (activity => {
  const resources = [];
  Object.keys(activity.resources).forEach(k => {
      activity.resources[k].id = k;
      resources.push(activity.resources[k]);
  });
  activity.resources = resources;

  return activity;
});

const getFirsQuotation = (quotations, selectedQuotation) => mapQuotation(quotations[selectedQuotation]);