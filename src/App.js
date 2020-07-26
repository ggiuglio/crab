import React, { Component } from 'react';
import { connect } from "react-redux";
import { Router, Route } from 'react-router-dom';
import './App.css';
import Firebase from './firebase/firebase';
import createHistory from 'history/createBrowserHistory';
import Main from './main/main';
import Login from './login/login'
import { 
  logoutAction,
  setUserAction
} from './store/actions/actionsCreator';
export const history = createHistory()
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
