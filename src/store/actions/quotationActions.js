import {
  SELECT_QUOTATION,
  INITIALIZE_NEW_QUOTATION,
  EDIT_SELECTED_QUOTATION,
  ADD_MODULE_TO_SELECTED_QUOTATION,
  REMOVE_MODULE_FROM_SELECTED_QUOTATION,
  ADD_ACTIVITY_TO_SELECTED_QUOTATION,
  REMOVE_ACTIVITY_FROM_SELECTED_QUOTATION,
  EDIT_ACTIVITY_IN_SELECTED_QUOTATION,
  SHOW_ACTIVITY_RESOURCE_MODAL
} from './actionsTypes.js';
import { FirebaseInstance } from '../../App';

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

  let moduleCode = module.code + '-' + Object.keys(module.geo)[0];
  moduleCode = moduleCode.replace(/\s+/g, "");
  module.code = moduleCode;

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

export const startNewQuotation = (type) => {
  return dispatch => {
    return dispatch({
      type: INITIALIZE_NEW_QUOTATION,
      quotationType: type
    });
  }
}

export const editSelectedQuotation = (quotationCode) => {
  return dispatch => {
    return dispatch({
      type: EDIT_SELECTED_QUOTATION,
      code: quotationCode
    })
  }
}

export const addModuleToSelectedQuotation = (module) => {
  return dispatch => {
    return dispatch({
      type: ADD_MODULE_TO_SELECTED_QUOTATION,
      module: module
    })
  }
}

export const removeModuleFromSelectedQuotation = (moduleId) => {
  return dispatch => {
    return dispatch({
      type: REMOVE_MODULE_FROM_SELECTED_QUOTATION,
      moduleId: moduleId
    })
  }
}

export const addActivityToSelectedQuotation = (moduleId, activity) => {
  return dispatch => {
    return dispatch({
      type: ADD_ACTIVITY_TO_SELECTED_QUOTATION,
      moduleId: moduleId,
      activity: activity
    })
  }
}

export const removeActivityFromSelectedQuotation = (moduleId, activityId) => {
  return dispatch => {
    return dispatch({
      type: REMOVE_ACTIVITY_FROM_SELECTED_QUOTATION,
      moduleId: moduleId,
      activityId: activityId
    })
  }
}

export const editActivityInSelectedQuotation = (moduleId, activity) => {
  return dispatch => {
    return dispatch({
      type: EDIT_ACTIVITY_IN_SELECTED_QUOTATION,
      moduleId: moduleId,
      activity: activity
    })
  }
}

export const showActivityResourceModal = (moduleId, activityId) => {
  return dispatch => {
    return dispatch({
      type: SHOW_ACTIVITY_RESOURCE_MODAL,
      moduleId: moduleId,
      activityId: activityId
    })
  }
} 


