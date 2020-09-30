import React from "react";

const Geo = ({ subregion, nations, classes }) => {
    const cleanUpGeoName = (name) => {
        const regex = /%20/g;
        return name.replaceAll(regex, ' ');
    };

  return (
    <div className={classes}>
      <span>{cleanUpGeoName(subregion) + " - "}</span>
      {
      nations.map((nation, idx, list) => (
        <span key={subregion+nation}>{nation.toUpperCase() + (list.length === idx + 1 ? "" : ", ")}</span>
      ))}
      ;
    </div>
  );
};

export default Geo;
