import React from "react";

export default function CollegeDetails({ college }) {
  if (!college) return null;
  return (
    <div className="college-details">
      <h3>{college["College Name"]}</h3>
      <p>City: {college.City}</p>
      <p>Branch: {college.Branch}</p>
      <p>Cutoff Score: {college["Cutoff Score"]}</p>
      {/* Add more details as needed */}
    </div>
  );
} 