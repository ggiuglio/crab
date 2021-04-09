import React, {useEffect, useState} from "react";
import { history } from "../App";
import Header from "../menu/header";
import Breadcrumb from "../common/breadcrumb";
import SideMenu from "../menu/side/sideMenu";
import Footer from "../footer/footer";

const Main = ({children}) => {
  const [printMode, setPrintMode] = useState(false);

  useEffect(() => {
    const locationToken = history.location.pathname.split("/");
    if(locationToken.length > 0 && locationToken[1] === "print") {
      setPrintMode(true);
    }
  }, []);

  return (
    <div>
      <Header isPrintMode={printMode} />
      <Breadcrumb isPrintMode={printMode} />
      <SideMenu isPrintMode={printMode} />
      {children}
      <Footer isPrintMode={printMode} />
    </div>
  );
}

export default Main;
