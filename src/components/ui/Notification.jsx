import React from 'react';

const Notification = (props) => {
  return (
    <div className='absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-md'>
      <div className='text-primary-foreground'>{props.children}</div>
    </div>
  );
};

export default Notification;
