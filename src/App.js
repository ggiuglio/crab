import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route } from "react-router-dom";
import "./App.css";
import Firebase from "./firebase/firebase";
import { createBrowserHistory } from "history";
import Main from "./main/main";
import Projects from "./project/projects";
import Invoice from "./invoice/invoice";
import Quotations from "./quotation/quotations";
import Budget from "./budget/budget";
import Analytics from "./analytics/analytics";
import Login from "./login/login";
import { getProjects } from "./store/selectors/projectSelectors";
import { loadProjectsAction } from "./store/actions/projectActions";
import { setUserAction, loadStaticData } from "./store/actions/genericActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Quotation from "./quotation/quotation";
import QuotationPrint from "./quotation/template/quotation-print";
import NewProject from "./project/newProject";
import ProjectDashboard from "./project/projectDashboard";
import ProjectSettings from "./projectSettings/projectSettings";

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
          <Route exact path='/' component={Projects} />
          <Route path={"/login"} component={Login} />
          <Route path={"/projects"} component={Projects} />
          <Route path={"/new-project"} component={NewProject} />
          <Route exact path={"/project"} component={ProjectDashboard} />
          <Route path={"/project/settings"} component={ProjectSettings} />
          <Route path={"/project/quotation"} component={Quotation} />
          <Route path={"/project/new-quotation"} component={Quotation} />
          <Route path={"/project/quotations"} component={Quotations} />
          <Route path={"/project/invoices"} component={Invoice} />
          <Route path={"/project/budget"} component={Budget} />
          <Route path={"/project/analytics"} component={Analytics} />
          <Route path={"/print/project/quotation/"} component={QuotationPrint} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
