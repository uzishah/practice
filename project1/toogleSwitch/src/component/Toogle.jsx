// Toogle.jsx
import React, { useState } from "react";

const Toogle = () => {
  const [isOn, setIsOn] = useState(false);
  const handleToogle = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      className={`toogle-switch ${isOn ? "on" : ""}`} // Add 'on' class if isOn is true
      onClick={handleToogle}
    >
      <div className={`switch ${isOn ? "on" : ""}`}>
        <span className="toogle-state">{isOn ? "ON" : "OFF"}</span>{" "}
        {/* Text inside the bubble */}
      </div>
    </div>
  );
};

export default Toogle;
