import React from "react";
import { connect } from "react-redux";
import { VIEW_MODES } from "../constants/constants";
import { getRegions, getSelectedProject } from "../store/selectors/projectSelectors";
import { setProjectGeos } from "../store/actions/projectActions";

const Geo = ({ viewMode, subregion, nations, classes, project, regions, setNewProjectGeos }) => {
  const setModalValues = (nation, subregion) => {
    document.getElementById("siteNationTitle").innerText = nation.toUpperCase();
    document.getElementById("siteNation").value = nation.toUpperCase();
    document.getElementById("siteSubregion").value = subregion;
  };

  const removeGeo = (region, geo) => {
    const currentGeos = project.geos;
    if(Object.keys(currentGeos[region]).length > 2) {
      delete currentGeos[region][geo];
      const selectedRegion = regions.find(r => r.code === region);
      currentGeos[region].description = `${selectedRegion.name} -`;
      Object.keys(currentGeos[region]).forEach(k => {
        if (k !== "description") {
          currentGeos[region].description += ` ${geo}`
        }
      })
    } else {
      delete currentGeos[region]
    }

    setNewProjectGeos(currentGeos);
  };

  return (
    <div className={classes}>
      <span>{subregion + " - "}</span>
      {Object.keys(nations).filter((k) => {
        return !/^description$/i.test(k)
      }).map((nation, idx, list) => (
        <span key={subregion + nation}>
          {
            viewMode !== VIEW_MODES.VIEW ? (
              <span>
                <a
                  className="indigo white-text modal-trigger"
                  href="#modal-site"
                  title="Add site"
                  onClick={(e) => setModalValues(nation, subregion)}
                >
                  {nation.toUpperCase()}
                </a>
                <a href="#!" title="Remove geo" onClick={(e) => removeGeo(subregion, nation)} className="remove-site-icon">
                  <i className="tiny material-icons red-text text-darken-2">clear</i>
                </a>
              </span>
            ) : (
                <span>{nation.toUpperCase()}</span>

              )}

          {list.length === idx + 1 ? "" : ", "}
        </span>
      ))}
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    project: getSelectedProject(state),
    regions: getRegions(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewProjectGeos: (geos) => dispatch(setProjectGeos(geos)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Geo);