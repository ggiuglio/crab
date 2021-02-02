import React from "react";
import { connect } from "react-redux";
import { selectQuotation } from "../store/actions/quotationActions";
import CustomNavLink from "../common/customNavLink";
import M from "materialize-css/dist/js/materialize.min.js";
import "./css/quotation.css";

const QuotationTile = ({ quotation, chooseQuotation, projectId }) => {
  React.useEffect(() => {
    let tooltips = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(tooltips);
  });

  const goToQuotationPage = () => {
    chooseQuotation(quotation.id);
  };

  return (
    <div className="col s12">
      <div className="card indigo lighten-2">
        <div className="card-content">
          <div className="row card-text">
            <div className="col s10 m11">
              <div className="row">
                <CustomNavLink
                  to={`/project/quotation?project=${projectId}&quotation=${quotation.id}`}
                  code="QTN"
                  onClick={goToQuotationPage}
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
                <span className="col s12 m1">
                  <div
                    className={`tooltipped quotation-status ${quotation.status.toLowerCase()}`}
                    data-position="bottom"
                    data-tooltip={quotation.status}
                  >
                  </div>
                </span>
              </div>
            </div>
            <div className="col s2 m1 center">
              <a
                className="modal-trigger transparent tooltipped"
                href="#modal-archive"
                data-position="bottom"
                data-tooltip="Archive quotation"
              >
                <i className="material-icons red-text text-darken-3">archive</i>
              </a>
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
