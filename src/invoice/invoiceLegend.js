import React from "react";

const InvoiceLegend = () => {
  return (
    <div id="invoice-status-legend" className="card horizontal">
      <div className="card-stacked">
      <div className="card-content">
        <h6 className="bolder">Status legend</h6>
        <ul>
          <li>
            <i className="material-icons ready tiny"></i> READY
          </li>
          <li>
            <i className="material-icons new tiny"></i> NEW
          </li>
          <li>
            <i className="material-icons invoiced tiny"></i> INVOICED
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default InvoiceLegend;
