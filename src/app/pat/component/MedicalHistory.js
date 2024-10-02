// src/components/MedicalHistory.jsx
import React from "react";

const MedicalHistory = () => {
    return (
        <div className="mb-6 p-4 border border-blue-400 rounded-lg shadow-lg bg-blue-50"> {/* Added background and border */}
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Medical History</h2>
            <div>
                <label className="font-medium">Current Medical Conditions:</label>
                <p>Hypertension, Diabetes</p>
            </div>
            <div>
                <label className="font-medium">Past Surgeries and Dates:</label>
                <p>Appendectomy - 2015</p>
            </div>
            <div>
                <label className="font-medium">Allergies:</label>
                <p>Penicillin, Peanuts</p>
            </div>
            <div>
                <label className="font-medium">Current Medications:</label>
                <p>Metformin 500mg, Lisinopril 20mg</p>
            </div>
        </div>
    );
};

export default MedicalHistory;
