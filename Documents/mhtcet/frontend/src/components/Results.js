import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Results({ results }) {
  const colleges = results.eligible_colleges;
  return (
    <div>
      <h2>Prediction Results</h2>
      <p>{results.gemini_recommendation}</p>
      <BarChart width={600} height={300} data={colleges}>
        <XAxis dataKey="College Name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Cutoff Score" fill="#8884d8" />
      </BarChart>
      <ul>
        {colleges.map((c, i) => (
          <li key={i}>
            <strong>{c["College Name"]}</strong> ({c.City}, {c.Branch}) - Cutoff: {c["Cutoff Score"]}
          </li>
        ))}
      </ul>
    </div>
  );
} 