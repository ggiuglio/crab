import React from "react";
import { connect } from "react-redux";
import { selectQuotation } from "../store/actions/quotationActions";
import CustomNavLink from "../common/customNavLink";

const QuotationTile = ({ quotation, chooseQuotation, projectId }) => {
  const goToQuotationPage = () => {
    chooseQuotation(quotation.id);
  };

  return (
    <div className="col s12">
      <div className="card indigo lighten-2">
        <div className="card-content">
          <div className="row card-text">
            <div className="col s11">
              <div className="row">
                <CustomNavLink
                  to={`/project/quotation?project=${projectId}&quotation=${quotation.id}`}
                  code="QTN"
                  onClick={() => goToQuotationPage()}
                >
                  <span
                    className="bolder col s12 m7 s-center truncate white-text"
                    title={quotation.code}
                  >
                    {quotation.code}
                  </span>
                  <span
                    className="col s12 m4 text-right s-center price truncate white-text"
                    title={quotation.cost}
                  >
                    {quotation.cost}
                  </span>
                </CustomNavLink>
                <span className="col s12 m1 center-align tooltip relative m-space-up">
                  <span className="tooltiptext bottom">{quotation.status}</span>
                  {quotation.status.toLowerCase() === "setup" ? (
                    <i className="material-icons amber-text">settings</i>
                  ) : quotation.status.toLowerCase() === "active" ? (
                    <i className="material-icons green-text text-darken-1">
                      check_circle
                    </i>
                  ) : (
                    <i className="material-icons red-text text-darken-2">
                      cancel
                    </i>
                  )}
                </span>
              </div>
            </div>
            <div className="col s1 card-action-btn relative">
              <div>
                <div className="fixed-action-btn absolute">
                  <span className="tooltip relative">
                    <a
                      className="btn-floating btn-small red darken-1 modal-trigger"
                      href="#modal-archive"
                    >
                      <i className="material-icons">archive</i>
                    </a>
                    <span className="tooltiptext bottom">Archive</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseQuotation: (quotationId) => dispatch(selectQuotation(quotationId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationTile);
