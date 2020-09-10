import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route } from "react-router-dom";
import "./App.css";
import Firebase from "./firebase/firebase";
import { createBrowserHistory } from "history";
import Main from "./main/main";
import Budget from "./budget/budget";
import Login from "./login/login";
import Invoice from './invoice/invoice';
import { logoutAction, setUserAction } from "./store/actions/actionsCreator";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "materialize-css/dist/css/materialize.min.css";
export const history = createBrowserHistory();
export const FirebaseInstance = new Firebase();
library.add(fab, fas);

class App extends Component {
  componentDidMount() {
    FirebaseInstance.auth.onAuthStateChanged((user) => {
      this.props.setUser(user);
      if (user) {
        history.push("/budget");
      } else {
        history.push("/login");
      }
    });
  }

  render() {
    return (
      <Router history={history}>
        <Main>
          <Route path={"/login"} component={Login} />
          <Route path={"/budget"} component={Budget} />
          <Route path={"/invoice"} component={Invoice} />
        </Main>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
    setUser: (user) => dispatch(setUserAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
