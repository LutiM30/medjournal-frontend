import React from "react";
import { FaSmoking, FaBeer, FaDumbbell, FaCarrot } from 'react-icons/fa';

const LifestyleInfo = () => {
  return (
    <div className="mb-6 p-6 border border-green-400 dark:bg-slate-900 rounded-lg shadow-lg bg-green-50 transition-transform duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold mb-4 text-green-600 flex items-center">
        <FaCarrot className="text-green-600 mr-2" />
        Lifestyle Information
      </h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <FaSmoking className="text-green-600 mr-2" />
          <div>
            <label className="font-medium">Smoking Status:</label>
            <p className="text-white-700">Non-Smoker</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaBeer className="text-green-600 mr-2" />
          <div>
            <label className="font-medium">Alcohol Consumption:</label>
            <p className="text-white-700">Occasional</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaDumbbell className="text-green-600 mr-2" />
          <div>
            <label className="font-medium">Exercise Habits:</label>
            <p className="text-white-700">3 times a week</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaCarrot className="text-green-600 mr-2" />
          <div>
            <label className="font-medium">Diet Restrictions/Preferences:</label>
            <p className="text-white-700">Vegetarian</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestyleInfo;
