import React, { useEffect } from "react";
import { connect } from "react-redux";
import { QUOTATION_TYPES } from "../constants/constants";
import {
  selectProject,
  loadProjectAction,
} from "../store/actions/projectActions";
import {
  getProject,
  getSelectedProjectId,
} from "../store/selectors/projectSelectors";
import {
  getProviderQuotations,
  getSponsorQuotations,
} from "../store/selectors/quotationSelectors";
import CustomNavLink from "../common/customNavLink";
import { startNewQuotation } from "../store/actions/quotationActions";
import QuotationTile from "./quotationTile";
import Preloader from "../common/preloader";
import M from "materialize-css/dist/js/materialize.min.js";
import { history } from "../App";

const Quotations = ({
  project,
  chooseProject,
  loadProject,
  selectedProjectId,
  providerQuotations,
  sponsorQuotations,
  creatNewQuotation
}) => {
  useEffect(() => {
    if (!selectedProjectId) {
      const query = new URLSearchParams(history.location.search);
      const queryProject = query.get("project");
      if (queryProject) {
        chooseProject(queryProject);
      } else {
        history.push("/");
      }
    } else {
      if (!project || project.id !== selectedProjectId) {
        loadProject(selectedProjectId);
      }
    }

    if (providerQuotations !== undefined && sponsorQuotations !== undefined) {
      let tabs = document.querySelector(".tabs");
      M.Tabs.init(tabs);
      let modal = document.querySelector(".modal");
      M.Modal.init(modal);
    }
  });

  return (
    <div className="container">
      {providerQuotations !== undefined && sponsorQuotations !== undefined ? (
        <div className="row">
          <ul id="tabs-swipe-quotations" className="tabs tabs-fixed-width">
            <li className="tab col s3">
              <a className="active" href="#sponsor-quotation-swipe">
                Sponsor
              </a>
            </li>
            <li className="tab col s3">
              <a href="#provider-quotation-swipe">Provider</a>
            </li>
          </ul>

          <div id="sponsor-quotation-swipe">
            <div className="section">
              <div className="row">
                <div className="col s6 push-s3 center">
                  <span className="tooltip relative">
                    <CustomNavLink
                      className="btn-floating waves-effect waves-light green darken-1"
                      to={`/project/new-quotation?project=${selectedProjectId}&quotation-type=${QUOTATION_TYPES.SPONSOR}`}
                      onClick={() => creatNewQuotation(QUOTATION_TYPES.SPONSOR)}
                      iconType="MATERIAL"
                      iconName="add"
                      code="NQT"
                    />
                    <span className="tooltiptext right">Create new sponsor quotation</span>
                  </span>
                </div>
              </div>

              <div className="row">
                {sponsorQuotations.map((q) => (
                  <QuotationTile
                    key={q.id}
                    projectId={project.id}
                    quotation={q}
                  />
                ))}
              </div>
            </div>
          </div>
          <div id="provider-quotation-swipe">
            <div className="section">
              <div className="row">
                <div className="col s6 push-s3 center">
                  <span className="tooltip relative">
                    <CustomNavLink
                      className="btn-floating waves-effect waves-light red darken-1"
                      to={`/project/new-quotation?project=${selectedProjectId}&quotation-type=${QUOTATION_TYPES.PROVIDER}`}
                      onClick={() => creatNewQuotation(QUOTATION_TYPES.PROVIDER)}
                      iconType="MATERIAL"
                      iconName="add"
                      code="NQT"
                    />
                    <span className="tooltiptext right">Create new provider quotation</span>
                  </span>
                </div>
              </div>

              <div className="row">
                {providerQuotations.map((q) => (
                  <QuotationTile
                    key={q.id}
                    projectId={project.id}
                    quotation={q}
                  />
                ))}
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
          <Preloader classes="preloader-wrapper big active" />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    project: getProject(state),
    selectedProjectId: getSelectedProjectId(state),
    providerQuotations: getProviderQuotations(state),
    sponsorQuotations: getSponsorQuotations(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    creatNewQuotation: (type) => dispatch(startNewQuotation(type)),
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quotations);
