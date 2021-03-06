import { QUOTATION_TYPES } from "../../constants/constants";

export const getSelectedQuotationId = (state) => state.selectedQuotationId;
export const getQuotations = (state) => mapQuotationList(state.quotations);
export const getProviderQuotations = (state) => filterProviderQuotations(mapQuotationList(state.quotations));
export const getSponsorQuotations = (state) => filterSponsorQuotations(mapQuotationList(state.quotations));
export const getQuotation = (state) => state.selectedQuotationData ? getSingleQuotation(state.selectedQuotationData) : undefined;
export const getQuotationsEntityList = (state) => mapQuotationsEntityList(state.quotations);
export const getSponsorQuotationsEntityList = (state) => mapQuotationsEntityList(state.quotations, 'SPONSOR');
export const getProviderQuotationsEntityList = (state) => mapQuotationsEntityList(state.quotations, 'PROVIDER');
export const getAllModulesAndActivities = (state) => mapAllBaseEntities(state.baseModules);
export const getModalResourceData = (state) => state.resourceModalData;

const mapQuotationList = (qs) => {
  const quotationList = [];
  if (qs) {
    const quotations = JSON.parse(JSON.stringify(qs));
    if (quotations) {
      Object.keys(quotations).forEach((k) => {
        let quotation = quotations[k];
        if(quotation.archived) return;
        quotation.id = k;
        quotation = mapQuotation(quotation);
        const qutationTile = {
          id: quotation.id,
          code: quotation.code,
          cost: quotation.quotationCost,
          type: quotation.quotationType,
          status: quotation.status
        };

        quotationList.push(qutationTile);
      });
    }
  }

  return quotationList.reverse();
};

const filterProviderQuotations = (quotations) => {
  return quotations.filter(q => q.type === QUOTATION_TYPES.PROVIDER);
};

const filterSponsorQuotations = (quotations) => {
  return quotations.filter(q => q.type === QUOTATION_TYPES.SPONSOR);
};

const getSingleQuotation = (selectedQuotation) => {
  return mapQuotation(JSON.parse(JSON.stringify(selectedQuotation)));
};

const mapQuotation = (quotation) => {
  const modules = [];
  if (quotation) {
    quotation.quotationCost = 0;
    quotation.quotationPTCost = 0;
    quotation.quotationNotPTCost = 0;

    if (quotation.modules) {
      Object.keys(quotation.modules).forEach((k) => {
        let module = quotation.modules[k]
        module.id = k;
        module = mapModule(quotation.modules[k], quotation)
        quotation.quotationCost += module.moduleCost;
        if (module.isPassthrough) {
          quotation.quotationPTCost += module.moduleCost;
        } else {
          quotation.quotationNotPTCost += module.moduleCost;
        }
        modules.push(module);
      });
    }
    quotation.modules = modules.sort((a, b) => a.index > b.index ? 1 : -1);
  }

  return quotation;
};

const mapModule = (module, quotation) => {
  const activities = [];
  module.moduleCost = 0;
  if (module.activities) {
    Object.keys(module.activities).forEach((k) => {
      let activity = mapActivity(module.activities[k], quotation)
      activity.id = k;
      module.moduleCost += activity.activityCost;
      activities.push(activity);
    });
  }
  module.activities = activities.sort((a, b) => a.index > b.index ? 1 : -1);

  return module;
};

const mapActivity = (activity, quotation) => {
  const resources = [];
  activity.unitCost = activity.fixedCost ? parseInt(activity.fixedCost) : 0;
  activity.unitNumber = activity.unitNumber ? activity.unitNumber : 0;
  if (activity.resources) {
    Object.keys(activity.resources).forEach((k) => {
      const resource = activity.resources[k];
      const quotationResource = quotation.resources[resource.code];
      resource.id = k;
      resource.hourCost = quotationResource.fee;
      resource.cost = resource.hourCost * resource.hours;
      activity.resources[k].id = k;
      activity.unitCost += activity.resources[k].cost;
      resources.push(activity.resources[k]);
    });
  }

  activity.resources = resources;
  activity.activityCost = activity.unitCost * activity.unitNumber;

  return activity;
};

const mapQuotationsEntityList = (quotationsObj, type) => {
  let modules = [];
  let uniqueModuleList = [];
  let activities = [];
  let quotations = [];

  if (quotationsObj) {
    Object.keys(quotationsObj).forEach((i) => {
      let quotation = {
        id: i,
        code: quotationsObj[i].code,
        type: quotationsObj[i].quotationType,
        provider: quotationsObj[i].provider
      };
      if (!type || quotation.type === type) {
        quotations.unshift(quotation);

        Object.keys(quotationsObj[i].modules).forEach((j) => {
          let module = {
            quotationId: quotation.id,
            id: j,
            index: quotationsObj[i].modules[j].index,
            code: quotationsObj[i].modules[j].code,
            geo: quotationsObj[i].modules[j].geo,
            title: quotationsObj[i].modules[j].title,
            geo: quotationsObj[i].modules[j].geo
          };
          modules.push(module);
          if (!uniqueModuleList.find(um => um.code === quotationsObj[i].modules[j].code)) {
            uniqueModuleList.push(quotationsObj[i].modules[j]);
          }

          Object.keys(quotationsObj[i].modules[j].activities).forEach((k) => {
            let activity = {
              quotationId: quotation.id,
              moduleId: module.id,
              moduleCode: module.code,
              id: k,
              index: quotationsObj[i].modules[j].activities[k].index,
              code: quotationsObj[i].modules[j].activities[k].code,
              title: quotationsObj[i].modules[j].activities[k].title
            };
            activities.unshift(activity);

          });
        });
      }
    });
  }
  activities.sort((a, b) => a.index > b.index ? 1 : -1);
  modules.sort((a, b) => a.index > b.index ? 1 : -1);

  return {
    activities: activities,
    modules: modules,
    uniqueModules: uniqueModuleList,
    quotations: quotations
  }
};

const mapAllBaseEntities = (modules) => {
  const moduleList = [];
  const activityList = [];
  if (modules) {
    Object.keys(modules).forEach((k) => {
      modules[k].id = k;
      moduleList.push(modules[k]);
      if (modules[k].activities) {
        Object.keys(modules[k].activities).forEach((j) => {
          modules[k].activities[j].id = j;
          modules[k].activities[j].moduleId = modules[k].id;
          activityList.push(modules[k].activities[j]);
        });
      }
    });
  }

  activityList.sort((a, b) => a.index > b.index ? 1 : -1);
  moduleList.sort((a, b) => a.index > b.index ? 1 : -1);

  moduleList.unshift({
    id: "-1",
    code: '',
    title: "select a module"
  });

  activityList.unshift({
    id: "-1",
    code: '',
    title: "select an activity"
  });

  return { modules: moduleList, activities: activityList };
};