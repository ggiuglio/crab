import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../store/selectors/genericSelectors";
import SignedInSideLinks from './signedInSideLinks'
import SignedOutSideLinks from './signedOutSideLinks'
import M from  'materialize-css/dist/js/materialize.min.js';

const SideMenu = ({isPrintMode, user}) => {
  React.useEffect(() => {
    if(user) {
      let sidenav = document.querySelector('.sidenav');
      M.Sidenav.init(sidenav, {});
    }
  }, [user]);

  const links = user ? <SignedInSideLinks /> : <SignedOutSideLinks />;

  return (
    <ul className="sidenav" id="mobile-links" style={isPrintMode ? {display: "none"} : {}}>
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
