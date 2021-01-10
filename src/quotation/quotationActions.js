import React from "react";
import { connect } from "react-redux";
import { VIEW_MODES } from "../constants/constants";
import { getViewMode } from "../store/selectors/genericSelectors";
import {
  setQuotationViewMode,
  cancelQuotationEdit,
} from "../store/actions/quotationActions";

const QuotationActions = ({
  viewMode,
  startEditQuotation,
  cancelEditQuotation,
}) => {
  return (
    <div>
      {viewMode === VIEW_MODES.VIEW ? (
        <a
          href="#!"
          className="btn-floating btn-small waves-effect waves-light indigo"
          onClick={() => startEditQuotation()}
          title="Edit quotation"
        >
          <i className="material-icons">edit</i>
        </a>
      ) : (
        ""
      )}
      {viewMode === VIEW_MODES.EDIT ? (
        <a
          href="#!"
          className="btn-floating btn-small waves-effect waves-light red darken-1"
          onClick={() => cancelEditQuotation()}
          title="Cancel edit quotation"
        >
          <i className="material-icons">undo</i>
        </a>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    viewMode: getViewMode(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startEditQuotation: () => dispatch(setQuotationViewMode(VIEW_MODES.EDIT)),
    cancelEditQuotation: () => dispatch(cancelQuotationEdit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationActions);
