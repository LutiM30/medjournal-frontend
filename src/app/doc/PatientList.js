'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = 10;

    // Fetch all patients from the Firestore `patients` collection
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patientsRef = collection(db, 'patients');
                const snapshot = await getDocs(patientsRef);

                const patientData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
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

    // Filter patients based on the search term
    const filteredPatients = patients.filter((patient) =>
        patient.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
    const startIndex = (currentPage - 1) * patientsPerPage;
    const currentPatients = filteredPatients.slice(
        startIndex,
        startIndex + patientsPerPage
    );

    const handleViewClick = (patient) => {
        setSelectedPatient(patient);
    };

    const closeModal = () => {
        setSelectedPatient(null);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="max-w-6xl mx-auto mt-14 p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md">
            {/* Page Title */}
            <h1 className="text-3xl font-semibold text-blue-700 mb-6">Patient List</h1>

            {/* Search Bar */}
            <div className="flex items-center mb-6">
                <input
                    type="text"
                    className="w-full md:w-1/3 p-2 border rounded-lg shadow-sm text-gray-800 dark:text-gray-300"
                    placeholder="Search patients by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Loading patients...</p>
            ) : filteredPatients.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No patients found.</p>
            ) : (
                <div>
                    <div className="overflow-x-auto bg-white dark:bg-slate-800 shadow-md rounded-lg">
                        {/* Patient Table */}
                        <table className="w-full table-auto text-left text-gray-700 dark:text-gray-300">
                            <thead className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                                <tr>
                                    <th className="p-4">First Name</th>
                                    <th className="p-4">Last Name</th>
                                    <th className="p-4">Birthdate</th>
                                    <th className="p-4">Gender</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPatients.map((patient) => (
                                    <tr
                                        key={patient.id}
                                        className="border-t border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-700"
                                    >
                                        <td className="p-4">{patient.firstName}</td>
                                        <td className="p-4">{patient.lastName}</td>
                                        <td className="p-4">{patient.birthdate}</td>
                                        <td className="p-4">{patient.gender}</td>
                                        <td className="p-4 text-center">
                                            <button
                                                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                                onClick={() => handleViewClick(patient)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-6">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`mx-1 px-3 py-1 rounded-lg ${currentPage === index + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Patient Details Modal */}
            {selectedPatient && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-96 p-6 bg-white rounded-lg shadow-lg dark:bg-slate-900 dark:text-gray-300">
                        <h2 className="mb-4 text-2xl font-semibold text-blue-700">Patient Details</h2>
                        <p><strong>First Name:</strong> {selectedPatient.firstName}</p>
                        <p><strong>Last Name:</strong> {selectedPatient.lastName}</p>
                        <p><strong>Birthdate:</strong> {selectedPatient.birthdate}</p>
                        <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                        <p><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</p>
                        <p><strong>Height:</strong> {selectedPatient.height} ft</p>
                        <p><strong>Weight:</strong> {selectedPatient.weight} kg</p>
                        <p><strong>Allergies:</strong> {selectedPatient.allergies}</p>
                        <p><strong>Current Medications:</strong> {selectedPatient.currentMedications}</p>
                        <p><strong>Medical Conditions:</strong> {selectedPatient.medicalConditions}</p>
                        <p><strong>Past Surgeries:</strong> {selectedPatient.pastSurgeries}</p>
                        <p><strong>Other Notes:</strong> {selectedPatient.otherNotes}</p>
                        <button
                            className="mt-4 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientList;
