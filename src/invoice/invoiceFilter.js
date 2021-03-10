import React, { useState } from "react";
import { connect } from "react-redux";
import {
  setInvoiceFilter,
  clearInvoiceFilter,
} from "../store/actions/invoiceActions";
import { getQuotationsEntityList } from "../store/selectors/quotationSelectors";
import InvoiceFilterBig from "./invoiceFilterBig";
import InvoiceFilterSmall from "./invoiceFilterSmall";

const InvoiceFilter = (par) => {
  const [invoiceTypeFilter, setInvoiceTypeFilter] = useState([]);
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState([]);
  const [invoiceQuotationFilter, setInvoiceQuotationFilter] = useState([]);
  const [invoiceModuleFilter, setInvoiceModuleFilter] = useState([]);
  const [invoiceActivityFilter, setInvoiceActivityFilter] = useState([]);

  const setTypeFilter = (value) => {
    if (invoiceTypeFilter.includes(value)) {
      invoiceTypeFilter.splice(invoiceTypeFilter.indexOf(value), 1);
    } else {
      invoiceTypeFilter.push(value);
    }
    setInvoiceTypeFilter(invoiceTypeFilter);
    par.setFilter("type", invoiceTypeFilter);
  };

  const setStatusFilter = (value) => {
    if (invoiceStatusFilter.includes(value)) {
      invoiceStatusFilter.splice(invoiceStatusFilter.indexOf(value), 1);
    } else {
      invoiceStatusFilter.push(value);
    }
    setInvoiceStatusFilter(invoiceStatusFilter);
    par.setFilter("status", invoiceStatusFilter);
  };

  const setQuotationFilter = (value) => {
    if (invoiceQuotationFilter.includes(value)) {
      invoiceQuotationFilter.splice(invoiceQuotationFilter.indexOf(value), 1);
    } else {
      invoiceQuotationFilter.push(value);
    }
    setInvoiceQuotationFilter(invoiceQuotationFilter);
    par.setFilter("quotations", invoiceQuotationFilter);
  };

  const setModuleFilter = (value) => {
    let setActivities = false;
    if (invoiceModuleFilter.includes(value)) {
      invoiceModuleFilter.splice(invoiceModuleFilter.indexOf(value), 1);

      par.quotationEntities.activities
        .filter((a) => a.moduleCode === value)
        .map((activity) => {
          const idx = invoiceActivityFilter.indexOf(activity.id);
          if (idx >= 0) invoiceActivityFilter.splice(idx, 1);
        });

      setActivities = true;
    } else {
      invoiceModuleFilter.push(value);
    }

    if (setActivities) {
      setInvoiceActivityFilter(invoiceActivityFilter);
      par.setFilter("activities", invoiceActivityFilter);
    }
    setInvoiceModuleFilter(invoiceModuleFilter);
    par.setFilter("modules", invoiceModuleFilter);
  };

  const setActivityFilter = (value) => {
    if (invoiceActivityFilter.includes(value)) {
      invoiceActivityFilter.splice(invoiceActivityFilter.indexOf(value), 1);
    } else {
      invoiceActivityFilter.push(value);
    }
    setInvoiceActivityFilter(invoiceActivityFilter);
    par.setFilter("activities", invoiceActivityFilter);
  };

  const clearAllFilters = () => {
    setInvoiceTypeFilter([]);
    setInvoiceStatusFilter([]);
    setInvoiceQuotationFilter([]);
    setInvoiceModuleFilter([]);
    setInvoiceActivityFilter([]);
    par.clearFilters();
  };

  return par.isSmall ? (
    <InvoiceFilterSmall
      setTypeFilter={setTypeFilter}
      setStatusFilter={setStatusFilter}
      setQuotationFilter={setQuotationFilter}
      setModuleFilter={setModuleFilter}
      setActivityFilter={setActivityFilter}
      clearAllFilters={clearAllFilters}
      invoiceTypeFilter={invoiceTypeFilter}
      invoiceStatusFilter={invoiceStatusFilter}
      invoiceQuotationFilter={invoiceQuotationFilter}
      invoiceModuleFilter={invoiceModuleFilter}
      invoiceActivityFilter={invoiceActivityFilter}
      quotationEntities={par.quotationEntities}
    />
  ) : (
    <InvoiceFilterBig
      setTypeFilter={setTypeFilter}
      setStatusFilter={setStatusFilter}
      setQuotationFilter={setQuotationFilter}
      setModuleFilter={setModuleFilter}
      setActivityFilter={setActivityFilter}
      clearAllFilters={clearAllFilters}
      invoiceTypeFilter={invoiceTypeFilter}
      invoiceStatusFilter={invoiceStatusFilter}
      invoiceQuotationFilter={invoiceQuotationFilter}
      invoiceModuleFilter={invoiceModuleFilter}
      invoiceActivityFilter={invoiceActivityFilter}
      quotationEntities={par.quotationEntities}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    quotationEntities: getQuotationsEntityList(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (filterType, filterValue) =>
      dispatch(setInvoiceFilter(filterType, filterValue)),
    clearFilters: () => dispatch(clearInvoiceFilter()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceFilter);
