import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProjectProviders } from "../store/selectors/projectSelectors";
import { setSelectedQuotationProvider } from "../store/actions/quotationActions";
import { getViewMode } from "../store/selectors/genericSelectors";
import { getQuotation } from "../store/selectors/quotationSelectors";
import { VIEW_MODES } from "../constants/constants";

const Provider = ({ providers, quotation, setQuotationProvider, viewMode }) => {
  const [availableProviders, setAvailableProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState({});

  useEffect(() => {
    if (providers) {
      setAvailableProviders([{ title: "Select a provider", id: "-1" }, ...providers]);
      if (quotation) {
        setSelectedProvider(quotation.provider);
      } else {
      setSelectedProvider({ title: "Select a provider", id: "-1" });
      }
    }
  }, [providers, quotation]);

  const changeSelectedProvider = (providerId) => {
    if (providerId !== "-1") {
      const provider = availableProviders.find(p => p.id === providerId);
      setSelectedProvider(provider);
      setQuotationProvider(provider);
    }
  };

  return (
    <div className="col s12 l6">
      <label className="active">Provider</label>
      {
        viewMode === VIEW_MODES.VIEW ?
          <div>
            {quotation.provider ? quotation.provider.title : ''}
          </div> :
          <div>
            <select
              className="browser-default"
              id="availableModules"
              value={selectedProvider ? selectedProvider.id : "-1"}
              onChange={(e) => changeSelectedProvider(e.target.value)}
            >
              {availableProviders.map(p =>
                <option value={p.id} key={p.id} >
                  {p.title}
                </option>
              )}
            </select>
          </div>
      }
    </div>)
}

const mapStateToProps = (state) => {
  return {
    providers: getProjectProviders(state),
    quotation: getQuotation(state),
    viewMode: getViewMode(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setQuotationProvider: (provider) => dispatch(setSelectedQuotationProvider(provider))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Provider);
