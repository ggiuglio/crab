import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { VIEW_MODES } from "../store/constants/constants";
import { getViewMode } from "../store/selectors/selector";
import { setQuotationViewMode, cancelQuotationEdit } from "../store/actions/quotationActions";

const QuotationActions = ({ viewMode, startEditQuotation, cancelEditQuotation }) => {
  return (
    <div>
      {
        viewMode === VIEW_MODES.VIEW ?
          <button onClick={() => startEditQuotation()}>edit quotation</button> :
          ''
      }
      {
        viewMode === VIEW_MODES.EDIT ?
          <button onClick={() => cancelEditQuotation()}>cancel quotation edit</button> :
          ''
      }
    </div>)
}

const mapStateToProps = (state) => {
  return {
    viewMode: getViewMode(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startEditQuotation: () => dispatch(setQuotationViewMode(VIEW_MODES.EDIT)),
    cancelEditQuotation: () => dispatch(cancelQuotationEdit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationActions);
