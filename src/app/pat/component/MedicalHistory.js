import React from "react";
import { FaHeartbeat, FaSyringe, FaFileMedical } from 'react-icons/fa';

const MedicalHistory = () => {
    return (
        <div className="mb-6 p-6 border border-blue-400 rounded-lg shadow-lg bg-blue-50 transition-transform duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600 flex items-center">
                <FaFileMedical className="text-blue-600 mr-2" />
                Medical History
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="font-medium">Current Medical Conditions:</label>
                    <p className="text-gray-700">Hypertension, Diabetes</p>
                </div>
                <div>
                    <label className="font-medium">Past Surgeries and Dates:</label>
                    <p className="text-gray-700">Appendectomy - 2015</p>
                </div>
                <div>
                    <label className="font-medium">Allergies:</label>
                    <p className="text-gray-700">Penicillin, Peanuts</p>
                </div>
                <div>
                    <label className="font-medium">Current Medications:</label>
                    <p className="text-gray-700">Metformin 500mg, Lisinopril 20mg</p>
                </div>
            </div>
        </div>
    );
};

export default MedicalHistory;
