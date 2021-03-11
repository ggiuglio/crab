import React from "react";

const OriginaOOBActivity = ({ activity }) => {
  return (
    <li>
      <div className="row">
        <div className="col s3">{activity.type === 'SPONSOR' ? 'INCOME' : 'COST'}</div>
        <div className="col s3">{activity.moduleTitle}</div>
        <div className="col s3">{activity.activityTitle}</div>
        <div className="col s3">{activity.totalCost}</div>
      </div>
    </li>
  );
};

export default OriginaOOBActivity;
