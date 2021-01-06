import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getQuotation,
} from "../store/selectors/quotationSelectors";
import {
  getBaseModules
} from "../store/selectors/genericSelectors";
import { getProject } from "../store/selectors/projectSelectors";
import { addModuleToSelectedQuotation } from "../store/actions/quotationActions";
import M from "materialize-css/dist/js/materialize.min.js";

const NewModule = ({ quotation, baseModules, project, addModuleToQuotation }) => {
  const [availableModules, setAvailableModules] = useState([]);
  const [availableGeos, setAvailableGeos] = useState([]);

  const [selectedModule, setSelectedModule] = useState("");
  const [selectedGeo, setSelectedGeo] = useState("");

  useEffect(() => {
    if (baseModules && project) {

      const geos = [{
        code: 'General',
        description: "General",
      }];
      Object.keys(project.geo).forEach((k) => {
        geos.push({ code: k, description: project.geo[k].description });
      });

      let modules = JSON.parse(JSON.stringify(baseModules));

      modules.map(bm => {
        let geosNotInUse = geos.filter(g => (quotation.modules.filter(qm => qm.code === bm.code + g.code)).length === 0)

        bm.availableGeos = geosNotInUse;
        return bm;
      });

      modules.unshift({
        code: '-1',
        title: "Select module",
        availableGeos: ['']
      });

      setAvailableModules(modules);
      setAvailableGeos([]);
      setSelectedModule({
        code: "-1",
        title: "Select module",
        availableGeos: ['']
      });
      M.AutoInit();
    }

  }, [baseModules, project])

  const addModule = () => {
    const newModule = JSON.parse(JSON.stringify(selectedModule));
    newModule.type = selectedModule.code;
    newModule.code += selectedGeo.code;
    newModule.geo = selectedGeo;
    newModule.moduleCost = 0;
    delete newModule.availableGeos;
    delete newModule.id;
    addModuleToQuotation(newModule);

    setSelectedModule({
      code: "-1",
      title: "Select module",
      availableGeos: ['']
    });
    setSelectedGeo({
      code: "-1",
      description: "Select geo"
    });
  };

  const changeSelectModuleInput = (code) => {
    if (code !== '-1') {
      const module = availableModules.find(m => m.code === code);
      setSelectedModule(module);

      const gs = [...module.availableGeos];
      gs.unshift({
        code: "-1",
        description: "Select geo"
      });
      setAvailableGeos(gs);
      setSelectedGeo({ code: "-1", description: "Select Geo" });
    }
  };

  const changeSelectGeoInput = (geoCode) => {
    if (geoCode !== '-1') {
      const geo = availableGeos.find(g => g.code === geoCode);
      setSelectedGeo(geo);
    }
  }

  const canCreate = () => {
    return selectedModule && selectedGeo && selectedGeo.code !== "-1" && selectedModule.code !== '-1';
  };

  return (
    <div className="row">
      <div
        id="wrapper-select-modules"
        className="input-field col s6"
      >
        <select
          className="browser-default"
          id="availableModules"
          value={selectedModule ? selectedModule.code : "-1"}
          onChange={(e) => changeSelectModuleInput(e.target.value)}
        >
          {availableModules.map(m =>
            <option value={m.code} key={m.code} disabled={m.availableGeos.length === 0}>
              {m.title}
            </option>
          )}
        </select>
        <label className="active">Module</label>
      </div>
      <div id="wrapper-select-geo" className="input-field col s6">
        <select
          className="browser-default"
          id="availableGeo"
          value={selectedGeo ? selectedGeo.code : '-1'}
          onChange={(e) => changeSelectGeoInput(e.target.value)}
        >
          {availableGeos.map(g =>
            <option value={g.code} key={g.code}>
              {g.description}
            </option>
          )}

        </select>
        <label className="active">Geo</label>
      </div>
      <div className="col s2 offset-s5">
        <a
          href="#!"
          className="waves-effect waves-light btn indigo"
          disabled={!canCreate()}
          onClick={(e) => addModule()}
        >
          Add module
          <i className="left material-icons" title="Add module">
            add
          </i>
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quotation: getQuotation(state),
    baseModules: getBaseModules(state),
    project: getProject(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addModuleToQuotation: (module) => dispatch(addModuleToSelectedQuotation(module))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewModule);