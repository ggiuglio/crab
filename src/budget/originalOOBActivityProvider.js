import React from "react";

const OriginalOOBActivityProvider = ({ activity }) => {
  return (
    <tr>
      <td className="text-left">{activity.provider ? activity.provider.title : 'N/A'}</td>
      <td className="text-left">{activity.sponsorModuleTitle}</td>
      <td className="text-left">{activity.sponsorActivityTitle}</td>
      <td className="text-right">{activity.totalCost}</td>
    </tr>
  );
};

export default OriginalOOBActivityProvider;
