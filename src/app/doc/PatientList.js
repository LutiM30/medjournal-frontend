import React, { useState } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';
import { DOCTOR_ROLE } from '@/lib/constants';

const PatientList = () => {
    const user = useAtomValue(userAtom);
    const [searchTerm, setSearchTerm] = useState('');
    const patients = [
        {
            id: '1',
            name: 'John Doe',
            age: 45,
            lastVisit: '2024-09-12',
            condition: 'Diabetes',
            contact: '123-456-7890',
        },
        {
            id: '2',
            name: 'Jane Smith',
            age: 34,
            lastVisit: '2024-08-10',
            condition: 'Hypertension',
            contact: '987-654-3210',
        },
        // Additional patients can be added here
    ];

    // Filter patients based on search term
    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto mt-14 p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md">
            {/* Page Title */}
            <h1 className="text-3xl font-semibold text-blue-700 mb-6">Patient List</h1>

            {/* Search Bar */}
            <div className="flex items-center mb-6">
                <input
                    type="text"
                    className="w-full md:w-1/3 p-2 border rounded-lg shadow-sm text-gray-800"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Patient Table */}
            <div className="overflow-x-auto bg-white dark:bg-slate-800 shadow-md rounded-lg">
                <table className="w-full table-auto text-left text-gray-700 dark:text-gray-300">
                    <thead className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Age</th>
                            <th className="p-4">Last Visit</th>
                            <th className="p-4">Condition</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient) => (
                            <tr
                                key={patient.id}
                                className="border-t border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-700"
                            >
                                <td className="p-4">{patient.name}</td>
                                <td className="p-4">{patient.age}</td>
                                <td className="p-4">{patient.lastVisit}</td>
                                <td className="p-4">{patient.condition}</td>
                                <td className="p-4">{patient.contact}</td>
                                <td className="p-4 text-center">
                                    <button className="text-blue-500 hover:underline dark:text-blue-300">
                                        View
                                    </button>
                                    <span className="mx-2 text-gray-400">|</span>
                                    <button className="text-red-500 hover:underline dark:text-red-400">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Message for no patients */}
            {filteredPatients.length === 0 && (
                <p className="text-center text-gray-500 mt-6 dark:text-gray-400">
                    No patients found.
                </p>
            )}
        </div>
    );
};

export default PatientList;