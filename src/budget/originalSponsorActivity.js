import React from "react";

const OriginalSponsorActivity = ({ activity }) => {
  return (
    <tr>
      <td>{activity.quotationCode}</td>
      <td className="text-right">{activity.activityCost}</td>
      <td className="text-right">{activity.incomes}</td>
      <td className={`text-right ${activity.activityCost - activity.incomes > 0 ? 'green-text' : 'red-text'}`}>
        {activity.activityCost - activity.incomes} (
        {100 - Math.round((activity.incomes / activity.activityCost) * 100)}%)
      </td>
    </tr>
  );
};

export default OriginalSponsorActivity;
