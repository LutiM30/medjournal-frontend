import React, { useRef } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import defaultImage from '@/app/doc/component/images/doc1.jpg';
import Notification from './ui/Notification';
import { Pencil } from 'lucide-react';

/**
 * Component for displaying and editing a user's profile picture.
 * Provides a circular image container that, when in editing mode, allows the user
 * to click to upload a new image. A tooltip appears on hover to indicate that the user
 * can change the picture.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.imageUrl - The URL of the current profile image. Falls back to a default image if not provided.
 * @param {Function} props.setImageUrl - Function to update the profile image URL after a new image is selected.
 * @param {File} props.file - The currently selected image file.
 * @param {Function} props.setFile - Function to update the selected image file.
 * @param {boolean} props.isEditing - Boolean indicating if the profile picture can be edited.
 * @returns {JSX.Element} The ProfilePictureHandler component.
 */
const ProfilePictureHandler = (props) => {
  const changeProfilePictureRef = useRef(null);
  const { imageUrl, setImageUrl, setFile, isEditing } = props;

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const newImageUrl = URL.createObjectURL(selectedFile);
      setImageUrl(newImageUrl);
      setFile(selectedFile);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className='group relative w-[200px] h-[200px] rounded-full overflow-hidden mx-auto mb-4 shadow-md transition-transform duration-300 hover:rotate-2'
            onClick={() => isEditing && changeProfilePictureRef.current.click()}
          >
            <Image
              src={imageUrl || defaultImage}
              alt='Profile Image'
              layout='fill'
              objectFit='cover'
              className='object-cover'
            />
            <input
              type='file'
              className='hidden'
              onChange={handleImageChange}
              ref={changeProfilePictureRef}
              accept='image/*'
            />
            {isEditing && (
              <Notification>
                <Pencil className='h-4 w-4' />
              </Notification>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click To Change</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProfilePictureHandler;
