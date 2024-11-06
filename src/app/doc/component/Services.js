import { FaStethoscope, FaBaby, FaSyringe } from 'react-icons/fa';

const Services = () => {
  return (
    <section className='max-w-4xl p-6 mx-auto mb-6 bg-white border-l-4 border-blue-500 rounded-lg shadow-lg dark:bg-slate-900'>
      <h3 className='pb-2 mb-4 text-2xl font-bold text-purple-600 border-b-2 border-blue-500'>
        Services and Price List
      </h3>
      <ul className='mt-2 space-y-4'>
        <li className='flex items-center'>
          <FaStethoscope className='mr-2 text-blue-500' />
          <span>
            Orthopedic Consultation -{' '}
            <span className='font-bold text-green-600'>$220</span>
          </span>
        </li>
        <li className='flex items-center'>
          <FaBaby className='mr-2 text-blue-500' />
          <span>
            Delivery Blocks -{' '}
            <span className='font-bold text-green-600'>$220</span>
          </span>
        </li>
        <li className='flex items-center'>
          <FaSyringe className='mr-2 text-blue-500' />
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
