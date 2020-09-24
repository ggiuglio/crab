import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getQuotations, getSelectedProject } from "../store/selectors/selector";
import M from "materialize-css/dist/js/materialize.min.js";
import QuotationTile from "./quotationTile";

const Quotations = ({ selectedProject, quotations }) => {
  React.useEffect(() => {
    if (quotations) {
      let modal = document.querySelector(".modal");
      M.Modal.init(modal);
      let fab = document.querySelectorAll(".fixed-action-btn");
      M.FloatingActionButton.init(fab, { direction: "left" });
    }
  }, [quotations]);

  return (
    <div className="container">
      <h4 className="center page-title">{selectedProject.title} - <span className="italic">{selectedProject.status}</span></h4>
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

      { quotations ? 
        <div>
          <div className="row">
            { quotations.map(q => <QuotationTile key={q.id} quotation={q} />) }
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
        : (
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
    selectedProject: getSelectedProject(state),
    quotations: getQuotations(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Quotations);
