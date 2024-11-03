import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);

            try {
                const patientsCollection = collection(db, 'patients'); // Reference to the 'patients' collection
                const querySnapshot = await getDocs(patientsCollection); // Fetch all documents in the collection
                const patientData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPatients(patientData);
            } catch (error) {
                console.error('Error fetching patients:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    // Filter patients based on search term
    const filteredPatients = patients.filter((patient) =>
        patient.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md">
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

            {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Loading patients...</p>
            ) : (
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
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((patient) => (
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center p-4 text-gray-500 dark:text-gray-400">
                                        No patients found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PatientList;
