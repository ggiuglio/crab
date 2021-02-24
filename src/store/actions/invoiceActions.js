import { FirebaseInstance } from '../../App';
import {
  SET_INVOICE_FILTER,
  CLEAR_INVOICE_FILTER
} from './actionsTypes.js';

export const createNewInvoice = (invoice) => {
  return (dispatch, getSate) => {
    const projectId = getSate().selectedProjectId;

    return FirebaseInstance.dataRef.ref(`projects/${projectId}/invoices`).push(invoice).then(() => {
    });
  }
}

export const deleteInvoice = (invoiceId) => {
  return (dispatch, getSate) => {
    const projectId = getSate().selectedProjectId;

    return FirebaseInstance.dataRef.ref(`projects/${projectId}/invoices/`).child(invoiceId).remove().then(() => { });
  }
}

export const setInvoiecStatus = (invoiceId, status) => {
  return (dispatch, getSate) => {
    const projectId = getSate().selectedProjectId;

    return FirebaseInstance.dataRef.ref(`projects/${projectId}/invoices/${invoiceId}/status`).set(status).then(() => { });
  }
}

export const setInvoiceFilter = (filterType, filterValue) => {
  return (dispatch) => {
    return dispatch({
      type: SET_INVOICE_FILTER,
      filterType: filterType,
      filterValue: filterValue
    })
  }
}

export const clearInvoiceFilter = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_INVOICE_FILTER
    })
  }
}

