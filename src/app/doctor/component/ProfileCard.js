import Image from 'next/image';
import doctorImage from './images/doc1.jpg';

const ProfileCard = () => {
    return (
        <div className="profile-card card p-4 mb-4 bg-white shadow-md rounded-md">
            <Image src={doctorImage} width={200} height={200} alt="Doctor Profile" className="profile-image rounded-full mb-4" />
            <div className="text-center">
                <h2 className="text-xl font-bold">Dr. Przemysław Czaja</h2>
                <p className="text-gray-600">Specialty: Cardiology</p>
                <p className="text-yellow-500">Rating: ★★★★☆</p>
            </div>
        </div>
    );
};

export default ProfileCard;
