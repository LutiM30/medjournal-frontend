import Image from 'next/image';
import doctorImage from './images/doc1.jpg';

const ProfileCard = () => {
    return (
        <div className="profile-card card p-4 mb-4 bg-white shadow-md rounded-md flex items-center">
            {/* Profile Image Wrapper */}
            <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden">
                <Image
                    src={doctorImage}
                    alt="Doctor Profile"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="ml-4">
                <h2 className="text-xl font-bold">Dr. John Czaja</h2>
                <p className="text-gray-600">Specialty: Cardiology</p>
                <p className="text-yellow-500">Rating: ★★★★☆</p>
            </div>
        </div>
    );
};

export default ProfileCard;
