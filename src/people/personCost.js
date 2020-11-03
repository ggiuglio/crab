import React from "react";
import { connect } from "react-redux";

const PersonCost = ({ person, handleChange }) => {
  return (
    <tr>
      <td>{person.title}</td>
      <td className="text-right"><input className="text-right browser-default" type="number" name={person.id+person.geo} min="0" max="999" value={person.fee} onChange={(e) => handleChange(person.geo, person.id, e.target.value, person.geoBool)}></input></td>
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
