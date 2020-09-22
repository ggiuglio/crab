import {
    SET_USER,
    LOGIN_ERROR,
    RESET_LOGIN_ERROR,
    LOAD_PROJECT,
    SHOW_NEW_INVOICE,
    HIDE_NEW_INVOICE,
    CLEAR_USER_DATA,
    SELECT_QUOTATION
} from '../actions/actionsTypes'

export const INITIAL_STATE = {
    selectedProject: 'uhruhf44uhf',
    selectedQuotation: undefined,
    quotations: undefined,
    invoiceList: [],
    showNewInvoice: false
 };

const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginError: action.error
            }
        }
        case RESET_LOGIN_ERROR: {
            return {
                ...state,
                loginError: ''
            }
        }
        case LOAD_PROJECT: {
            const quotations = action.project.quotations;
            const invoices = mapInvoiceList(action.project.invoices);

            return {
                ...state,
                quotations: quotations,
                invoiceList: invoices
            }
        }
        case SHOW_NEW_INVOICE: {
            return {
                ...state,
                showNewInvoice: true
            }
        }
        case HIDE_NEW_INVOICE: {
            return {
                ...state,
                showNewInvoice: false
            }
        }
        case CLEAR_USER_DATA: {
            return {
                ...state,
                quotation: null,
                invoiceList: null
            }
        }
        case SELECT_QUOTATION: {
            return {
                ...state,
                selectedQuotation: action.quotation
            }
        }

        default:
            return state
    }
}

export default Reducer



const mapInvoiceList = (invoices => {
    const invoiceList = [];
    Object.keys(invoices).forEach(k => {
        invoices[k].id = k;
        invoiceList.push(invoices[k]);
    });

    return invoiceList;
});