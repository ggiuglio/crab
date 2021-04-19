import React from "react";

const OriginalProviderActivity = ({ activity }) => {
  return (
    <tr>
      <td>{activity.provider}</td>
      <td>{activity.quotationCode}</td>
      <td className="text-right">{activity.activityCost}</td>
      <td className="text-right">{activity.expenses}</td>
      <td
        className={`text-right ${activity.activityCost - activity.expenses > 0 ? "green-text" : "red-text"
          }`}
      >
        {activity.activityCost - activity.expenses} (
        {100 - Math.round((activity.expenses / activity.activityCost) * 100)}%)
      </td>
    </tr>
  );
};

export default OriginalProviderActivity;
