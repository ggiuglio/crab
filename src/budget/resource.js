import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const ResourceContainer = styled.div`
  margin-left: 20px;
`;

const Resource = ({ resource }) => {
  return <ResourceContainer>
      <span>{resource.resourceType}</span>  <span>{resource.hours}</span>
  </ResourceContainer>
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Resource);