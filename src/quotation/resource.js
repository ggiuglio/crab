import React from "react";
import { connect } from "react-redux";

const Resource = ({ resource }) => {
  return (
    <div className="col s6 m3">
      <p>
        {resource.resourceType} {resource.hours}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Resource);
