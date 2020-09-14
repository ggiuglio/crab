import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getQuotation } from "../store/selectors/selector";
import M from "materialize-css/dist/js/materialize.min.js";

const Quotations = ({ quotation }) => {
  React.useEffect(() => {
    if (quotation) {
      let modal = document.querySelector(".modal");
      M.Modal.init(modal);
      let fab = document.querySelectorAll(".fixed-action-btn");
      M.FloatingActionButton.init(fab, { direction: "left" });
    }
  });

  return (
    <div className="container">
      <h4 className="center page-title">PROJECT NAME</h4>
      <div className="row">
        <div className="col s6 center">
          <NavLink
            className="btn-floating btn-large waves-effect waves-light green darken-1"
            to="#"
          >
            <i className="material-icons">add</i>
          </NavLink>
          <p>CREATE NEW SPONSOR QUOTATION</p>
        </div>
        <div className="col s6 center">
          <NavLink
            className="btn-floating btn-large waves-effect waves-light red darken-1"
            to="#"
          >
            <i className="material-icons">add</i>
          </NavLink>
          <p>CREATE NEW PROVIDER QUOTATION</p>
        </div>
      </div>

      {quotation ? (
        <div>
          <div className="row">
            <div className="col s12 l6">
              <div className="card indigo">
                <div className="card-content">
                  <NavLink to="quotation">
                    <div className="white-text">
                      <p className="card-title">
                        <b>{quotation.code}</b>
                        <span className="right">{quotation.status}</span>
                      </p>
                      <p>
                        <span>Type: {quotation.type} </span>
                        <span className="right price">
                          Price: {quotation.quotationCost}{" "}
                        </span>
                      </p>
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
            </div>
          </div>

          <div id="modal-archive" className="modal">
            <div className="modal-content">
              <h4>Quotation Archiving</h4>
              <p>Are you sure you want to archive this quotation?</p>
            </div>
            <div className="modal-footer">
              <a
                href="#!"
                className="modal-close waves-effect waves-indigo btn-flat"
              >
                Cancel
              </a>
              <a
                href="#!"
                className="modal-close btn red darken-2 waves-effect waves-light"
              >
                Ok
              </a>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Quotations);
