import React from "react";
import { connect } from "react-redux";
import { getUser } from "../store/selectors/selector";
import SignedInLinks from "./signedInLinks";
import SignedOutLinks from "./signedOutLinks";

const Menu = ({ user }) => {
  const links = user ? <SignedInLinks /> : <SignedOutLinks />;

  return (
    <div>
      {user ? (
        <a href="#" className="sidenav-trigger" data-target="mobile-links">
          <i className="material-icons">menu</i>
        </a>
      ) : null}
      <ul className="right hide-on-med-and-down">{links}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
  };
};

export default connect(mapStateToProps, null)(Menu);
