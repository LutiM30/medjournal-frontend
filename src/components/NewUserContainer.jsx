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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { toast } from 'sonner';

const NewUser = (props) => {
  const [randomPwd, setRandomPwd] = useState(getRandomString());
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <Sheet
      onOpenChange={(isSheetOpen) => {
        if (isSheetOpen) {
          setRandomPwd(getRandomString());
        }
        setIsSheetOpen(isSheetOpen);
      }}
      open={isSheetOpen}
    >
      <SheetTrigger>
        <Button variant='outline' className='px-2'>
          New User
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader
          onClick={() => {
            navigator.clipboard.writeText(randomPwd);
            toast?.success(`${randomPwd} is copied to clipboard`);
          }}
        >
          <SheetTitle>Create New User</SheetTitle>
          <SheetDescription>
            This will create new user with password{' '}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant='secondary'>
                    {randomPwd || 'NewUser@MJ1'}
                  </Badge>{' '}
                </TooltipTrigger>
                <TooltipContent side='top' sideOffset={2}>
                  Click to copy
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            and user can change password by requesting reset password link
          </SheetDescription>
        </SheetHeader>
        <NewUserForm randomPwd={randomPwd} />
      </SheetContent>
    </Sheet>
  );
};

export default NewUser;
