import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import M, { Collapsible } from "materialize-css/dist/js/materialize.min.js";
import { getInvoiceFilter } from "../store/selectors/invoiceSelectors";
import { setInvoiceFilter } from "../store/actions/invoiceActions";
import { getQuotationsEntityList } from "../store/selectors/quotationSelectors";

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
const SubTitile = styled(Title)`
  border-bottom: 1px solid #ddd;
  padding-bottom: 4px;
  margin-bottom: 8px;
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
const ActivityList = styled.div`
  margin: 0 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
`;

const InvoiceFilter = ({ quotationEntities, setFilter }) => {
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState([]);
  const [invoiceQuotationFilter, setInvoiceQuotationFilter] = useState([]);
  const [invoiceModuleFilter, setInvoiceModuleFilter] = useState([]);

  const [activitiesShown, setActivitiesShown] = useState(undefined);

  useEffect(() => {
    M.AutoInit();
  }, []);

  const setStatusFilter = (value) => {
    if (invoiceStatusFilter.includes(value)) {
      invoiceStatusFilter.splice(invoiceStatusFilter.indexOf(value), 1);
    } else {
      invoiceStatusFilter.push(value);
    }
    setInvoiceStatusFilter(invoiceStatusFilter);
    setFilter("status", invoiceStatusFilter);
  };

  const setQuotationFilter = (value) => {
    if (invoiceQuotationFilter.includes(value)) {
      invoiceQuotationFilter.splice(invoiceQuotationFilter.indexOf(value), 1);
    } else {
      invoiceQuotationFilter.push(value);
    }
    setInvoiceQuotationFilter(invoiceQuotationFilter);
    setFilter("quotations", invoiceQuotationFilter);
  };

  const setModuleFilter = (value) => {
    if (invoiceModuleFilter.includes(value)) {
      invoiceModuleFilter.splice(invoiceModuleFilter.indexOf(value), 1);
    } else {
      invoiceModuleFilter.push(value);
    }
    setInvoiceModuleFilter(invoiceModuleFilter);
    setFilter("modules", invoiceModuleFilter);
    showActivitiesForModule(value);
  }

  const showActivitiesForModule = (moduleCode) => {
    const newActivitiesShown = activitiesShown === moduleCode ? undefined : moduleCode;

    setActivitiesShown(newActivitiesShown);
  }

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
              <input type="checkbox" value={invoiceStatusFilter.find(t => t === "READY") !== null} onChange={() => setStatusFilter("READY")} />
              <span>Ready</span> </label></div>
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
            {quotationEntities.quotations.map(q =>
              <div key={q.id}><label>
                <input type="checkbox" value={invoiceQuotationFilter.find(t => t === q.id) !== null} onChange={() => setQuotationFilter(q.id)} />
                <span>{q.code}</span> </label>
              </div>
            )}

          </div>
        </li>
      </Filter>

      <Filter className="collapsible">
        <li>
          <Title className="collapsible-header">Module</Title>
          <div className="collapsible-body">
            {quotationEntities.uniqueModules.map(m =>
              <Filter key={module.cde} className="collapsible">
                <li>
                  <label>
                    <input type="checkbox" onChange={() => setModuleFilter(m.code)} />
                    <span> {m.title} - {m.geo.description} </span>
                  </label>

                  {activitiesShown === m.code ?
                    <ActivityList>
                      <SubTitile>Activity</SubTitile>
                      {quotationEntities.activities.filter(a => a.moduleCode === m.code).map(
                        activity => <div><label> <input type="checkbox" /><span>{activity.title}</span></label></div>
                      )}
                    </ActivityList>
                    : ""}
                </li>
              </Filter>
            )}
          </div>
        </li>
      </Filter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quotationEntities: getQuotationsEntityList(state)
  };

};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (filterType, filterValue) => dispatch(setInvoiceFilter(filterType, filterValue))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceFilter);