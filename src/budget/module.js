import React from "react";
import { connect } from "react-redux";
import Activity from "./activity";
import M from "materialize-css/dist/js/materialize.min.js";
import $ from "jquery"

const Module = ({ key, module }) => {
  React.useEffect(() => {
    let collapsible = $(".collapsible-body .collapsible");
    M.Collapsible.init(collapsible, { accordion: false });
  });

  return (
    <li>
      <div className="collapsible-header">{module.title}</div>
      <div className="collapsible-body" id={key}>
        <ul className="collapsible expandable">
          {module.activities.map((activity) => (
            <Activity key={activity.id} activity={activity} />
          ))}
        </ul>
      </div>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Module);
