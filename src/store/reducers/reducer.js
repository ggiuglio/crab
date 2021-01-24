import {
  SET_USER,
  LOGIN_ERROR,
  RESET_LOGIN_ERROR,
  LOAD_PROJECTS,
  LOAD_PROJECT,
  SHOW_NEW_INVOICE,
  HIDE_NEW_INVOICE,
  CLEAR_USER_DATA,
  SELECT_PROJECT,
  SELECT_QUOTATION,
  LOAD_STATIC_DATA,
  SET_QUOTATION_VIEW_MODE,
  INITIALIZE_NEW_QUOTATION,
  SET_SELECTED_QUOTATION_CODE,
  ADD_MODULE_TO_SELECTED_QUOTATION,
  REMOVE_MODULE_FROM_SELECTED_QUOTATION,
  ADD_ACTIVITY_TO_SELECTED_QUOTATION,
  REMOVE_ACTIVITY_FROM_SELECTED_QUOTATION,
  EDIT_ACTIVITY_IN_SELECTED_QUOTATION,
  SHOW_ACTIVITY_RESOURCE_MODAL,
  ADD_RESOURCE_TO_SELECTED_QUOTATION,
  REMOVE_RESOURCE_FROM_SELECTED_QUOTATION,
  EDIT_RESOURCE_IN_SELECTED_QUOTATION,
  HYDE_ACTIVITY_RESOURCE_MODAL,
  EDIT_DEFAULT_RESOURCE_COST_IN_SELECTED_QUOTATION,
  SET_SELECTED_QUOTATION_PROVIDER,
  CANCEL_QUOTATION_EDIT,
  SET_BREADCRUMB_CODE,
  SET_BREADCRUMB,
  INITIALIZE_NEW_PROJECT,
  SET_PROJECT_GEOS,
  SET_PROJECT_TITLE,
  SET_PROJECT_PM,
  SET_PROJECT_SPONSOR,
  ADD_PROJECT_PROVIDER,
  REMOVE_PROJECT_PROVIDER,
  SELECT_REGION_FOR_PROJECT,
  CANCEL_PROJECT_EDIT,
  SET_PROJECT_VIEW_MODE
} from "../actions/actionsTypes";
import { VIEW_MODES, NAVIGATION_REPLACERS } from "../../constants/constants";
import { v4 as uuid } from "uuid";

export const INITIAL_STATE = {
  professionals: undefined,
  baseModules: undefined,
  projects: undefined,
  selectedProjectId: undefined,
  selectedQuotationId: undefined,
  quotations: undefined,
  project: undefined,
  invoiceList: [],
  showNewInvoice: false,
  viewMode: VIEW_MODES.VIEW,
  qotationType: undefined,
  resourceModalData: {
    showModal: false
  },
  breadcrumbCode: undefined,
  breadcrumb: []
};

const NAVIGATION_CODES = {
  "ADM": {
    title: "Administration",
    url: `#!`,
    order: 1
  },
  "PJS": {
    title: "Projects",
    url: `/projects`,
    order: 1
  },
  "NPJ": {
    title: "New project",
    url: `/new-project`,
    parent: "PJS",
    order: 2
  },
  "DSB": {
    title: `Project ${NAVIGATION_REPLACERS.NAV_REPL_PROJECT_TITLE}`,
    url: `/project?project=${NAVIGATION_REPLACERS.NAV_REPL_PROJECT_ID}`,
    parent: "PJS",
    order: 2
  },
  "QTS": {
    title: `Quotations`,
    url: `/project/quotations?project=${NAVIGATION_REPLACERS.NAV_REPL_PROJECT_ID}`,
    parent: "DSB",
    order: 3
  },
  "INV": {
    title: `Invoicing`,
    url: `/project/invoices?project=${NAVIGATION_REPLACERS.NAV_REPL_PROJECT_ID}`,
    parent: "DSB",
    order: 3
  },
  "BDG": {
    title: `Budget`,
    url: `/project/budget?project=${NAVIGATION_REPLACERS.NAV_REPL_PROJECT_ID}`,
    parent: "DSB",
    order: 3
  },
  "ADA": {
    title: `Advanced analytics`,
    url: `/project/analytics?project=${NAVIGATION_REPLACERS.NAV_REPL_PROJECT_ID}`,
    parent: "DSB",
    order: 3
  },
  "NQT": {
    title: `New quotation`,
    // url: `/project/new-quotation`,
    url: `#!`,
    parent: "QTS",
    order: 4
  },
  "QTN": {
    title: `Quotation ${NAVIGATION_REPLACERS.NAV_REPL_QUOTATION_CODE}`,
    url: `/project/quotation?project=${NAVIGATION_REPLACERS.NAV_REPL_PROJECT_ID}&quotation=${NAVIGATION_REPLACERS.NAV_REPL_QUOTATION_ID}`,
    parent: "QTS",
    order: 4
  },
};

const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case LOGIN_ERROR: {
      return {
        ...state,
        loginError: action.error,
      };
    }
    case RESET_LOGIN_ERROR: {
      return {
        ...state,
        loginError: "",
      };
    }
    case LOAD_PROJECTS: {
      return {
        ...state,
        projects: action.projects
      };
    }
    case LOAD_PROJECT: {
      const quotations = action.project ? action.project.quotations : undefined;
      const invoices = action.project ? mapInvoiceList(action.project.invoices) : [];
      const project = action.project ? { ...action.project.project, id: action.projectId } : undefined;

      const selectedProject = project ? {
        id: project.id,
        title: project.title,
        pm: project.pm,
        providers: project.providers ? project.providers : [],
        geos: project.geo,
        ownerId: project.ownerId,
        status: project.status,
        creationDate: project.creationDate,
        sponsor: project.sponsor,
        viewMode: VIEW_MODES.VIEW,
      } : undefined;

      const bc = mapBreadcrumb(undefined, state.breadcrumbCode, project);
      return {
        ...state,
        quotations: quotations,
        invoiceList: invoices,
        project: project,
        selectedProjectData: selectedProject,
        breadcrumbCode: bc.length > 0 ? bc[bc.length - 1].id : undefined,
        breadcrumb: bc
      };
    }
    case SHOW_NEW_INVOICE: {
      return {
        ...state,
        showNewInvoice: true,
      };
    }
    case HIDE_NEW_INVOICE: {
      return {
        ...state,
        showNewInvoice: false,
      };
    }
    case CLEAR_USER_DATA: {
      return {
        ...state,
        selectedProjectId: null,
        selectedQuotationId: null,
        quotations: null,
        invoiceList: null,
        projects: null,
        project: null
      };
    }
    case SELECT_PROJECT: {
      return {
        ...state,
        selectedProjectId: action.project,
      };
    }
    case SELECT_QUOTATION: {
      const quotation = state.quotations ? JSON.parse(JSON.stringify(state.quotations[action.quotation])) : undefined
      if (quotation) {
        quotation.id = action.quotation
      }

      const bc = mapBreadcrumb(undefined, state.breadcrumbCode, state.project, quotation);

      return {
        ...state,
        viewMode: VIEW_MODES.VIEW,
        selectedQuotationId: action.quotation,
        selectedQuotationData: quotation,
        breadcrumbCode: bc.length > 0 ? bc[bc.length - 1].id : undefined,
        breadcrumb: bc
      };
    }
    case LOAD_STATIC_DATA: {
      return {
        ...state,
        professionals: action.professionals,
        baseModules: action.modules,
        regions: action.regions
      }
    }
    case SET_QUOTATION_VIEW_MODE: {
      return {
        ...state,
        viewMode: action.viewMode
      }
    }
    case INITIALIZE_NEW_PROJECT: {
      const emptyProject = {
        id: '0',
        title: '',
        sponsor: '',
        pm: '',
        providers: [],
        geos: {},
        ownerId: undefined,
        status: "Open",
        viewMode: VIEW_MODES.CREATE,
      }
      return {
        ...state,
        selectedProjectData: emptyProject,
        selectedProjectId: '0',
      }
    }
    case CANCEL_PROJECT_EDIT: {
      const project = JSON.parse(JSON.stringify(state.project));
      const selectedProject = project ? {
        id: project.id,
        title: project.title,
        pm: project.pm,
        providers: project.providers,
        geos: project.geo,
        viewMode: VIEW_MODES.VIEW,
      } : undefined;
      return {
        ...state,
        selectedProjectData: selectedProject,
      }
    }
    case INITIALIZE_NEW_QUOTATION: {
      const emptyQuotation = {
        id: '0',
        code: '',
        status: 'setup',
        quotationCost: 0,
        quotationType: action.quotationType,
        modules: {},
        resources: mapProfessionalAndGeosToResources(state.professionals, state.project.geo)
      }
      return {
        ...state,
        selectedQuotationData: emptyQuotation,
        selectedQuotationId: '0',
        viewMode: VIEW_MODES.CREATE
      }
    }
    case SET_SELECTED_QUOTATION_CODE: {
      const quotation = state.selectedQuotationData;
      quotation.code = action.code;
      return {
        ...state,
        selectedQuotationData: quotation
      }
    }
    case ADD_MODULE_TO_SELECTED_QUOTATION: {
      let updatedQuotation = JSON.parse(JSON.stringify(state.selectedQuotationData));
      addModuleToSelectedQuotation(updatedQuotation, action.module)

      return {
        ...state,
        selectedQuotationData: updatedQuotation
      }
    }
    case REMOVE_MODULE_FROM_SELECTED_QUOTATION: {
      let updatedQuotation = JSON.parse(JSON.stringify(state.selectedQuotationData));
      delete updatedQuotation.modules[action.moduleId];
      return {
        ...state,
        selectedQuotationData: updatedQuotation
      }
    }
    case ADD_ACTIVITY_TO_SELECTED_QUOTATION: {
      return {
        ...state,
        selectedQuotationData: addActivityToSelectedQuotation(state.selectedQuotationData, action.moduleId, action.activity)
      }
    }
    case REMOVE_ACTIVITY_FROM_SELECTED_QUOTATION: {
      let updatedQuotation = JSON.parse(JSON.stringify(state.selectedQuotationData));
      delete updatedQuotation.modules[action.moduleId].activities[action.activityId];
      return {
        ...state,
        selectedQuotationData: updatedQuotation
      }
    }
    case EDIT_ACTIVITY_IN_SELECTED_QUOTATION: {
      let updatedQuotation = JSON.parse(JSON.stringify(state.selectedQuotationData));
      let updatedActivity = updatedQuotation.modules[action.moduleId].activities[action.activity.id];
      updatedActivity.responsibilityCRO = action.activity.responsibilityCRO;
      updatedActivity.responsibilitySponsor = action.activity.responsibilitySponsor;
      updatedActivity.unitNumber = action.activity.unitNumber;
      updatedActivity.fixedCost = action.activity.fixedCost;
      updatedQuotation.modules[action.moduleId].activities[action.activity.id] = updatedActivity;

      return {
        ...state,
        selectedQuotationData: updatedQuotation,
      }
    }
    case SHOW_ACTIVITY_RESOURCE_MODAL: {
      return {
        ...state,
        resourceModalData: {
          activityId: action.activityId,
          moduleId: action.moduleId,
          showModal: true,
          moduleGeo: action.moduleGeo
        }
      }
    }
    case HYDE_ACTIVITY_RESOURCE_MODAL: {
      return {
        ...state,
        resourceModalData: {
          activityId: undefined,
          moduleId: undefined,
          moduleGeo: undefined,
          showModal: false
        }
      }
    }
    case ADD_RESOURCE_TO_SELECTED_QUOTATION: {
      let updatedQuotation = JSON.parse(JSON.stringify(state.selectedQuotationData));
      updatedQuotation = addResourceSelectedQuotation(updatedQuotation, action.moduleId, action.activityId, action.resource);
      return {
        ...state,
        selectedQuotationData: updatedQuotation,
        resourceModalData: {
          activityId: action.activityId,
          moduleId: action.moduleId,
          showModal: false
        }
      }
    }
    case REMOVE_RESOURCE_FROM_SELECTED_QUOTATION: {
      const updatedQuotation = state.selectedQuotationData;
      const updatedActivity = state.selectedQuotationData.modules[action.moduleId].activities[action.activityId];
      delete updatedActivity.resources[action.resourceId];

      return {
        ...state,
        selectedQuotationData: updatedQuotation
      }
    }
    case EDIT_RESOURCE_IN_SELECTED_QUOTATION: {
      const updatedQuotation = JSON.parse(JSON.stringify(state.selectedQuotationData));
      const updatedResource = updatedQuotation.modules[action.moduleId].activities[action.activityId].resources[action.resource.id];
      updatedResource.hours = action.resource.hours;
      updatedResource.cost = parseFloat(updatedResource.hourCost) * parseInt(updatedResource.hours);

      return {
        ...state,
        selectedQuotationData: updatedQuotation
      }
    }
    case EDIT_DEFAULT_RESOURCE_COST_IN_SELECTED_QUOTATION: {
      const updatedQuotation = JSON.parse(JSON.stringify(state.selectedQuotationData));
      updatedQuotation.resources[action.resourceId].fee = action.resourceFee;
      return {
        ...state,
        selectedQuotationData: updatedQuotation
      }
    }
    case SET_SELECTED_QUOTATION_PROVIDER: {
      const updatedQuotation = JSON.parse(JSON.stringify(state.selectedQuotationData));
      updatedQuotation.provider = action.provider;
      return {
        ...state,
        selectedQuotationData: updatedQuotation
      }
    }

    case CANCEL_QUOTATION_EDIT: {
      const quotation = state.quotations ? JSON.parse(JSON.stringify(state.quotations[state.selectedQuotationId])) : undefined
      return {
        ...state,
        selectedQuotationData: quotation,
        viewMode: VIEW_MODES.VIEW
      }
    }

    case SET_BREADCRUMB_CODE: {
      return {
        ...state,
        breadcrumbCode: action.code,
      }
    }

    case SET_BREADCRUMB: {
      const bc = mapBreadcrumb(action.code, state.breadcrumbCode, state.project, state.selectedQuotationData);
      return {
        ...state,
        breadcrumbCode: bc.length > 0 ? bc[bc.length - 1].id : undefined,
        breadcrumb: bc,
      }
    }

    case SET_PROJECT_GEOS: {
      const project = JSON.parse(JSON.stringify(state.selectedProjectData));
      project.geos = action.geos;
      return {
        ...state,
        selectedProjectData: project
      }
    }

    case SET_PROJECT_TITLE: {
      const project = JSON.parse(JSON.stringify(state.selectedProjectData));
      project.title = action.title;
      return {
        ...state,
        selectedProjectData: project
      }
    }

    case SET_PROJECT_SPONSOR: {
      const project = JSON.parse(JSON.stringify(state.selectedProjectData));
      project.sponsor = action.sponsor;
      return {
        ...state,
        selectedProjectData: project
      }
    }

    case SET_PROJECT_PM: {
      const project = JSON.parse(JSON.stringify(state.selectedProjectData));
      project.pm = action.pm;
      return {
        ...state,
        selectedProjectData: project
      }
    }

    case ADD_PROJECT_PROVIDER: {
      const project = JSON.parse(JSON.stringify(state.selectedProjectData));
      const provider = {
        id: uuid(),
        title: action.provider
      };
      project.providers.push(provider);

      return {
        ...state,
        selectedProjectData: project
      }
    }

    case REMOVE_PROJECT_PROVIDER: {
      const project = JSON.parse(JSON.stringify(state.selectedProjectData));
      project.providers = project.providers.filter(p => p.id !== action.providerId);

      return {
        ...state,
        selectedProjectData: project
      }
    }
    case SELECT_REGION_FOR_PROJECT: {
      const project = JSON.parse(JSON.stringify(state.selectedProjectData));
      project.selectedRegion = action.region;

      return {
        ...state,
        selectedProjectData: project
      }
    }
    case SET_PROJECT_VIEW_MODE: {
      const project = JSON.parse(JSON.stringify(state.selectedProjectData));
      project.viewMode = action.viewMode;

      return {
        ...state,
        selectedProjectData: project
      }
    }

    default:
      return state;
  }
};

export default Reducer;

const mapInvoiceList = (invoices) => {
  const invoiceList = [];
  if (invoices) {
    Object.keys(invoices).forEach((k) => {
      invoices[k].id = k;
      invoiceList.push(invoices[k]);
    });
  }

  return invoiceList;
};

const addModuleToSelectedQuotation = (quotation, module) => {
  const id = uuid();
  quotation.modules[id] = module;
  return quotation;
}

const addActivityToSelectedQuotation = (quotation, moduleId, activity) => {
  const id = uuid();
  quotation.modules[moduleId].activities[id] = activity
  return quotation;
}

const addResourceSelectedQuotation = (quotation, moduleId, activityId, resource) => {
  const id = uuid();
  if (!quotation.modules[moduleId].activities[activityId].resources) {
    quotation.modules[moduleId].activities[activityId].resources = {};
  }
  quotation.modules[moduleId].activities[activityId].resources[id] = resource;
  return quotation;
}

const mapProfessionalAndGeosToResources = (professionals, geos) => {
  const resources = {};
  if (professionals) {
    Object.keys(professionals).forEach((j) => {
      const resource = professionals[j];
      if (resource.isFeeGeoBased) {
        Object.keys(geos).forEach((k) => {
          const id = uuid();
          resources[id] = {
            id: id,
            fee: resource.fee,
            geo: geos[k].description,
            title: resource.title,
            isFeeGeoBased: resource.isFeeGeoBased
          };
        });
      } else {
        const id = uuid();
        resources[id] = {
          id: id,
          fee: resource.fee,
          geo: "",
          title: resource.title,
          isFeeGeoBased: resource.isFeeGeoBased
        };
      }
    });
  }

  return resources;
};

const mapBreadcrumb = (par_code, stateCode, project, quotation = undefined, breadcrumb = []) => {
  let code = stateCode;
  if (par_code) {
    code = par_code;
  }
  if (NAVIGATION_CODES.hasOwnProperty(code)) {
    let title = NAVIGATION_CODES[code].title;
    let url = NAVIGATION_CODES[code].url;

    if (project) {
      title = title.replace(NAVIGATION_REPLACERS.NAV_REPL_PROJECT_TITLE, project.title);
      url = url.replace(NAVIGATION_REPLACERS.NAV_REPL_PROJECT_ID, project.id);
    }

    if (quotation) {
      title = title.replace(NAVIGATION_REPLACERS.NAV_REPL_QUOTATION_CODE, quotation.code);
      url = url.replace(NAVIGATION_REPLACERS.NAV_REPL_QUOTATION_ID, quotation.id);
    }

    let bdItem = {
      ...NAVIGATION_CODES[code],
      id: code,
      title: title,
      url: url
    };

    breadcrumb.splice(0, 0, bdItem);

    if (NAVIGATION_CODES[code].hasOwnProperty("parent")) {
      mapBreadcrumb(NAVIGATION_CODES[code].parent, stateCode, project, quotation, breadcrumb);
    }
  }
  return breadcrumb;
};
