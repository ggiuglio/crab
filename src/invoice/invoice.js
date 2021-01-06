import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import InvoiceList from "./invoiceList";
import NewInvoice from "./newInvoice";
import add from "../assets/images/add.png";
import { selectProject, loadProjectAction } from "../store/actions/projectActions";
import { ShowNewInvoice } from "../store/actions/invoiceActions";
import { getShowNewInvoice } from "../store/selectors/invoiceSelectors";
import { getSelectedProjectId, getProject } from "../store/selectors/projectSelectors";
import { history } from "../App";

const AddInvoice = styled.div`
  height: 30px; 
  width: 100%;
  cursor: pointer;
  font-weight: bold;
  display: inline-flex;
`;
const AddArticleImage = styled.img`
  width: 30px;
  vertical-align: -8px;
  margin-right: 10px;
`;

const Invoice = ({ openNewInvoice, isNewInvoiceOpen, selectedProjectId, project, chooseProject, loadProject }) => {
  useEffect(() => {
    if (!selectedProjectId) {
      const query = new URLSearchParams(history.location.search);
      const queryProject = query.get('project')
      if(queryProject) {
        chooseProject(queryProject);
      }
      else {
        history.push('/');
      }
    } else {
      if (!project || project.id !== selectedProjectId) {
        loadProject(selectedProjectId);
      }
    }
  });

  const addInvoiceClick = () => {
    openNewInvoice();
  };

  return (
    <div>
      <AddInvoice onClick={() => addInvoiceClick()}>
        <AddArticleImage src={add} /> Insert new invoice
      </AddInvoice>

      {isNewInvoiceOpen ? <NewInvoice /> : ''}

      <InvoiceList />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isNewInvoiceOpen: getShowNewInvoice(state),
    selectedProjectId: getSelectedProjectId(state),
    project: getProject(state),  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openNewInvoice: () => dispatch(ShowNewInvoice()),
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);