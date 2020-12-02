import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getModalResourceData } from "../store/selectors/quotationSelector";
import { getPeople } from "../store/selectors/selector";
import 'materialize-css';
import { Modal as MO } from "react-materialize";


const ResourceModal = ({ modalData, reources }) => {
  const [resourceHours, setResourceHours] = useState("");
  const [selectedResourceId, setSelectedResourceId] = useState("");
  const [selectedResource, setSelectedResource] = useState("");
  const [isOpen, setOpen] = useState(true);


  const resourceChange = () => { };
  const addResource = () => { };

  console.log(modalData, reources);

  const checkAddResourceDisabled = false;

  useEffect(() => {



  }, [modalData]);

  const showModal = () => {
    setOpen(true);
  };

  return (
    <div id="modal-resource" className="modal">
      <div className="modal-content">
        <h6 id="resourceFor"></h6>
        <div className="section">
          <div
            id="wrapper-select-resource"
            className="input-field col s12 m6"
          >
            <select
              onChange={(e) => resourceChange(e.target.value)}
            ></select>
            <label className="active">Resource</label>
          </div>
          <div className="input-field col s12 m6">
            <label className="active" htmlFor="resourceHours">
              Hours
                     </label>
            <input
              id="resourceHours"
              name="resourceHours"
              type="number"
              min="0"
              max="9999"
              value={resourceHours}
              onChange={(e) => setResourceHours(e.target.value)}
            ></input>
          </div>
          <input
            id="resourceModule"
            type="text"
            className="hide"
            readOnly
          ></input>
          <input
            id="resourceGeo"
            type="text"
            className="hide"
            readOnly
          ></input>
          <input
            id="resourceActivity"
            type="text"
            className="hide"
            readOnly
          ></input>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          className="modal-close waves-effect waves-indigo btn-flat"
          onClick={(e) => {
            setSelectedResourceId("");
            setSelectedResource("");
            setResourceHours("");
          }}
        >
          Cancel
                 </a>
        <a
          href="#!"
          className="modal-close btn green darken-1 waves-effect waves-light"
          disabled={checkAddResourceDisabled}
          onClick={(e) => addResource()}
        >
          Add
                 </a>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    modalData: getModalResourceData(state),
    reources: getPeople(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceModal);