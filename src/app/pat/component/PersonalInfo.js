// src/components/PersonalInfo.jsx
import React from "react";
import Image from "next/image"; // Import Next.js Image component
import patimage from './images/pat.jpg';

const PersonalInfo = () => {
    return (
        <div className="mb-6 p-4 border rounded-lg shadow-md flex items-center">
            {/* Profile Image */}
            <div className="mr-4">
                <Image
                    src={patimage} // Path to the image in the public directory
                    alt="Patient Profile Picture"
                    width={250} // Specify the width
                    height={250} // Specify the height
                    className="rounded-full" // Add rounded corners
                />
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="font-medium">Name:</label>
                        <p>Kumari</p>
                    </div>
                    <div>
                        <label className="font-medium">Age:</label>
                        <p>34</p>
                    </div>
                    <div>
                        <label className="font-medium">Date of Birth:</label>
                        <p>1990-04-15</p>
                    </div>
                    <div>
                        <label className="font-medium">Gender:</label>
                        <p>Female</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
