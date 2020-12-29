import React from "react";
import { connect } from "react-redux";
import { getSelectedProjectId } from "../store/selectors/selector";
import Header from "../menu/header";
import Breadcrumb from "../common/breadcrumb";
import SideMenu from "../menu/side/sideMenu";
import Footer from "../footer/footer";
import ProjectMenu from "../menu/projectMenu";

const Main = ({selectedProject, children}) => {

  return (
    <div>
      <Header />
      <Breadcrumb />
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
    selectedProject: getSelectedProjectId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
