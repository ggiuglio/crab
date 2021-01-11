import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getModalResourceData } from "../store/selectors/quotationSelectors";
import { getResources } from "../store/selectors/genericSelectors";
import M from "materialize-css/dist/js/materialize.min.js";
import { addResourceToSelectedQuotation, hideActivityResourceModal } from "../store/actions/quotationActions";

const NewResource = ({ modalData, resources, createResource }) => {
  const [resourceHours, setResourceHours] = useState(0);
  const [selectedResource, setSelectedResource] = useState({ id: "-1", titile: "Select resource" });
  const [resourceList, setResourceList] = useState([]);

  useEffect(() => {
    const filteredResources = resources.filter(r => r.geo === modalData.moduleGeo || r.geo === "");
    setResourceList([{ id: "-1", title: "Select resource" }, ...filteredResources]);
  }, [resources, modalData])

  useEffect(() => {
    const modal = document.querySelectorAll("#modal-resource");
    const modalInstance = M.Modal.getInstance(modal[0]);
    setSelectedResource({ id: "-1", title: "Select resource" });
    setResourceHours(0);
    if (modalData.showModal) {
      modalInstance.open();
    }

  }, [modalData]);

  const resourceChange = (resourceId) => {
    if (resourceId !== "-1") {
      setSelectedResource(resources.find(r => r.id === resourceId));
    }
  };

  const addResource = () => {
    const resource = {
      hours: resourceHours,
      code: selectedResource.id,
      title: selectedResource.title
    }
    createResource(modalData.moduleId, modalData.activityId, resource);
    const modal = document.querySelectorAll("#modal-resource");
    const modalInstance = M.Modal.getInstance(modal[0]);
    modalInstance.close();
  };

  const canAddResource = () => {
    return selectedResource.id !== "-1" && resourceHours && resourceHours > 0
  };

  const closeModal = () => {
    hideActivityResourceModal();
    const modal = document.querySelectorAll("#modal-resource");
    const modalInstance = M.Modal.getInstance(modal[0]);
    modalInstance.close();
  };

  return (
    <div id="modal-resource" className="modal">
      {resources ?
        <div className="modal-content">
          <h6 id="resourceFor">Resources</h6>
          <div className="section">
            <div
              id="wrapper-select-resource"
              className="input-field col s12 m6"
            >
              <select className="browser-default" id="modal-resource-dropdown" value={selectedResource.id}
                onChange={(e) => resourceChange(e.target.value)}
              >
                {resourceList.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
              </select>
              <label className="active">Add reource to activity</label>
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
        : ''}
      <div className="modal-footer">
        <a
          href="#!"
          className="waves-indigo btn-flat"
          onClick={() => closeModal()}
        >
          Cancel
                 </a>
        <a
          href="#!"
          className="btn green darken-1 waves-effect waves-light"
          disabled={!canAddResource()}
          onClick={() => addResource()}
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
    resources: getResources(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createResource: (moduleId, activityId, resource) => dispatch(addResourceToSelectedQuotation(moduleId, activityId, resource))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewResource);