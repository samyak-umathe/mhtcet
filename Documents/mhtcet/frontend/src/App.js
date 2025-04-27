import React, { useState } from "react";
import InputForm from "./components/InputForm";
import Results from "./components/Results";
import "./styles/main.css";

function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="App">
      <h1>Welcome to CollegePath Finder!</h1>
      <p>Discover your future with personalized college admission predictions based on your MHT CET score.</p>
      <InputForm setResults={setResults} />
      {results && <Results results={results} />}
    </div>
  );
}

export default App; 