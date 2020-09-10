import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUser, getQuotation } from "../store/selectors/selector";
import { loadProjectAction } from "../store/actions/actionsCreator";
import { history } from "../App";
import Header from "../menu/header";
import SideMenu from "../menu/side/sideMenu";
import Footer from "../footer/footer";
import { FirebaseInstance } from '../App';

const Main = ({user, quotation, loadQuotation, children}) => {
  React.useEffect(() => {
    if (!quotation) {
      console.log('load');
      loadQuotation();
    }

    FirebaseInstance.auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
  });

  return (
    <div>
      <Header />
      <SideMenu />
      {children}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
    quotation: getQuotation(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadQuotation: () => dispatch(loadProjectAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
