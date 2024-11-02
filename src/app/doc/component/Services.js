import { FaStethoscope, FaBaby, FaSyringe } from 'react-icons/fa';

const Services = () => {
  return (
    <section className='max-w-4xl mx-auto p-6 mb-6 shadow-lg rounded-lg bg-white border-l-4 border-blue-500 dark:bg-slate-900'>
      <h3 className='text-2xl font-bold text-purple-600 mb-4 border-b-2 border-blue-500 pb-2'>
        Services and Price List
      </h3>
      <ul className='mt-2 space-y-4'>
        <li className='flex items-center'>
          <FaStethoscope className='text-blue-500 mr-2' />
          <span>
            Orthopedic Consultation -{' '}
            <span className='font-bold text-green-600'>$220</span>
          </span>
        </li>
        <li className='flex items-center'>
          <FaBaby className='text-blue-500 mr-2' />
          <span>
            Delivery Blocks -{' '}
            <span className='font-bold text-green-600'>$220</span>
          </span>
        </li>
        <li className='flex items-center'>
          <FaSyringe className='text-blue-500 mr-2' />
          <span>
            Ultrasound Injection -{' '}
            <span className='font-bold text-green-600'>$220</span>
          </span>
        </li>
      </ul>
    </section>
  );
};

export default Services;
