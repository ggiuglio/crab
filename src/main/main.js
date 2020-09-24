import React from "react";
import { connect } from "react-redux";
import { getSelectedProject } from "../store/selectors/selector";
// import { loadProjectAction } from "../store/actions/actionsCreator";
// import { history } from "../App";
import Header from "../menu/header";
import SideMenu from "../menu/side/sideMenu";
import Footer from "../footer/footer";
// import { FirebaseInstance } from '../App';
import ProjectMenu from "../menu/projectMenu";

const Main = ({selectedProject, children}) => {

  return (
    <div>
      <Header />
      <SideMenu />
      {selectedProject ? (
        <ProjectMenu />
      ) : null}
      {children}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedProject: getSelectedProject(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loadQuotation: () => dispatch(loadProjectAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
