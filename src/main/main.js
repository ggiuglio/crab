import React from 'react';
import { connect } from "react-redux";
import { getUser } from '../store/selectors/selector';
import { history } from '../App';
import Header from '../menu/header';
import SideMenu from '../menu/side/sideMenu';

const Main = ({user}) => {
  React.useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user]);

  return <div>
    <Header></Header>
    <SideMenu></SideMenu>
  </div>
}

const mapStateToProps = state => {
  return { 
    user: getUser(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps) (Main);
