export const getInvoiceList = (state) => state.invoiceList;
export const getShowNewInvoice = (state) => state.showNewInvoice;
export const getInvoiceFilter = (state) => state.invoiceFilter;
export const getFilteredInvoice = (state) => filterInvoices(state.invoiceList, state.invoiceFilter); 

const filterInvoices = (invoices, filters) => {
  let filteredInvoices = [];
  if (invoices) {
    filteredInvoices = filterInvoiceByType(invoices, filters.type);
    filteredInvoices = filterInvoiceByStatus(filteredInvoices, filters.status);
    filteredInvoices = filterInvoiceByQuotation(filteredInvoices, filters.quotations);
    filteredInvoices = filterInvoiceByModule(filteredInvoices, filters.modules);
    filteredInvoices = filterInvoiceByActivity(filteredInvoices, filters.activities);
  }
  return filteredInvoices;
};

const filterInvoiceByType = (invoices, filters) => {
  const filteredInvoices = invoices.filter(inv => filters.length === 0 || filters.includes(inv.type));
  return filteredInvoices;
};

const filterInvoiceByStatus = (invoices, filters) => {
  const filteredInvoices = invoices.filter(inv => filters.length === 0 || filters.includes(inv.status));
  return filteredInvoices;
};

const filterInvoiceByQuotation = (invoices, filters) => {
  const filteredInvoices = invoices.filter(inv => filters.length === 0 || filters.includes(inv.quotationId));
  return filteredInvoices;
};

const filterInvoiceByModule = (invoices, filters) => {
  const filteredInvoices = invoices.filter(inv => filters.length === 0 || filters.includes(inv.moduleCode));
  return filteredInvoices;
};

const filterInvoiceByActivity = (invoices, filters) => {
  const filteredInvoices = invoices.filter(inv => filters.length === 0 || filters.includes(inv.activityId));
  return filteredInvoices;
};