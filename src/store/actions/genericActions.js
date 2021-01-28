import {
  LOGIN_ERROR,
  RESET_LOGIN_ERROR,
  SET_USER,
  LOAD_STATIC_DATA,
  CLEAR_USER_DATA,
  SET_BREADCRUMB,
  SET_BREADCRUMB_CODE,
  SET_PROJECT_MENU
} from './actionsTypes.js';
import { FirebaseInstance } from '../../App';

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
          modules: data.baseModules,
          regions: data.regions
        }
      )
    });
  }
};

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

export const setProjectMenuAction = (code) => {
  return dispatch => {
    dispatch({
      type: SET_PROJECT_MENU,
      code: code
    });
  }
}