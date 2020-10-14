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
  LOAD_STATIC_DATA
} from "../actions/actionsTypes";

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
      const project = action.project ? {...action.project.project, id: action.projectId} : undefined;

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
        invoiceList: [],
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
      return {
        ...state,
        selectedQuotationId: action.quotation,
      };
    }
    case LOAD_STATIC_DATA: {
      return {
        ...state,
        professionals: action.professionals,
        baseModules: action.modules
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