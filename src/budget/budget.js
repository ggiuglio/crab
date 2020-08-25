import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";

const Container = styled.div`
  margin: 20px 0;
`;

const Budget = ({ }) => {
  return <Container></Container>
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {
  return {
    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);