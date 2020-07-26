import React from 'react';
import { connect } from "react-redux";
import { getUser } from '../store/selectors/selector';
import { history } from '../App';
import styled from 'styled-components';
import Header from '../menu/header';

const Container = styled.div`
  width: 100vw;
  ::-webkit-scrollbar {
    background: #efefef;
    width: 3px;
    height: 3px;
  }
`;

const Main = ({user}) => {
  React.useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user]);

  return <Container>
    <Header></Header>
  </Container>
}

const mapStateToProps = state => {
  return { 
    user: getUser(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps) (Main);
