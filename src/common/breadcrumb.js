import React, {useEffect} from "react";
import { connect } from "react-redux";
import { history } from "../App";
import { getUser } from "../store/selectors/selector";
import { getBreadcrumbCode, getBreadcrumb } from "../store/selectors/selector";
import { setBreadcrumbAction } from "../store/actions/actionsCreator";
import CustomNavLink from "./customNavLink";
import "./breadcrumb.css";

const Breadcrumb = ({ breadcrumbCode, breadcrumb, setBreadcrumb, user }) => {
  useEffect(() => {
    console.log("breadcrumb-user")
    console.log(breadcrumbCode)
    if(!breadcrumbCode) {
      const locationToken = history.location.pathname.split('/');
      const location = locationToken[locationToken.length - 1];

      let code = "";

      if(user) {
        switch (location) {
          case "new-project":
            code = "NPJ";
            break;
          case "project":
            code = "QTS";
            break;
          case "dashboard":
            code = "DSB";
            break;
          case "invoices":
            code = "INV";
            break;
          case "budget":
            code = "BDG";
            break;
          case "analytics":
            code = "ADA";
            break;
          case "quotation":
            code = "QTN";
            break;
          case "new-quotation":
            code = "NQT";
            break;
          default:
            code = "PJS";
        }
      }
      console.log(code)

      if(breadcrumbCode !== code) setBreadcrumb(code);
    }
  }, [user]);

  useEffect(() => {
    console.log("breadcrumb")
    console.log(breadcrumbCode)
    if(breadcrumbCode) setBreadcrumb(breadcrumbCode);
  }, [breadcrumbCode]);

  return (
    <div className="section col s12">
      {breadcrumb.map((bcItem) => (
        <CustomNavLink
          key={bcItem.id}
          to={bcItem.url}
          className="custom-breadcrumb indigo-text"
          code={bcItem.id}
        >
          {bcItem.title}
        </CustomNavLink>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    breadcrumbCode: getBreadcrumbCode(state),
    breadcrumb: getBreadcrumb(state),
    user: getUser(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb: (code) => dispatch(setBreadcrumbAction(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
