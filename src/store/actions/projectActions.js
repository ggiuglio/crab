import { FirebaseInstance } from '../../App';
import {
  LOAD_PROJECTS,
  LOAD_PROJECT,
  SELECT_PROJECT,
  INITIALIZE_NEW_PROJECT,
  SET_PROJECT_TITLE,
  SET_PROJECT_GEOS,
  ADD_PROJECT_PROVIDER,
  REMOVE_PROJECT_PROVIDER,
  SET_PROJECT_PM,
  SELECT_REGION_FOR_PROJECT,
  SET_PROJECT_VIEW_MODE,
  CANCEL_PROJECT_EDIT
} from './actionsTypes.js';
import { history } from '../../App';

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
    return FirebaseInstance.dataRef.ref(`projects/${projectId}`).on('value', snapshot => {
      const project = JSON.parse(JSON.stringify(snapshot.val()));

      return dispatch(
        {
          type: LOAD_PROJECT,
          project: project,
          projectId: projectId
        }
      )
    });
  }
}

export const createNewProject = (project) => {
  return (getSate) => {
    const userId = getSate().user.uid;
    const projectData = {
      project: { ...project, ownerId: userId },
      quotations: {},
      invoices: {}
    }
    

    return FirebaseInstance.projects.push(projectData).then((res) => {
      const id = res.path.pieces_[1];
      project.id = id;

      const userProject = {
        id: project.id,
        title: project.title,
        pm: project.pm,
        creationDate: project.creationDate,
        status: project.status
      };

      return FirebaseInstance.dataRef.ref(`userProjects/${userId}/projects`).push(userProject).then((res) => {
        history.push('/projects')
      });
    });
  }
}

export const editSelectedProject = (project, projcetId) => {
  return (dispatch, getSate) => {
    const userId = getSate().user.uid;
    const userProject = {
      id: projcetId,
      title: project.title,
      pm: project.pm,
      creationDate: project.creationDate,
      status: project.status
    };
      return FirebaseInstance.dataRef.ref(`projects/${projcetId}/project`).set(project).then((res) => {
        return FirebaseInstance.dataRef.ref(`userProjects/${userId}/projects/${projcetId}`).set(userProject).then((res) => {

      });
    });
  }
}



export const selectProject = (projectId) => {
  return dispatch => {
    return dispatch(
      {
        type: SELECT_PROJECT,
        project: projectId
      }
    )
  }
}

export const initializeProject = () => {
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

export const selectProjectRegion = (region) => {
  return dispatch => {
    return dispatch(
      {
        type: SELECT_REGION_FOR_PROJECT,
        region: region
      }
    )
  }
}

export const setProjectViewMode = (viewMode) => {
  return dispatch => {
    return dispatch(
      {
        type: SET_PROJECT_VIEW_MODE,
        viewMode: viewMode
      }
    )
  }
}

export const cancelProjectEdit = () => {
  return dispatch => {
    return dispatch(
      {
        type: CANCEL_PROJECT_EDIT
      }
    )
  }
}