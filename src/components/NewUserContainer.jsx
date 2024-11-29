import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import NewUserForm from './ui/NewUserForm';
import { getRandomString } from '@/lib/utils';

const NewUser = (props) => {
  const [randomPwd, setRandomPwd] = useState(getRandomString());

  return (
    <Sheet
      onOpenChange={(state) => (!state ? '' : setRandomPwd(getRandomString()))}
    >
      <SheetTrigger>
        <Button variant='outline' className='px-2'>
          New User
        </Button>
      </SheetTrigger>
      <SheetContent side='bottom'>
        <SheetHeader>
          <SheetTitle>Create New User</SheetTitle>
          <SheetDescription>
            This will create new user with password{' '}
            <Badge variant='secondary'>{randomPwd || 'NewUser@MJ1'}</Badge> and
            user can change password by requesting reset password link
          </SheetDescription>
        </SheetHeader>
        <NewUserForm randomPwd={randomPwd} />
      </SheetContent>
    </Sheet>
  );
};

export default NewUser;
