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
} from "../actions/actionsTypes";

export const INITIAL_STATE = {
  people: {
    "001": {
      title: "PM",
      geobool: false,
      fee: 120,
    },
    "002": {
      title: "CRA",
      geobool: true,
      fee: 100,
    },
    "003": {
      title: "DM",
      geobool: false,
      fee: 90,
    },
    "004": {
      title: "IT",
      geobool: false,
      fee: 60,
    },
    "005": {
      title: "CTA",
      geobool: false,
      fee: 40,
    },
    "006": {
      title: "LCRA",
      geobool: false,
      fee: 100,
    },
    "007": {
      title: "MW",
      geobool: false,
      fee: 150,
    },
    "008": {
      title: "PhV",
      geobool: false,
      fee: 150,
    },
    "009": {
      title: "STAT",
      geobool: false,
      fee: 150,
    },
    "010": {
      title: "DIR",
      geobool: false,
      fee: 120,
    },
  },
  projects: {
    uhruhf44uhf: {
      title: "PURE",
      Sponsor: "CoreQuest Sagl",
      PM: "Tommaso Prosdocimi",
      GEO: {
        siughpisdfug: {
          geocode: "General",
        },
        bqpoirufb: {
          geocode: "South Europe - ITA,SPA",
          sites: {
            ijacbpibc: {
              sitecode: "0101",
            },
            oiadfvoaubv: {
              sitecode: "0102",
            },
          },
        },
        nasodncp: {
          geo: "North Europe - DK,SWE",
          sites: {
            havdboi: {
              sitecode: "0201",
            },
            oiabc: {
              sitecode: "0202",
            },
          },
        },
      },
      creationDate: "17/1/2020",
      endDate: "",
      status: "open",
    },
  },
  selectedProject: undefined,
  selectedQuotation: undefined,
  quotations: undefined,
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
      // GET Projects from DB
      return {
        ...state,
      };
    }
    case LOAD_PROJECT: {
      const quotations = action.project.quotations;
      const invoices = mapInvoiceList(action.project.invoices);

      return {
        ...state,
        quotations: quotations,
        invoiceList: invoices,
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
        selectedProject: null,
        selectedQuotation: null,
        quotation: null,
        invoiceList: null,
      };
    }
    case SELECT_PROJECT: {
      return {
        ...state,
        selectedProject: action.project,
      };
    }
    case SELECT_QUOTATION: {
      return {
        ...state,
        selectedQuotation: action.quotation,
      };
    }

    default:
      return state;
  }
};

export default Reducer;

const mapInvoiceList = (invoices) => {
  const invoiceList = [];
  Object.keys(invoices).forEach((k) => {
    invoices[k].id = k;
    invoiceList.push(invoices[k]);
  });

  return invoiceList;
};
