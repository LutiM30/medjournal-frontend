import { motion } from 'framer-motion';
import Image from 'next/image';
import { IconLockAccess } from '@tabler/icons-react';
import { IconCalendarPlus } from '@tabler/icons-react';
import { IconCalendarTime } from '@tabler/icons-react';
import { IconBrandReactNative } from '@tabler/icons-react';
export const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial='initial'
      whileHover='animate'
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2'
    >
      <motion.div
        variants={variants}
        className='flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black'
      >
        <div className='h-6 w-6 rounded-full flex-shrink-0 '>
          {/* <img src="https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Homepage%2Fappointment-request.png?alt=media&token=972859d5-7271-463e-bfd4-e57db9c932f6" alt="appointment-icon" padding="1" height="100" width="100" className="rounded-full w-7" /> */}

          <IconCalendarPlus className='h-4 w-5 pl-1 dark:text-white text-white:white' />
        </div>
        <div className='w-full h-9 rounded-full '>
          <p className='text-sm dark:text-white text-black'>
            Book doctor’s appointment online.
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className='flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black'
      >
        <div className='w-full h-4 rounded-full'>
          <p className='text-sm dark:text-white text-black'>Skip the wait</p>
        </div>
        {/* and get care fast. */}
        <div className='h-6 w-6 rounded-full bg-gradient-to-r from-gray-500 to-violet-500 flex-shrink-0'>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Homepage%2Fman%20waiting%20for%20someone%20to_5782113.png?alt=media&token=d4a46e0f-7d35-4f42-9e60-71bb7270a4bf'
            alt='appointment-icon'
            height='100'
            width='100'
            className='rounded-full w-10'
          />
        </div>
      </motion.div>
      <motion.div
        variants={variants}
        className='flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black'
      >
        <div className='h-6 w-6 rounded-full flex-shrink-0'>
          <IconCalendarTime className='h-4 w-5 pl-1 dark:text-white text-white:white' />
        </div>
        <div className='w-full h-10 rounded-full'>
          <p className='text-sm dark:text-white text-black'>
            Easy scheduling, just a click away!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
export const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: '100%',
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ['0%', '100%'],
      transition: {
        duration: 2,
      },
    },
  };
  const paragraph = `
   Access Records
View History
Track Treatments
`;

  const sentences = paragraph
    .trim()
    .split('\n')
    .map((sentence) => sentence.trim());

  return (
    <motion.div
      initial='initial'
      animate='animate'
      whileHover='hover'
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2'
    >
      {sentences.map((sentence, i) => (
        <motion.div
          key={'sentence-' + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + '%',
          }}
          className='flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-auto'
        >
          <p className='text-sm dark:text-white text-black pl-1'>{sentence}</p>
        </motion.div>
      ))}
    </motion.div>
  );

  // const arr = new Array(6).fill(0);
  // return (
  //     (<motion.div
  //         initial="initial"
  //         animate="animate"
  //         whileHover="hover"
  //         className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2">
  //         {arr.map((_, i) => (
  //             <motion.div
  //                 key={"skelenton-two" + i}
  //                 variants={variants}
  //                 style={{
  //                     maxWidth: Math.random() * (100 - 40) + 40 + "%",
  //                 }}
  //                 className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4">

  //                 </motion.div>
  //         ))}
  //     </motion.div>)
  // );
};
export const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: '0 50%',
    },
    animate: {
      backgroundPosition: ['0, 50%', '100% 50%', '0 50%'],
    },
  };
  return (
    <motion.div
      initial='initial'
      animate='animate'
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2'
      style={{
        background:
          'linear-gradient(-45deg, #dff5ef, #3ce1e7, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        opacity: 0.8,
      }}
    >
      <motion.div className='h-full w-full rounded-lg flex justify-center items-center'>
        <IconLockAccess
          className='h-50 w-50 text-neutral-500'
          width={180}
          height={180}
          style={{ opacity: 1, color: '#171717' }}
        />
      </motion.div>
    </motion.div>
  );
};
export const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial='initial'
      animate='animate'
      whileHover='hover'
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2'
    >
      <motion.div
        variants={first}
        className='h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center'
      >
        <Image
          src='/images/User2.jpg'
          alt='avatar'
          height='150'
          width='100'
          className='rounded-full h-10 w-10'
        />
        <p className='sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4'>
          Regular check-ups ensure good health.
        </p>
        <p className='border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4'>
          Prevention of health issues
        </p>
      </motion.div>
      <motion.div className='h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center'>
        <Image
          src='/images/User3.jpg'
          alt='avatar'
          height='100'
          width='100'
          className='rounded-full h-10 w-10'
        />
        <p className='sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4'>
          Hydrate well and manage stress.
        </p>
        <p className='border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4'>
          Supports daily health & well-being
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className='h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center'
      >
        <Image
          src='/images/User1.jpg'
          alt='avatar'
          height='100'
          width='100'
          className='rounded-full h-10 w-10'
        />
        <p className='sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4'>
          Stay active, maintain a diet.
        </p>
        <p className='border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4'>
          Promotes overall wellness
          {/* and disease prevention */}
        </p>
      </motion.div>
    </motion.div>
  );
};

export const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial='initial'
      whileHover='animate'
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2'
    >
      <motion.div
        variants={variants}
        className='flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black'
      >
        <Image
          src='https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg'
          alt='avatar'
          height='100'
          width='100'
          className='rounded-full h-10 w-10'
        />
        <p className='text-xs text-neutral-500'>
          Accessible Content: Ensuring all users can navigate and engage.
          User-Friendly Interface: Clear layouts and visual cues.
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className='flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black'
      >
        <p className='text-xs text-neutral-500'>We used Nextjs.</p>
        <div className='h-6 w-6 rounded-full flex-shrink-0'>
          <IconBrandReactNative className='h-6 w-6 dark:text-white text-white:white' />
        </div>
      </motion.div>
    </motion.div>
  );
};
