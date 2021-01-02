import { FirebaseInstance } from '../../App';
import {
  INITIALIZE_NEW_PROJECT,
  SET_PROJECT_TITLE,
  SET_PROJECT_GEOS,
  SET_PROJECT_PROVIDERS,
  SET_PROJECT_PM
} from './actionsTypes.js';

export const InitializeProject = () => {
  return dispatch => {
    return dispatch(
      {
        type: INITIALIZE_NEW_PROJECT
      }
    )
  }
}

export const setProjectTitle = (title) => {
  return dispatch => {
    return dispatch(
      {
        type: SET_PROJECT_TITLE,
        title: title
      }
    )
  }
}

export const setProjectGeos = (geos) => {
  return dispatch => {
    return dispatch(
      {
        type: SET_PROJECT_GEOS,
        geos: geos
      }
    )
  }
}

export const setProjecPM = (pm) => {
  return dispatch => {
    return dispatch(
      {
        type: SET_PROJECT_PM,
        pm: pm
      }
    )
  }
}