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
  SET_VIEW_MODE,
  INITIALIZE_NEW_QUOTATION,
  EDIT_SELECTED_QUOTATION,
  ADD_MODULE_TO_SELECTED_QUOTATION,
  REMOVE_MODULE_FROM_SELECTED_QUOTATION,
  ADD_ACTIVITY_TO_SELECTED_QUOTATION,
  REMOVE_ACTIVITY_FROM_SELECTED_QUOTATION,
  EDIT_ACTIVITY_IN_SELECTED_QUOTATION,
  SHOW_ACTIVITY_RESOURCE_MODAL,
  ADD_RESOURCE_TO_SELECTED_QUOTATION,
  REMOVE_RESOURCE_FROM_SELECTED_QUOTATION,
  EDIT_RESOURCE_IN_SELECTED_QUOTATION,
  HYDE_ACTIVITY_RESOURCE_MODAL
} from "../actions/actionsTypes";
import { VIEW_MODES } from "../constants/constants";
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
  }
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

      return {
        ...state,
        quotations: quotations,
        invoiceList: invoices,
        project: project
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
      return {
        ...state,
        viewMode: VIEW_MODES.VIEW,
        selectedQuotationId: action.quotation,
        selectedQuotationData: quotation
      };
    }
    case LOAD_STATIC_DATA: {
      return {
        ...state,
        professionals: action.professionals,
        baseModules: action.modules
      }
    }
    case SET_VIEW_MODE: {
      return {
        ...state,
        viewMode: action.viewMode
      }
    }
    case INITIALIZE_NEW_QUOTATION: {
      const emptyQuotation = {
        id: '0',
        code: '',
        status: 'IP',
        quotationCost: 0,
        quotationType: action.quotationType,
        modules: {},
      }
      return {
        ...state,
        selectedQuotationData: emptyQuotation,
        selectedQuotationId: '0',
        viewMode: VIEW_MODES.CREATE
      }
    }
    case EDIT_SELECTED_QUOTATION: {
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
      let updatedQuotation =  JSON.parse(JSON.stringify(state.selectedQuotationData));
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
      let updatedQuotation =  JSON.parse(JSON.stringify(state.selectedQuotationData));
      delete updatedQuotation.modules[action.moduleId].activities[action.activityId];
      return {
        ...state,
        selectedQuotationData: updatedQuotation
      }
    }
    case EDIT_ACTIVITY_IN_SELECTED_QUOTATION: {
      let updatedQuotation =  JSON.parse(JSON.stringify(state.selectedQuotationData));
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
          showModal: true
        }
      }
    }
    case HYDE_ACTIVITY_RESOURCE_MODAL: {
      return {
        ...state,
        resourceModalData: {
          activityId: undefined,
          moduleId: undefined,
          showModal: false
        }
      }
    }
    case ADD_RESOURCE_TO_SELECTED_QUOTATION: {
      let updatedQuotation =  JSON.parse(JSON.stringify(state.selectedQuotationData));
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
      let updatedQuotation = JSON.parse(JSON.stringify(state.selectedQuotationData));
      let updatedResource = updatedQuotation.modules[action.moduleId].activities[action.activityId].resources[action.resource.id];
      updatedResource.hours = action.resource.hours;
      updatedResource.cost = parseFloat(updatedResource.hourCost) * parseInt(updatedResource.hours);

      return {
        ...state,
        selectedQuotationData: updatedQuotation
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
  if(!quotation.modules[moduleId].activities[activityId].resources) {
    quotation.modules[moduleId].activities[activityId].resources = {};
  }
  quotation.modules[moduleId].activities[activityId].resources[id] = resource;
  return quotation;
}