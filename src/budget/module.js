import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Activity from './activitiy';

const ModuleContainer = styled.div`
  margin-left: 20px;
`;

const Module = ({ module }) => {
  return <ModuleContainer>
      {module.title}
      <div>
        {module.activities.map(activity => 
          <Activity key={activity.id} activity={activity} />)}
      </div>
  </ModuleContainer>
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Module);