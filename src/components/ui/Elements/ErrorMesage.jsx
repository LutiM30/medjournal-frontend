import { IconAlertSmall } from '@tabler/icons-react';
import React from 'react';

const ErrorMessage = ({ msg = '' }) => (
  <div className='flex border rounded-lg w-full border-red-900'>
    <IconAlertSmall className='text-red-400' />
    <p className='text-red-400'>{msg}</p>
  </div>
);

export default ErrorMessage;
