import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Resource from './resource';

const ActivityContainer = styled.div`
  margin-left: 20px;
`;

const Activity = ({ activity }) => {
  return <ActivityContainer>
    {activity.title}
    <div>
      {
        activity.resources.map(resource =>
          <Resource key={resource.id} resource={resource} />)
      }
    </div>
  </ActivityContainer>
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);