import React from "react";
import { VIEW_MODES } from "../constants/constants";

const Site = ({ subregion, nation, sites, classes, removeFunction, viewMode }) => {

  const printSite = (idx, name) => {
    return idx.toString().padStart(2, "0") + " " + name;
  }
;
  return (
    <div className={classes}>
    <img src={`https://restcountries.eu/data/${nation.toLowerCase()}.svg`} alt="" className="flag-small z-depth-1" />
      <span>{nation + ": "}</span>
      {sites.map((site, idx) => (
        <span key={nation + idx}>
          {printSite(idx+1, site.name)}
          { viewMode !== VIEW_MODES.VIEW ? 
          <a href="#!" title="Remove site" onClick={(e) => removeFunction(subregion, nation, idx)} className="remove-site-icon">
            <i className="tiny material-icons red-text text-darken-2">clear</i>
          </a> :
          "" }
        </span>
      ))}
    </div>
  );
};

export default Site;
