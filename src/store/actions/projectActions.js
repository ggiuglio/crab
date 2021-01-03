import { FirebaseInstance } from '../../App';
import {
  INITIALIZE_NEW_PROJECT,
  SET_PROJECT_TITLE,
  SET_PROJECT_GEOS,
  ADD_PROJECT_PROVIDER,
  REMOVE_PROJECT_PROVIDER,
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

export const setProjectPM = (pm) => {
  return dispatch => {
    return dispatch(
      {
        type: SET_PROJECT_PM,
        pm: pm
      }
    )
  }
}

export const addProjectProvider = (provider) => {
  return dispatch => {
    return dispatch(
      {
        type: ADD_PROJECT_PROVIDER,
        provider: provider
      }
    )
  }
}

export const removeProjectProvider = (providerId) => {
  return dispatch => {
    return dispatch(
      {
        type: REMOVE_PROJECT_PROVIDER,
        providerId: providerId
      }
    )
  }
}