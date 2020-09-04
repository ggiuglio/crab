import React, { useState } from "react";
import { connect } from "react-redux";
import {
  loginAction,
  resetLoginErrorAction,
} from "../store/actions/actionsCreator";
import { getUser, getLoginError } from "../store/selectors/selector";
import { history } from "../App";
import Header from "../menu/header";
import SideMenu from '../menu/side/sideMenu';

const Login = ({ login, loginError, resetLoginError, user }) => {
  React.useEffect(() => {
    if (user) {
      history.push("/crab/budget");
    }
  }, [user]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userChange = (event) => {
    setUsername(event.target.value);
    resetLoginError();
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
    resetLoginError();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password);
  };

  const checkDisable = !username || !password;

  return (
    <div className="App">
      <Header></Header>
      <SideMenu></SideMenu>
      <div className="container valign-page-center">
        <form className="white" onSubmit={(e) => handleSubmit(e)}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={username}
              onChange={(e) => userChange(e)}
            ></input>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => passwordChange(e)}
            ></input>
          </div>
          <div className="input-field">
            <button
              className="btn indigo lighten-1 z-depth-0"
              type="submit"
              disabled={checkDisable}
            >
              Login
            </button>
            <div className="center red-text">
              {loginError ? <p>{loginError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginError: getLoginError(state),
    user: getUser(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(loginAction(username, password)),
    resetLoginError: () => dispatch(resetLoginErrorAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
