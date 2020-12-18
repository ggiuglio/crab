import {
  SELECT_QUOTATION,
  INITIALIZE_NEW_QUOTATION,
  SET_SELECTED_QUOTATION_CODE,
  SET_SELECTED_QUOTATION_PROVIDER,
  ADD_MODULE_TO_SELECTED_QUOTATION,
  REMOVE_MODULE_FROM_SELECTED_QUOTATION,
  ADD_ACTIVITY_TO_SELECTED_QUOTATION,
  REMOVE_ACTIVITY_FROM_SELECTED_QUOTATION,
  EDIT_ACTIVITY_IN_SELECTED_QUOTATION,
  SHOW_ACTIVITY_RESOURCE_MODAL,
  ADD_RESOURCE_TO_SELECTED_QUOTATION,
  REMOVE_RESOURCE_FROM_SELECTED_QUOTATION,
  EDIT_RESOURCE_IN_SELECTED_QUOTATION,
  HYDE_ACTIVITY_RESOURCE_MODAL,
  EDIT_DEFAULT_RESOURCE_COST_IN_SELECTED_QUOTATION,
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

export const addQuotation = () => {
  return (dispatch, getSate) => {
    const projectId = getSate().selectedProjectId;
    const quotation = JSON.parse(JSON.stringify(getSate().selectedQuotationData));

    const modules = quotation.modules;
    delete quotation.modules;
    delete quotation.id;
    FirebaseInstance.dataRef.ref(`projects/${projectId}/quotations`).push(quotation).then((res) => {
      const id = res.path.pieces_[3];

      Object.keys(modules).forEach((k) => {
        dispatch(addModule(modules[k], id, projectId));
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
        Object.keys(resources).forEach((k) => {
          dispatch(addResource(resources[k], activityId, moduleId, quotationId, projectId));
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

export const editSelectedQuotationCode = (quotationCode) => {
  return dispatch => {
    return dispatch({
      type: SET_SELECTED_QUOTATION_CODE,
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

export const addResourceToSelectedQuotation = (moduleId, activityId, resource) => {
  return dispatch => {
    return dispatch({
      type: ADD_RESOURCE_TO_SELECTED_QUOTATION,
      moduleId: moduleId,
      activityId: activityId,
      resource: resource
    })
  }
}

export const removeResourceFromSelectedQuotation = (moduleId, activityId, resourceId) => {
  return dispatch => {
    return dispatch({
      type: REMOVE_RESOURCE_FROM_SELECTED_QUOTATION,
      moduleId: moduleId,
      activityId: activityId,
      resourceId: resourceId
    })
  }
}

export const editResourceInSelectedQuotation = (moduleId, activityId, resource) => {
  return dispatch => {
    return dispatch({
      type: EDIT_RESOURCE_IN_SELECTED_QUOTATION,
      moduleId: moduleId,
      activityId: activityId,
      resource: resource
    })
  }
}

export const showActivityResourceModal = (moduleId, moduleGeo, activityId) => {
  return dispatch => {
    return dispatch({
      type: SHOW_ACTIVITY_RESOURCE_MODAL,
      moduleId: moduleId,
      moduleGeo: moduleGeo,
      activityId: activityId
    })
  }
}

export const hideActivityResourceModal = () => {
  return dispatch => {
    return dispatch({
      type: HYDE_ACTIVITY_RESOURCE_MODAL
    });
  }
}

export const editDefaultResourceCostInSelectedQuotation = (resourceId, resourceFee) => {
  return dispatch => {
    return dispatch({
      type: EDIT_DEFAULT_RESOURCE_COST_IN_SELECTED_QUOTATION,
      resourceId: resourceId,
      resourceFee: resourceFee
    })
  }

}

export const setSelectedQuotationProvider = (provider) => {
  return dispatch => {
    return dispatch({
      type: SET_SELECTED_QUOTATION_PROVIDER,
      provider: provider
    })
  }
}