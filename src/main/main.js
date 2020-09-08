import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../store/selectors/selector";
import { history } from "../App";
import Header from "../menu/header";
import SideMenu from "../menu/side/sideMenu";
import Footer from "../footer/footer";
import { FirebaseInstance } from '../App';

class Main extends Component {

  componentDidMount() {
    FirebaseInstance.auth.onAuthStateChanged((user) => {
      if (!this.props.user) {
        history.push("/login");
      }
    });
  }

  render() {
    return (
      <div>
        <Header />
        <SideMenu />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
