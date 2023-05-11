import React, { useState } from "react";
import "./class-add.styles.scss";

const AddClass = () => {
  const [catalogCode, setCatalogCode] = useState("");
  const [name, setName] = useState("");
  const [credits, setCredits] = useState("");
  const [quarterOffered, setQuarterOffered] = useState({
    Fall: false,
    Winter: false,
    Spring: false,
    Summer: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any further actions with the form data
    console.log({
      catalogCode,
      name,
      credits,
      quarterOffered,
    });
  };

  const handleQuarterOfferedChange = (quarter) => {
    setQuarterOffered((prevQuarterOffered) => ({
      ...prevQuarterOffered,
      [quarter]: !prevQuarterOffered[quarter],
    }));
  };

  return (
    <div className="form-container">
      <h1>Add Class</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="catalogCode">Catalog Code:</label>
          <input
            type="text"
            id="catalogCode"
            value={catalogCode}
            onChange={(e) => setCatalogCode(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="credits">Credits:</label>
          <input
            type="text"
            id="credits"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Quarter Offered:</label>
          <div>
            <label htmlFor="fall">
              <input
                type="checkbox"
                id="fall"
                checked={quarterOffered.Fall}
                onChange={() => handleQuarterOfferedChange("Fall")}
              />
              Fall
            </label>
          </div>
          <div>
            <label htmlFor="winter">
              <input
                type="checkbox"
                id="winter"
                checked={quarterOffered.Winter}
                onChange={() => handleQuarterOfferedChange("Winter")}
              />
              Winter
            </label>
          </div>
          <div>
            <label htmlFor="spring">
              <input
                type="checkbox"
                id="spring"
                checked={quarterOffered.Spring}
                onChange={() => handleQuarterOfferedChange("Spring")}
              />
              Spring
            </label>
          </div>
          <div>
            <label htmlFor="summer">
              <input
                type="checkbox"
                id="summer"
                checked={quarterOffered.Summer}
                onChange={() => handleQuarterOfferedChange("Summer")}
              />
              Summer
            </label>
          </div>
        </div>

        <button type="submit">Add Class</button>
      </form>
    </div>
  );
};

export default AddClass;
