import React from "react";
import { connect } from "react-redux";

const PersonCost = ({ title, fee }) => {
  return (
    <tr>
      <td>{title}</td>
      <td className="price">{fee}</td>
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonCost);
