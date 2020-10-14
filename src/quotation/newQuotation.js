import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getBaseModules } from "../store/selectors/selector";

const NewQuotation = ({ baseModules }) => {
  console.log('base modules', baseModules);
  return (
    <div>
      New Quotation
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    baseModules: getBaseModules(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuotation);
