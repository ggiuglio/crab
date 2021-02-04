import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import M, { Collapsible } from "materialize-css/dist/js/materialize.min.js";
import { getInvoiceFilter } from "../store/selectors/invoiceSelectors";
import { setInvoiceFilter } from "../store/actions/invoiceActions";

const Maintitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 10px;
  padding-top: 10px;
`;
const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
const Filter = styled.ul`
  border: none !important;
  box-shadow: none !important;
  background-color: white !important;
`;
const Clear = styled.div`
font-size: 14px;
color: red;
cursor:pointer;
& > i {
   color: red;
   height: 8px;
   vertical-align: -7px;
};
`;

const InvoiceFilter = ({ filters, setFilter }) => {
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState([]);


  useEffect(() => {
    M.AutoInit();
  }, [])

  const setStatusFilter = (value) => {
    if (invoiceStatusFilter.includes(value)) {
      invoiceStatusFilter.splice(invoiceStatusFilter.indexOf(value), 1);
    } else {
      invoiceStatusFilter.push(value);
    }
    setInvoiceStatusFilter(invoiceStatusFilter);
    setFilter("status", invoiceStatusFilter);
  };

  return (
    <div>
      <Maintitle>Filter activities</Maintitle>
      <Clear>
        <i className="material-icons">clear</i> <span>clear fitlers</span>
      </Clear>
      <Filter className="collapsible">
        <li>
          <Title className="collapsible-header">Status</Title>
          <div className="collapsible-body">
            <div><label>
              <input type="checkbox" value={invoiceStatusFilter.find(t => t === "NEW") !== null} onChange={() => setStatusFilter("NEW")} />
              <span>New</span> </label></div>
            <div><label>
              <input type="checkbox" value={invoiceStatusFilter.find(t => t === "ACTIVE") !== null} onChange={() => setStatusFilter("ACTIVE")} />
              <span>Active</span> </label></div>
            <div><label>
              <input type="checkbox" value={invoiceStatusFilter.find(t => t === "INVOICED") !== null} onChange={() => setStatusFilter("INVOICED")} />
              <span>Invoiced</span> </label></div>
          </div>
        </li>
      </Filter>

      <Filter className="collapsible">
        <li>
          <Title className="collapsible-header">Quotation</Title>
          <div className="collapsible-body">
            <div><label> <input type="checkbox" /> <span>Onda dei dragoni gemelli di Hokuto</span></label></div>
            <div><label> <input type="checkbox" /> <span>Tecnica della distrutione esplosiva rotante</span></label></div>
          </div>
        </li>
      </Filter>

      <Filter className="collapsible">
        <li>
          <Title className="collapsible-header">Module</Title>
          <div className="collapsible-body">
            <Filter className="collapsible">
              <li>
                <div className="collapsible-header">Study set-up</div>
                <div className="collapsible-body">
                  <div><label> <input type="checkbox" /><span> activity 1</span></label></div>
                  <div><label> <input type="checkbox" /><span> activity 2</span></label></div>
                  <div><label> <input type="checkbox" /><span> activity 3</span></label></div>
                </div>
              </li>
            </Filter>
            <Filter className="collapsible">
              <li>
                <div className="collapsible-header">Study set-up</div>
                <div className="collapsible-body">
                  <div><label> <input type="checkbox" /> <span> activity 1</span></label></div>
                  <div><label> <input type="checkbox" /> <span> activity 2</span></label></div>
                  <div><label> <input type="checkbox" /> <span> activity 3</span></label></div>
                </div>
              </li>
            </Filter>
          </div>
        </li>
      </Filter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: getInvoiceFilter(state)
  };

};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (filterType, filterValue) => dispatch(setInvoiceFilter(filterType, filterValue))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceFilter);