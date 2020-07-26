import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import Menu from './menu.js';
import Title from './title.js';
import { logoutAction } from '../store/actions/actionsCreator';
import { getUser } from '../store/selectors/selector';

const HeaderContent = styled.div`
  width: 100vw;
  position: relative;
  top: 0;
  left: 0;
  @media (min-width: 600px) {
    border-bottom: 1px solid #cccccc;
    display: inline-flex;
    width: calc(100vw - 40px);
    margin: 20px 20px;
  }
`;
const LogoutButton = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  border: 1px solid;
  font-size: 12px;
  padding: 2px 8px;
  cursor: pointer;
  :hover {
    background-color: #cccccc;
    color: white;
  }
`;

const Header = ({user, logout}) => {
  return <HeaderContent>
    { user ? <LogoutButton onClick={() => logout()}>logout</LogoutButton> : '' }
    <Title></Title>
    <Menu></Menu>
  </HeaderContent>
}

const mapStateToProps = state => {
  return { 
    user: getUser(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutAction()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (Header);