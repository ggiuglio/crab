import React, { useState } from "react";
import { connect } from "react-redux";
import {
  loginAction,
  resetLoginErrorAction,
} from "../store/actions/genericActions";
import { getUser, getLoginError } from "../store/selectors/genericSelectors";
import { history } from "../App";
import "./css/login.css";

const Login = ({ login, loginError, resetLoginError, user }) => {
  React.useEffect(() => {
    if (user) {
      history.push("/");
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
    <div id="login-container" className="container valign-page-center">
      <div className="row">
        <div className="col s12 m6 offset-m3">
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
            <div className="input-field center">
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
