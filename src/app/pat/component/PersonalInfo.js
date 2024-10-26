import React, { useEffect, useState } from "react";
import Image from "next/image";
import patimage from './images/pat.jpg';
import { FaUser } from 'react-icons/fa';
import { useAtomValue } from 'jotai';
import { userAtom } from "@/lib/atoms/userAtom";

const PersonalInfo = ({ onChange }) => {
    const user = useAtomValue(userAtom);
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('Female');
    const [bloodGroup, setBloodGroup] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [otherNotes, setOtherNotes] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if (user) {
            if (user.displayName) {
                const [first, last] = user.displayName.split(" ");
                setFirstName(first);
                setLastName(last);
            }
        }
        onChange({ firstName, lastName, birthdate, gender, bloodGroup, height, weight, otherNotes });
    }, [user, firstName, lastName, birthdate, gender, bloodGroup, height, weight, otherNotes]);

    return (
        <div className="mb-6 p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col bg-gradient-to-r from-blue-200 to-green-200">
            <div className="flex items-start mb-4">
                <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-gray-500 mr-6 shadow-md">
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
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">First Name:</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="border-2 border-gray-400 rounded-lg p-2"
                                placeholder="Enter First Name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Last Name:</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="border-2 border-gray-400 rounded-lg p-2"
                                placeholder="Enter Last Name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Birthdate:</label>
                            <input
                                type="date"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                className="border-2 border-gray-400 rounded-lg p-2"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Gender:</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="border-2 border-gray-400 rounded-lg p-2"
                            >
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Blood Group:</label>
                            <input
                                type="text"
                                value={bloodGroup}
                                onChange={(e) => setBloodGroup(e.target.value)}
                                className="border-2 border-gray-400 rounded-lg p-2"
                                placeholder="Enter Blood Group"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Height (cm):</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="border-2 border-gray-400 rounded-lg p-2"
                                placeholder="Enter Height"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Weight (kg):</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="border-2 border-gray-400 rounded-lg p-2"
                                placeholder="Enter Weight"
                            />
                        </div>
                        <div className="flex flex-col col-span-4">
                            <label className="font-medium text-gray-700">Other Notes:</label>
                            <textarea
                                value={otherNotes}
                                onChange={(e) => setOtherNotes(e.target.value)}
                                className="border-2 border-gray-400 rounded-lg p-2"
                                placeholder="Additional information (optional)"
                                rows="3"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
