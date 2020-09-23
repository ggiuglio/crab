import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route } from "react-router-dom";
import "./App.css";
import Firebase from "./firebase/firebase";
import { createBrowserHistory } from "history";
import Main from "./main/main";
import Projects from "./project/projects";
import Quotation from "./quotation/quotation";
import Quotations from "./quotation/quotations";
import Invoice from "./invoice/invoice";
import Login from "./login/login";
import { getProjects } from "./store/selectors/selector";
import { setUserAction, loadProjectsAction } from "./store/actions/actionsCreator";
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
      if (!user) {
        history.push("/login");
      } else {
        if (!this.props.projects) {
          this.props.loadProjects();
        }
      }
    });
  }

  render() {
    return (
      <Router history={history}>
        <Main>
          <Route exact path='/'component={Projects} />
          <Route path={"/login"} component={Login} />
          <Route path={"/projects"} component={Projects} />
          <Route path={"/quotations"} component={Quotations} />
          <Route path={"/quotation"} component={Quotation} />
          <Route path={"/invoice"} component={Invoice} />
        </Main>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: getProjects(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUserAction(user)),
    loadProjects: () => dispatch(loadProjectsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
