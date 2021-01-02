import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route } from "react-router-dom";
import "./App.css";
import Firebase from "./firebase/firebase";
import { createBrowserHistory } from "history";
import Main from "./main/main";
import Projects from "./project/projects";
import NewProject from "./project/newProject";
import Invoice from "./invoice/invoice";
import Dashboard from "./dashboard/dashboard";
import Budget from "./budget/budget";
import Analytics from "./analytics/analytics";
import Login from "./login/login";
import { getProjects } from "./store/selectors/selector";
import { setUserAction, loadProjectsAction, loadStaticData, setBreadcrumbCodeAction } from "./store/actions/actionsCreator";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Quotation from "./quotation/quotation";
import Project from "./project/project";
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
          this.props.loadData();
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
          <Route path={"/new-project"} component={NewProject} />
          <Route exact path={"/project"} component={Project} />
          <Route path={"/project/quotation"} component={Quotation} />
          <Route path={"/project/new-quotation"} component={Quotation} />
          <Route path={"/project/dashboard"} component={Dashboard} />
          <Route path={"/project/invoices"} component={Invoice} />
          <Route path={"/project/budget"} component={Budget} />
          <Route path={"/project/analytics"} component={Analytics} />
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
    loadData: () => dispatch(loadStaticData()),
    setBreadcrumbCode: (code) => dispatch(setBreadcrumbCodeAction(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
