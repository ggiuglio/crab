export const getSelectedQuotationId = (state) => state.selectedQuotationId;
export const getQuotations = (state) => mapQuotationList(state.quotations);
export const getQuotation = (state) => state.quotations ? getSingleQuotation(state.quotations, state.selectedQuotationId) : undefined;
export const getQuotationsEntityList = (state) => mapQuotationsEntityList(state.quotations);

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

const mapQuotationsEntityList = (quotationsObj) => {
  const modules = [];
  const activities = [];
  const quotations = [];

  if (quotationsObj) {
    Object.keys(quotationsObj).forEach((i) => {
      let quotation = {
        id: i,
        code: quotationsObj[i].code,
      };
      quotations.unshift(quotation);

      Object.keys(quotationsObj[i].modules).forEach((j) => {
        let module = {
          quotationId: quotation.id,
          id: j,
          code: quotationsObj[i].modules[j].code,
          title: quotationsObj[i].modules[j].title,
          geo: quotationsObj[i].modules[j].geo
        };
        modules.unshift(module);

        Object.keys(quotationsObj[i].modules[j].activities).forEach((k) => {
          let activity = {
            quotationId: quotation.id,
            moduleId: module.id,
            id: k,
            code: quotationsObj[i].modules[j].activities[k].code,
            title: quotationsObj[i].modules[j].activities[k].title
          };
          activities.unshift(activity);

        });
      });
    });
  }

  activities.unshift({
    id: -1,
    code: '',
    title: "select an activity"
  });
  modules.unshift({
    id: -1,
    code: '',
    title: "select a module"
  });
  quotations.unshift({
    id: 0,
    code: "Out of budget"
  });
  quotations.unshift({
    id: -1,
    code: "select a quotation"
  });

  return {
    activities: activities,
    modules: modules,
    quotations: quotations
  }
}