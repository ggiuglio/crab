import React from "react";

const Site = ({ nation, sites, classes, removeFunction }) => {
  return (
    <div className={classes}>
    <img src={`https://restcountries.eu/data/${nation.toLowerCase()}.svg`} className="flag-small z-depth-1" />
      <span>{nation + ": "}</span>
      {sites.map((site, idx) => (
        <span key={nation + idx}>
          {idx.toString().padStart(2, "0") + " " + site.name}
          <a href="#!" title="Remove site" onClick={(e) => removeFunction(nation, idx)} className="remove-site-icon">
            <i className="tiny material-icons red-text text-darken-2">clear</i>
          </a>
        </span>
      ))}
    </div>
  );
};

export default Site;
