import React from "react";
import { connect } from "react-redux";
import ResourceCost from "./resourceCost";

const ResourceList = ({ resources }) => {

  return (
    <div className="row">
      <div className="col s10 offset-s1 bolder center">
        Hourly cost
      </div>
      <table>
        <thead>
          <tr>
            <th>Person</th>
            <th className="center">Fee €/h</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (<ResourceCost key={resource.title + resource.geo} resource={resource} />))}
        </tbody>
      </table>
    </div>
   )
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceList);
