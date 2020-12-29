import React, {useEffect} from "react";
import { connect } from "react-redux";
import { getBreadcrumbCode, getBreadcrumb, getProject } from "../store/selectors/selector";
import { getQuotation } from "../store/selectors/quotationSelector";
import { setBreadcrumbAction } from "../store/actions/actionsCreator";
import CustomNavLink from "./customNavLink";
import "./breadcrumb.css";

const Breadcrumb = ({ breadcrumbCode, breadcrumb, project, selectedQuotation, setBreadcrumb }) => {
  useEffect(() => {
    // const query = new URLSearchParams(history.location.search);
    // const locationToken = history.location.pathname.split("/");
    // const location = locationToken[locationToken.length - 1];
    // const queryProject = query.get("project");
    // const queryQuotation = query.get("quotation");
    // const queryQuotationType = query.get("quotation-type");

    // if (!selectedProjectId) {
    //   if (queryProject) {
    //     chooseProject(queryProject);
    //   } else {
    //     history.push("/");
    //   }
    // } else {
    //   if (!project || project.id !== selectedProjectId) {
    //     loadProject(selectedProjectId);
    //   } else if (professionals) {
    //     if (!selectedQuotationId && location !== "new-quotation") {
    //       chooseQuotation(queryQuotation);
    //     }
    //     if (!selectedQuotationId && location === "new-quotation") {
    //       startNewQuotation(queryQuotationType);
    //     }
    //   }
    // }

    // if (selectedQuotation) {
    //   setQuotationCode(selectedQuotation.code);
    // }
    console.log(breadcrumbCode)
    if(breadcrumbCode)
      setBreadcrumb();
  }, [project, selectedQuotation]);

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
    selectedQuotation: getQuotation(state),
    project: getProject(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb: () => dispatch(setBreadcrumbAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
