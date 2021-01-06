export const getSelectedProject = (state) => state.selectedProjectData;
export const getProjects = (state) => state.projects ? mapProjectList(state.projects) : undefined;
export const getProject = (state) => state.project ? state.project : undefined;
export const getSelectedProjectId = (state) => state.selectedProjectId;

const mapProjectList = (projects) => {
  const projectList = [];
  Object.keys(projects).forEach((k) => {
    projectList.push(projects[k]);
  });

  return projectList.reverse();
};