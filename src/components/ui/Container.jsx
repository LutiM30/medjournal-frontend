import { cn } from '@/lib/utils';
import React from 'react';

const Container = (props) => {
  return (
    <div className={cn('container p-4 mx-auto my-8', props.className || '')}>
      {props.children}
    </div>
  );
};

export default Container;
