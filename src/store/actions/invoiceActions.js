import { FirebaseInstance } from '../../App';
import {
  SHOW_NEW_INVOICE,
  HIDE_NEW_INVOICE
} from './actionsTypes.js';

export const HideNewInvoice = () => {
  return dispatch => {
    return dispatch(
      {
        type: HIDE_NEW_INVOICE,
      }
    )
  }
}

export const ShowNewInvoice = () => {
  return dispatch => {
    return dispatch(
      {
        type: SHOW_NEW_INVOICE,
      }
    )
  }
}

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

    return FirebaseInstance.dataRef.ref(`projects/${projectId}/invoices/`).child(invoiceId).remove().then(() => {});
  }
}

export const setInvoiecStatus = (invoiceId, status) => {
  return (dispatch, getSate) => {
    const projectId = getSate().selectedProjectId;

    return FirebaseInstance.dataRef.ref(`projects/${projectId}/invoices/${invoiceId}/status`).set(status).then(() => {});
  }
}