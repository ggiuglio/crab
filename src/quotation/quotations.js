import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProject } from "../store/selectors/selector";
import { getQuotations } from "../store/selectors/quotationSelector";
import QuotationTile from "./quotationTile";
import Preloader from "../common/preloader";
import M from "materialize-css/dist/js/materialize.min.js";

const Quotations = ({ project, quotations }) => {
  useEffect(() => {
    if (quotations) {
      let modal = document.querySelector(".modal");
      M.Modal.init(modal);
      let fab = document.querySelectorAll(".fixed-action-btn");
      M.FloatingActionButton.init(fab, { direction: "left" });
    }
  });
 
  return (
    <div className="container">

      { quotations !== undefined ? 
        <div>
          <div className="row">
            { quotations.map(q => <QuotationTile key={q.id} projectId={project.id} quotation={q} />) }
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
          <Preloader classes="preloader-wrapper big active" />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    project: getProject(state),
    quotations: getQuotations(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Quotations);
