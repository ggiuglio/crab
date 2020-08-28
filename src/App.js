import React, { Component } from 'react';
import { connect } from "react-redux";
import { Router, Route } from 'react-router-dom';
import './App.css';
import Firebase from './firebase/firebase';
import { createBrowserHistory } from "history";
import Main from './main/main';
import Budget from './budget/budget';
import Login from './login/login'
import { 
  logoutAction,
  setUserAction
} from './store/actions/actionsCreator';
export const history = createBrowserHistory()
export const FirebaseInstance = new Firebase();

class App extends Component {
  componentDidMount() {
    FirebaseInstance.auth.onAuthStateChanged((user) => {
      this.props.setUser(user);
      if(user) {
        history.push('/crab/budget');
      } else {
        history.push('/login');
      }
    });
  }

  render() {
    return (
      <div>
      <Router history={history}>
        <Route path={'/login'} component={Login} />
        <Route path={'/crab'} component={Main} />
        <Route path={'/crab/budget'} component={Budget} />
      </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutAction()),
    setUser: (user) => dispatch(setUserAction(user))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
