import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../store/selectors/selector";
import SignedInSideLinks from './signedInSideLinks'
import SignedOutSideLinks from './signedOutSideLinks'
import M from  'materialize-css/dist/js/materialize.min.js';

const SideMenu = ({user}) => {
  React.useEffect(() => {
    if(user) {
      let sidenav = document.querySelector('.sidenav');
      M.Sidenav.init(sidenav, {});
    }
  });

  const links = user ? <SignedInSideLinks /> : <SignedOutSideLinks />;

  return (
    <ul className="sidenav" id="mobile-links">
      {links}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
  };
};

export default connect(mapStateToProps, null)(SideMenu);
