import React, { useState } from "react";
import axios from "axios";

const cities = ["Mumbai", "Pune", "Nagpur", "Nashik"];
const branches = ["Computer Science", "Mechanical Engineering", "Electrical Engineering"];

export default function InputForm({ setResults }) {
  const [score, setScore] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get("http://localhost:8000/predict", {
      params: {
        score,
        cities: selectedCities.join(","),
        branches: selectedBranches.join(","),
      },
    });
    setResults(res.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your MHT CET Score:
        <input type="number" value={score} onChange={e => setScore(e.target.value)} required />
      </label>
      <label>
        Select Cities:
        <select multiple value={selectedCities} onChange={e => setSelectedCities([...e.target.selectedOptions].map(o => o.value))}>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </label>
      <label>
        Select Branches:
        <select multiple value={selectedBranches} onChange={e => setSelectedBranches([...e.target.selectedOptions].map(o => o.value))}>
          {branches.map(branch => <option key={branch} value={branch}>{branch}</option>)}
        </select>
      </label>
      <button type="submit">Predict Colleges</button>
    </form>
  );
} 