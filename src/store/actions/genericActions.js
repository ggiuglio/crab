import {
  LOGIN_ERROR,
  RESET_LOGIN_ERROR,
  SET_USER,
  LOAD_STATIC_DATA,
  CLEAR_USER_DATA,
  SET_BREADCRUMB,
  SET_BREADCRUMB_CODE
} from './actionsTypes.js';
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

export const loadStaticData = () => {
  return dispatch => {
    return FirebaseInstance.dataRef.ref(`staticData`).on('value', snapshot => {
      const data = JSON.parse(JSON.stringify(snapshot.val()));

      return dispatch(
        {
          type: LOAD_STATIC_DATA,
          professionals: data.professionals,
          modules: data.baseModules
        }
      )
    });
  }
};

export const createNewProject = (project) => {
  return (dispatch, getSate) => {
    const userId = getSate().user.uid;
    const projectData = {
      project: {...project, ownerId: userId },
      quotations: {},
      invoices: {}
    }

    return FirebaseInstance.projects.push(projectData).then((res) => {
      const id = res.path.pieces_[1];
      project.id = id;

      return FirebaseInstance.dataRef.ref(`userProjects/${userId}/projects`).push(project).then((res) => {
        history.push('/projects')
      });
    });
  }
}

export const setBreadcrumbCodeAction = (code) => {
  return dispatch => {
    dispatch({
      type: SET_BREADCRUMB_CODE,
      code: code
    });
  }
}
export const setBreadcrumbAction = (code = undefined) => {
  return dispatch => {
    dispatch({
      type: SET_BREADCRUMB,
      code: code
    });
  }
}