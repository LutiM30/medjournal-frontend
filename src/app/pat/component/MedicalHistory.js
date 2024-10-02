 import React from "react";

const MedicalHistory = () => {
    return (
        <div className="mb-6 p-4 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Medical History</h2>
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
    );
};

export default MedicalHistory;
