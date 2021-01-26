import React from "react";
import { connect } from "react-redux";
import Menu from "./menu.js";
import Title from "./title.js";
import { getSelectedProjectId } from "../store/selectors/projectSelectors";
import ProjectMenu from "../menu/projectMenu";

const Header = ({ selectedProjectId }) => {
  return (
    <nav className="nav-extended">
      <div className="nav-wrapper indigo">
        <div className="container">
          <Title></Title>
          <Menu></Menu>
        </div>
      </div>
      {selectedProjectId && selectedProjectId !== '0' ? (
        <div className="nav-content container indigo lighten-3 hide-on-med-and-down">
          <ProjectMenu />
        </div>
      ) : null}
    </nav>
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
