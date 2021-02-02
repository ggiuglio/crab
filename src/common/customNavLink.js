import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setBreadcrumbCodeAction } from "../store/actions/genericActions";

const CustomNavLink = (par) => {
  const onNavClick = (e, par) => {
    if(typeof(par.onClick) === 'function') par.onClick(e, par);
    par.setBreadcrumbCode(par.code);
  };

  return (
    <NavLink to={par.to} className={par.className} onClick={(e) => onNavClick(e, par)} code={par.code} activeClassName="no-one" data-position={par.dataPosition ? par.dataPosition : ""} data-tooltip={par.dataTooltip ? par.dataTooltip : ""}>
      {(() => {
        switch (par.iconType) {
          case "AWESOME":
            return <div style={{display: 'inline'}} className="navlink-awesome-icon"><FontAwesomeIcon icon={par.iconName} fixedWidth />&nbsp;&nbsp;</div>

          case "MATERIAL":
            return <i className="material-icons">{par.iconName}</i>;
        }
      })()}
      {par.children}
    </NavLink>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumbCode: (code) => dispatch(setBreadcrumbCodeAction(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavLink);
