export const getInvoiceList = (state) => state.invoiceList;
export const getShowNewInvoice = (state) => state.showNewInvoice;
export const getInvoiceFilter = (state) => state.invoiceFilter;
export const getFilteredInvoice = (state) => filterInvoices(state.invoiceList, state.invoiceFilter); 

const filterInvoices = (invoices, filters) => {
  let filteredInvoices = [];
  if (invoices) {
    filteredInvoices = filterInvoiceByStatus(invoices, filters.status);
  }
  return filteredInvoices;
}

const filterInvoiceByStatus = (invoices, filters) => {
  const filteredInvoices = invoices.filter(inv => filters.length === 0 || filters.includes(inv.status));
  return filteredInvoices;
}