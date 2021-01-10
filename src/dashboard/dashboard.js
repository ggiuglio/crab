import React from "react";
import { connect } from "react-redux";
import { getSelectedProjectId } from "../store/selectors/projectSelectors";

const Dahsboard = () => {

  return (
    <div>
     This is the dashboard
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedProject: getSelectedProjectId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dahsboard);
