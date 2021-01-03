import React from "react";
import { useLocation } from "react-router-dom";

const Geo = ({ subregion, nations, classes }) => {
  const setModalValues = (nation, subregion) => {
    document.getElementById("siteNationTitle").innerText = nation.toUpperCase();
    document.getElementById("siteNation").value = nation.toUpperCase();
    document.getElementById("siteSubregion").value = subregion;
  };

  const cleanUpGeoName = (name) => {
    const regex = /%20/g;
    return name.replaceAll(regex, " ");
  };

  const showAddSite = useLocation().pathname === "/new-project";

  return (
    <div className={classes}>
      <span>{cleanUpGeoName(subregion) + " - "}</span>
      {Object.keys(nations).filter((k) => {
        return !/^description$/i.test(k)
      }).map((nation, idx, list) => (
        <span key={subregion + nation}>
          { //Link insert site only in new-project
           showAddSite ? (
            <a
              className="indigo white-text modal-trigger"
              href="#modal-site"
              title="Add site"
              onClick={(e) => setModalValues(nation, subregion)}
            >
              {nation.toUpperCase()}
            </a>
          ) : (
            <span>{nation.toUpperCase()}</span>
          )}

          {list.length === idx + 1 ? "" : ", "}
        </span>
      ))}
    </div>
  );
};

export default Geo;
