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
import InvoiceFilter from "./invoiceFilter";
import { history } from "../App";

const AddInvoice = styled.div`
  height: 30px; 
  width: 100%;
  margin-top: 2s0px;
  margin-bottom: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
`;
const AddArticleImage = styled.img`
  width: 30px;
  vertical-align: -8px;
  margin-right: 10px;
`;
const InvoiceContainer = styled.div`
  display: inline-flex;
`;
const InvoiceListContainer = styled.div`
  flex-grow: 1;
`;
const InvoiceFilterContainer = styled.div`
  width: 300px;
  padding-right: 20px;
`;

const Invoice = ({ openNewInvoice, isNewInvoiceOpen, selectedProjectId, project, chooseProject, loadProject }) => {
  useEffect(() => {
    if (!selectedProjectId) {
      const query = new URLSearchParams(history.location.search);
      const queryProject = query.get('project')
      if (queryProject) {
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
      <div className="container">
        <AddInvoice onClick={() => addInvoiceClick()}>
          <AddArticleImage src={add} /> Insert new activity
      </AddInvoice>

        {isNewInvoiceOpen ? <NewInvoice /> : ''}

        <InvoiceContainer>
          <InvoiceFilterContainer>
            <InvoiceFilter />
          </InvoiceFilterContainer>
          <InvoiceListContainer>
            <InvoiceList />
          </InvoiceListContainer>
        </InvoiceContainer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isNewInvoiceOpen: getShowNewInvoice(state),
    selectedProjectId: getSelectedProjectId(state),
    project: getProject(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openNewInvoice: () => dispatch(ShowNewInvoice()),
    chooseProject: (projectId) => dispatch(selectProject(projectId)),
    loadProject: (projectId) => dispatch(loadProjectAction(projectId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);