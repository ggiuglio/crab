import React from "react";
import { connect } from "react-redux";
import { loadQuotationAction } from "../store/actions/actionsCreator";
import { getQuotation } from "../store/selectors/selector";
import Module from "./module";
import M from "materialize-css/dist/js/materialize.min.js";
import $ from "jquery";

const Budget = ({ quotation, loadQuotation }) => {
  React.useEffect(() => {
    if (!quotation) {
      loadQuotation();
    } else {
      let collapsible = $(".collapsible");
      M.Collapsible.init(collapsible, { accordion: false });
    }
  });

  return (
    <div id="budget" className="container">
      <h3 className="center">Budget</h3>
      {quotation ? (
        <div className="row">
          <div className="col s12">
            <ul className="collapsible expandable">
              {quotation.modules.map((module) => (
                <Module key={module.id} module={module} />
              ))}
            </ul>
            <div className="center">
              <div className="col s12 z-depth-1">
                <p className="flow-text">Quotation cost = {quotation.quotationCost}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="center valign-page-center">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quotation: getQuotation(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadQuotation: () => dispatch(loadQuotationAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
