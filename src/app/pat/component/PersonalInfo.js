import React, { useState } from "react";
import Image from "next/image"; // Import Next.js Image component
import patimage from './images/pat.jpg';
import { FaUser, FaBirthdayCake, FaVenus } from 'react-icons/fa'; // Import icons

const PersonalInfo = () => {
    // State for editable fields
    const [birthdate, setBirthdate] = useState('1990-04-15');
    const [gender, setGender] = useState('Female');
    const [bloodGroup, setBloodGroup] = useState('O+');
    const [height, setHeight] = useState('165 cm');
    const [weight, setWeight] = useState('65 kg');
    const [medications, setMedications] = useState('None');
    const [allergies, setAllergies] = useState('None');
    const [otherNotes, setOtherNotes] = useState('');

    return (
        <div className="mb-6 p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col transition-transform duration-300 hover:shadow-xl bg-white">
            {/* Profile Image */}
            <div className="flex items-center mb-4">
                <div className="w-32 h-32 relative rounded-full overflow-hidden border-2 border-gray-300 mr-4">
                    <Image
                        src={patimage}
                        alt="Patient Profile Picture"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                        <FaUser className="text-gray-600 mr-2" /> Personal Information
                    </h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center">
                            <FaUser className="text-gray-600 mr-2" />
                            <div>
                                <label className="font-medium">First Name:</label>
                                <p className="text-gray-700">Kumari</p> {/* Read-only */}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FaUser className="text-gray-600 mr-2" />
                            <div>
                                <label className="font-medium">Last Name:</label>
                                <p className="text-gray-700">Sharma</p> {/* Read-only */}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FaUser className="text-gray-600 mr-2" />
                            <div>
                                <label className="font-medium">Email:</label>
                                <p className="text-gray-700">kumari.sharma@example.com</p> {/* Read-only */}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FaBirthdayCake className="text-gray-600 mr-2" />
                            <div>
                                <label className="font-medium">Birthdate:</label>
                                <input
                                    type="date"
                                    value={birthdate}
                                    onChange={(e) => setBirthdate(e.target.value)}
                                    className="text-gray-700 border border-gray-300 p-1 rounded"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FaVenus className="text-gray-600 mr-2" />
                            <div>
                                <label className="font-medium">Gender:</label>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="text-gray-700 border border-gray-300 p-1 rounded"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div>
                                <label className="font-medium">Blood Group:</label>
                                <input
                                    type="text"
                                    value={bloodGroup}
                                    onChange={(e) => setBloodGroup(e.target.value)}
                                    className="text-gray-700 border border-gray-300 p-1 rounded"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div>
                                <label className="font-medium">Height:</label>
                                <input
                                    type="text"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="text-gray-700 border border-gray-300 p-1 rounded"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div>
                                <label className="font-medium">Weight:</label>
                                <input
                                    type="text"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="text-gray-700 border border-gray-300 p-1 rounded"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div>
                                <label className="font-medium">Current Medications:</label>
                                <input
                                    type="text"
                                    value={medications}
                                    onChange={(e) => setMedications(e.target.value)}
                                    className="text-gray-700 border border-gray-300 p-1 rounded"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div>
                                <label className="font-medium">Allergies:</label>
                                <input
                                    type="text"
                                    value={allergies}
                                    onChange={(e) => setAllergies(e.target.value)}
                                    className="text-gray-700 border border-gray-300 p-1 rounded"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div>
                                <label className="font-medium">Other Notes:</label>
                                <textarea
                                    value={otherNotes}
                                    onChange={(e) => setOtherNotes(e.target.value)}
                                    className="text-gray-700 border border-gray-300 p-1 rounded"
                                    placeholder="Additional information (optional)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
