import React from "react";

const OriginaOOBActivity = ({ activity }) => {
  const moduleTitle = activity.moduleId != "-1" ? activity.moduleTitle : '';
  const activityTitle = activity.activityId != "-1" ? activity.activityTitle : '';
  return (
    <li>
      <div className="row">
        <div className="col s2">{activity.type === 'SPONSOR' ? 'INCOME' : 'COST'}</div>
        <div className="col s4 truncate" title={moduleTitle}>{moduleTitle}</div>
        <div className="col s4 truncate" title={activityTitle}>{activityTitle}</div>
        <div className={`col s2 text-right ${activity.type === 'SPONSOR' ? "green-text" : "red-text"}`}>{activity.totalCost}</div>
      </div>
    </li>
  );
};

export default OriginaOOBActivity;
