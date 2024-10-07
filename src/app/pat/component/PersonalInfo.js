import React from "react";
import Image from "next/image"; // Import Next.js Image component
import patimage from './images/pat.jpg';
import { FaUser, FaBirthdayCake, FaVenus } from 'react-icons/fa'; // Import icons

const PersonalInfo = () => {
    return (
        <div className="mb-6 p-6 border border-gray-300 dark:bg-slate-900 rounded-lg shadow-lg flex items-center transition-transform duration-300 hover:shadow-xl bg-white">
            {/* Profile Image */}
            <div className="mr-4">
                <div className="w-32 h-32 relative rounded-full overflow-hidden border-2 border-gray-300">
                    <Image
                        src={patimage}
                        alt="Patient Profile Picture"
                        layout="fill" // Make image fill the container
                        objectFit="cover" // Ensure the image covers the entire container
                    />
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-white-800 flex items-center">
                    <FaUser className="text-white-600 mr-2" />
                    Personal Information
                </h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center">
                        <FaUser className="text-white-600 mr-2" />
                        <div>
                            <label className="font-medium">Name:</label>
                            <p className="text-white-700">Kumari</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FaBirthdayCake className="text-white-600 mr-2" />
                        <div>
                            <label className="font-medium">Age:</label>
                            <p className="text-white-700">34</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FaBirthdayCake className="text-white-600 mr-2" />
                        <div>
                            <label className="font-medium">Date of Birth:</label>
                            <p className="text-white-700">1990-04-15</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FaVenus className="text-white-600 mr-2" />
                        <div>
                            <label className="font-medium">Gender:</label>
                            <p className="text-white-700">Female</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
