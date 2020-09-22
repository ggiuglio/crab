import React from "react";
import { connect } from "react-redux";
import { getSelectedQuotation } from "../store/selectors/selector";
import Module from "./module";
import M from "materialize-css/dist/js/materialize.min.js";

const Quotation = ({ quotation }) => {
  React.useEffect(() => {
    if (quotation) {
      let collapsible = document.querySelectorAll(".collapsible");
      M.Collapsible.init(collapsible, { accordion: false });
    }
  });

  return (
    <div id="quotation">
      <h5 className="center page-title">Quotation</h5>
      {quotation ? (
        <div>
          <div className="container">
            <div className="row">
              <div className="col s6 m3">CODE: {quotation.code}</div>
              <div className="col s6 m3">STATUS: {quotation.status}</div>
              <div className="col s6 m3">START DATE: {quotation.startDate}</div>
              <div className="col s6 m3">END DATE: {quotation.endDate}</div>
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <ul className="collapsible">
                {quotation.modules.map((module) => (
                  <Module key={module.id} module={module} />
                ))}
              </ul>
              <div className="center">
                <div className="col s12 z-depth-1">
                  <p className="flow-text price">
                    Quotation cost = {quotation.quotationCost}
                  </p>
                </div>
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
    quotation: getSelectedQuotation(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Quotation);
