import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getQuotation } from "../store/selectors/selector";
import { loadProjectAction } from "../store/actions/actionsCreator";
import { history } from "../App";
import Header from "../menu/header";
import SideMenu from "../menu/side/sideMenu";
import Footer from "../footer/footer";
import { FirebaseInstance } from '../App';
import ProjectMenu from "../menu/projectMenu";

const Main = ({quotation, loadQuotation, children}) => {
  React.useEffect(() => {
    FirebaseInstance.auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      } else {
        if (!quotation) {
          loadQuotation();
        }
      }
    });
  });

  /**TODO
   * change quotation check with selected project check for side menu
   */
  return (
    <div>
      <Header />
      <SideMenu />
      {quotation ? (
        <ProjectMenu />
      ) : null}
      {children}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quotation: getQuotation(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadQuotation: () => dispatch(loadProjectAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
