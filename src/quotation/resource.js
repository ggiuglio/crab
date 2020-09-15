import React from "react";
import { connect } from "react-redux";

const Resource = ({ resource }) => {
  return (
    <tr>
      <td>{resource.resourceType}</td>
      <td>{resource.hours}</td>
      {/* <td></td> */}
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Resource);
