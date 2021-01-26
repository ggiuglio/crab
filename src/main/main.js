import React from "react";
import Header from "../menu/header";
import Breadcrumb from "../common/breadcrumb";
import SideMenu from "../menu/side/sideMenu";
import Footer from "../footer/footer";

const Main = ({children}) => {

  return (
    <div>
      <Header />
      <Breadcrumb />
      <SideMenu />
      {children}
      <Footer />
    </div>
  );
}

export default Main;
