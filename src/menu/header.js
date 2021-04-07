import React from "react";
import { connect } from "react-redux";
import Menu from "./menu.js";
import Title from "./title.js";
import { getSelectedProjectId } from "../store/selectors/projectSelectors";
import ProjectMenu from "../menu/projectMenu";

const Header = ({ isPrintMode, selectedProjectId }) => {
  return (
    <div style={isPrintMode ? {display: "none"} : {}}>
      <nav>
        <div className="nav-wrapper indigo">
          <div className="container">
            <Title></Title>
            <Menu></Menu>
          </div>
        </div>
      </nav>
      {selectedProjectId && selectedProjectId !== "0" ? (
        <div className="custom-nav-content container hide-on-med-and-down">
          <ProjectMenu />
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProjectId: getSelectedProjectId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
