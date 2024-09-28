// ProfileCard.js
import React from 'react';
import Image from 'next/image';

const ProfileCard = () => {
    return (
        <div className="flex items-center p-4 bg-white shadow-md rounded-md mb-4">
            <Image src='/images/doc1.jpg' width={100} height={100} alt="Doctor Profile" className="rounded-full" />
            <div className="ml-4">
                <h2 className="text-xl">Dr. Przemysław Czaja</h2>
                <p>Specialty: Cardiology</p>
                <p>Rating: ★★★★☆</p>
            </div>
        </div>
    );
};

export default ProfileCard;
