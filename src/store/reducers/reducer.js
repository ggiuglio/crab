import {
    SET_USER,
    LOGIN_ERROR,
    RESET_LOGIN_ERROR,
    LOAD_PROJECT,
    SHOW_NEW_INVOICE,
    HIDE_NEW_INVOICE
} from '../actions/actionsTypes'

export const INITIAL_STATE = {
    quotation: undefined,
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
            const quotations = mapQuotationList(action.project.quotations);
            const invoices = mapInvoiceList(action.project.invoices);

            return {
                ...state,
                quotation: quotations[0],
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

        default:
            return state
    }
}

export default Reducer

const mapQuotationList = (quotations) => {
    const quotationList = [];
    Object.keys(quotations).forEach(k => {
        quotations[k].id = k;
        quotationList.push(mapQuotation(quotations[k]));
    });

    return quotationList;
}

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

const mapInvoiceList = (invoices => {
    const invoiceList = [];
    Object.keys(invoices).forEach(k => {
        invoices[k].id = k;
        invoiceList.push(invoices[k]);
    });

    return invoiceList;
});