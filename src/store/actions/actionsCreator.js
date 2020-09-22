import {
  LOGIN_ERROR,
  RESET_LOGIN_ERROR,
  SET_USER,
  LOAD_PROJECT,
  SHOW_NEW_INVOICE,
  HIDE_NEW_INVOICE,
  CLEAR_USER_DATA,
  SELECT_QUOTATION
} from './actionsTypes.js'
import { FirebaseInstance } from '../../App';
import { history } from '../../App';

export const loginAction = (username, password) => {
  return dispatch => {
    FirebaseInstance.doSignInWithEmailAndPassword(username, password)
      .then(() => {})
      .catch(() => {
        dispatch({
          type: LOGIN_ERROR,
          error: "Wrong username or password"
        })
      });
  }
}

export const resetLoginErrorAction = () => {
  return dispatch => {
    dispatch({
      type: RESET_LOGIN_ERROR
    });
  }
}

export const logoutAction = () => {
  return dispatch => {
    FirebaseInstance.doSignOut();
    dispatch({
      type: CLEAR_USER_DATA
    });
  }
}

export const setUserAction = (user) => {
  return dispatch => {
    dispatch({
      type: SET_USER,
      user: user ? { email: user.email } : null
    });
  }
}

export const loadProjectAction = () => {
  return (dispatch, getSate) => {
    const projectId = getSate().selectedProject;    
    
    return FirebaseInstance.dataRef.ref(`projects/${projectId}`).on('value', snapshot => {
      const projects = JSON.parse(JSON.stringify(snapshot.val()));

      return dispatch(
        {
          type: LOAD_PROJECT,
          project: projects
        }
      )
    })
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

export const HideNewInvoice = () => {
  return dispatch => {
    return dispatch(
      {
        type: HIDE_NEW_INVOICE,
      }
    )
  }
}

export const createNewInvoice = (invoice) => {
  return (dispatch, getSate) => {
    const projectId = getSate().selectedProject;

    return FirebaseInstance.dataRef.ref(`projects/${projectId}/invoices`).push(invoice).then(() => {
      dispatch({
        type: HIDE_NEW_INVOICE,
      });
    });
  }
}

export const selectQuotation = (quotationId) => {
  return dispatch => {
    return dispatch(
      {
        type: SELECT_QUOTATION,
        quotation: quotationId
      }
    )
  }
}

