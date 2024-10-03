// src/components/LifestyleInfo.jsx
import React from "react";

const LifestyleInfo = () => {
  return (
    <div className="mb-6 p-4 border border-green-400 rounded-lg shadow-lg bg-green-50"> {/* Added background and border */}
      <h2 className="text-xl font-semibold mb-4 text-green-600">Lifestyle Information</h2>
      <div>
        <label className="font-medium">Smoking Status:</label>
        <p>Non-Smoker</p>
      </div>
      <div>
        <label className="font-medium">Alcohol Consumption:</label>
        <p>Occasional</p>
      </div>
      <div>
        <label className="font-medium">Exercise Habits:</label>
        <p>3 times a week</p>
      </div>
      <div>
        <label className="font-medium">Diet Restrictions/Preferences:</label>
        <p>Vegetarian</p>
      </div>
    </div>
  );
};

export default LifestyleInfo;
