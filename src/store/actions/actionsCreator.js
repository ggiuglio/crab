import {
  LOGIN_ERROR,
  RESET_LOGIN_ERROR,
  SET_USER,
  LOAD_PROJECTS,
  LOAD_PROJECT,
  SHOW_NEW_INVOICE,
  HIDE_NEW_INVOICE,
  CLEAR_USER_DATA,
  SELECT_PROJECT,
  SELECT_QUOTATION,
  LOAD_PROFESSIONALS
} from './actionsTypes.js'
import { FirebaseInstance } from '../../App';
import { history } from '../../App';

export const loginAction = (username, password) => {
  return dispatch => {
    FirebaseInstance.doSignInWithEmailAndPassword(username, password)
      .then(() => { })
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

export const clearUserData = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_USER_DATA
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
      user: user ? { email: user.email, uid: user.uid } : null
    });
  }
}

export const loadProjectsAction = () => {
  return (dispatch, getSate) => {

    const uid = getSate().user.uid;
    return FirebaseInstance.dataRef.ref(`userProjects/${uid}/projects`).on('value', snapshot => {
      const projects = JSON.parse(JSON.stringify(snapshot.val()));

      return dispatch(
        {
          type: LOAD_PROJECTS,
          projects: projects
        }
      )
    });
  }
}

export const loadProjectAction = (projectId) => {
  return (dispatch) => {
    dispatch(
      {
        type: LOAD_PROJECT,
        project: undefined
      }
    )

    return FirebaseInstance.dataRef.ref(`projects/${projectId}`).on('value', snapshot => {
      const project = JSON.parse(JSON.stringify(snapshot.val()));

      return dispatch(
        {
          type: LOAD_PROJECT,
          project: project
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

export const selectProject = (projectId) => {
  return dispatch => {
    dispatch(loadProjectAction(projectId));
    return dispatch(
      {
        type: SELECT_PROJECT,
        project: projectId
      }
    )
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

export const loadProfessionals = () => {
  return dispatch => {
    return FirebaseInstance.dataRef.ref(`staticData/professionals`).on('value', snapshot => {
      const professionals = JSON.parse(JSON.stringify(snapshot.val()));

      return dispatch(
        {
          type: LOAD_PROFESSIONALS,
          projects: professionals
        }
      )
    });
  }
};

