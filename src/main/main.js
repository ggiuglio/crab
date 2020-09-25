import React from "react";
import { connect } from "react-redux";
import { getSelectedProject } from "../store/selectors/selector";
import Header from "../menu/header";
import SideMenu from "../menu/side/sideMenu";
import Footer from "../footer/footer";
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
