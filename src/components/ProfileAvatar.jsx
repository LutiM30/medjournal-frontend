import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DEFAULT_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
const ProfileAvatar = ({ user, className }) => {
  const displayName = user?.displayName || DEFAULT_NAME;
  const photoURL = user?.photoURL;

  const initials =
    `${displayName.charAt(0)}${displayName?.split(' ')[1]?.charAt(0) || displayName?.split(' ')[2]?.charAt(0)}`?.toUpperCase();

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={photoURL} alt={displayName} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
