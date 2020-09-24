import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { selectQuotation } from "../store/actions/actionsCreator";

const QuotationTile = ({ quotation, chooseQuotation }) => {
  const goToQuotationPage = () => {
    chooseQuotation(quotation.id);
  };

  return (
      <div className="col s12 l6">
        <div className="card indigo lighten-2">
          <div className="card-content" onClick={() => goToQuotationPage()}>
            <NavLink to="quotation">
              <div className="white-text">
                <div className="row card-title">
                  <span className="bolder col s12 m6 s-center">{quotation.code}</span>
                  <span className="col s12 m6 s-center">{quotation.status}</span>
                </div>
                <div>
                  <span className="col s12 m6 s-center">Type: {quotation.type} </span>
                  <span className="col s12 m6 s-center price">
                    Price: {quotation.quotationCost}{" "}
                  </span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="card-action clear-flow">
            <div className="fixed-action-btn static right">
              <a className="btn-floating orange darken-4">
                <i className="material-icons">menu</i>
              </a>
              <ul>
                <li>
                  <a
                    className="btn-floating btn-small red darken-1 modal-trigger"
                    href="#modal-archive"
                    title="Archive"
                  >
                    <i className="material-icons">archive</i>
                  </a>
                </li>
                <li>
                  <NavLink
                    className="btn-floating btn-small green darken-1"
                    to="#"
                  >
                    <i className="material-icons">edit</i>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> )
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseQuotation: (quotationId) => dispatch(selectQuotation(quotationId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationTile);
