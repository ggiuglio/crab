import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { loginAction, resetLoginErrorAction } from '../store/actions/actionsCreator';
import { getUser, getLoginError} from '../store/selectors/selector';
import { history } from '../App';

const LoginPanelStyled = styled.div`
  width: 400px;
  margin-top: Calc(50vh - 150px);
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  padding: 10px;
  box-sizing: border-box;
  display: flex-box;
  @media (max-width: 768px) {
   margin: 10px;
   margin-top: Calc(50vh - 150px);
   width: calc(100vw - 20px);
   border: none;
  }
`;
const InputFieldStyled = styled.input`
  font-size: 16px;
  box-sizing: border-box;
  padding: 2px 5px;
  width: 100%;
  margin-bottom: 10px;
`;
const LabelStyled = styled.label`
  font-size: 14px;
`;
const ErrorLabel = styled.label`
  font-size: 14px;
  color: red;
`;
const ButtonStyled = styled.input`
  width: 100%;
  height: 35px;
  box-sizing: border-box;
  margin-top: 10px;
  background-color: #eeeeee;
  border: none;
  outline: none;
  color: black;
  :hover {
    background-color: #444444;
    color: white;
  }
  :disabled {
    color: #cccccc;
    cursor: pointer;
    :hover {
      background-color: #eeeeee;
      color: #cccccc;
    }
  }
`;

const Login = ({login, loginError, resetLoginError, user}) => {
  React.useEffect(() => {
    if (user) {
      history.push('/budget');
    }
  }, [user]);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
  }

  const checkDisable = !username || !password;
  
  return <div>
    <LoginPanelStyled>
      <form onSubmit={(e) => handleSubmit(e)}>
      <LabelStyled>
        Username
      </LabelStyled>
      <InputFieldStyled type="text" value={username} onChange={e => userChange(e)} ></InputFieldStyled>
     
      <LabelStyled>
        Password
      </LabelStyled>
      <InputFieldStyled type="password" value={password} onChange={e => passwordChange(e)} ></InputFieldStyled>

      <ErrorLabel> {loginError} </ErrorLabel>
      <ButtonStyled type="submit" value="Login" disabled={checkDisable}></ButtonStyled>
      </form>
    </LoginPanelStyled>
  </div>
}

const mapStateToProps = state => {
  return { 
    loginError: getLoginError(state),
    user: getUser(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(loginAction(username, password)),
    resetLoginError: () => dispatch(resetLoginErrorAction())
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);