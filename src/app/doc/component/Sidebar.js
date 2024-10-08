import Image from 'next/image';
import doctorImage from './images/doc1.jpg';

const ProfileCard = () => {
  return (
    <div className='profile-card card p-6 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-blue-500'>
      {/* Profile Image Wrapper */}
      <div className='relative w-[200px] h-[200px] rounded-full overflow-hidden mx-auto mb-4 shadow-md transition-transform duration-300 hover:rotate-3'>
        <Image
          src={doctorImage}
          alt='Doctor Profile'
          fill
          className='object-cover'
        />
      </div>

      <h2 className='text-2xl font-bold text-blue-700 transition-colors duration-300 hover:text-blue-600'>
        Dr. John Czaja
      </h2>
      <p className='text-lg text-gray-600 mb-1'>
        Specialty:{' '}
        <span className='text-blue-500 font-semibold'>Cardiology</span>
      </p>
      <p className='text-yellow-500 text-lg'>Rating: ★★★★☆</p>

      <hr className='my-4 border-gray-300' />

      {/* Address Section */}
      <div className='mb-4 text-left'>
        <h3 className='font-semibold text-purple-600'>Practice Address:</h3>
        <p className='text-gray-700'>123 Main St,</p>
        <p className='text-gray-700'>Toronto, ON,</p>
        <p className='text-gray-700'>M1K 1A1</p>
      </div>

      {/* Contact Information */}
      <div className='mb-4 text-left'>
        <h3 className='font-semibold text-purple-600'>Office Phone:</h3>
        <p className='text-gray-700'>(416) 123-4567</p>

        <h3 className='font-semibold text-purple-600'>Office Email:</h3>
        <p className='text-gray-700'>contact@downtownclinic.com</p>
      </div>

      {/* Additional Info Section */}
      <div className='mt-4 text-left'>
        <h3 className='font-semibold text-purple-600'>Languages Spoken:</h3>
        <p className='text-gray-700'>English, French, Spanish</p>
      </div>
    </div>
  );
};

export default ProfileCard;
