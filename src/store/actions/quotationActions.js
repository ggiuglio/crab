import {
  SELECT_QUOTATION
} from './actionsTypes.js';

import { FirebaseInstance } from '../../App';
import module from '../../quotation/module.js';

export const selectQuotation = (quotationId) => {
  return dispatch => {
    return dispatch(
      {
        type: SELECT_QUOTATION,
        quotation: quotationId
      }
    )
  }
};

export const addQuotation = (quotation) => {
  return (dispatch, getSate) => {
    const modules = quotation.modules;
    delete quotation.modules;

    const projectId = getSate().selectedProjectId;
    FirebaseInstance.dataRef.ref(`projects/${projectId}/quotations`).push(quotation).then((res) => {
      const id = res.path.pieces_[3];

      modules.forEach(m => {
        dispatch(addModule(m, id, projectId));
      });
    });
  }
};

export const addModule = (module, quotationId, projectId) => {
  const activities = module.activities;
  delete module.activities;

  return (dispatch) => {
    FirebaseInstance.dataRef.ref(`projects/${projectId}/quotations/${quotationId}/modules`).push(module).then((res) => {
      const moduleId = res.path.pieces_[5];

      Object.keys(activities).forEach((k) => {
        dispatch(addActivity(activities[k], moduleId, quotationId, projectId));
      });
    });
  }
};

export const addActivity = (activity, moduleId, quotationId, projectId) => {
  const resources = activity.resources;
  delete activity.resources;

  return (dispatch) => {
    FirebaseInstance.dataRef.ref(`projects/${projectId}/quotations/${quotationId}/modules/${moduleId}/activities`).push(activity).then((res) => {
      const activityId = res.path.pieces_[7];
      if (resources) {
        resources.forEach(r => {
          dispatch(addResource(r, activityId, moduleId, quotationId, projectId));
        });
      }
    });
  }
};

export const addResource = (resource, activityId, moduleId, quotationId, projectId) => {

  return (dispatch) => {
    FirebaseInstance.dataRef.ref(`projects/${projectId}/quotations/${quotationId}/modules/${moduleId}/activities/${activityId}/resources`).push(resource).then((res) => {
      const resourceId = res.path.pieces_[9];
    });
  }
};



