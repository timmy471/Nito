import { IFileUploadProps } from 'types';
import React, { useCallback, useState } from 'react';
import { Typography } from '@src/components';
import { useDropzone } from 'react-dropzone';

export const ProfileImageUpload: React.FC<IFileUploadProps> = ({
  acceptedFormats = { 'image/*': ['.jpeg', '.png', '.jpg'] },
  label,
  maxSize = 20000000, //20MB
  onChange,
  displayProfileImage,
}) => {
  const [imageUploaded, setImageUploaded] = useState<File | undefined>(undefined);

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFormats,
    maxSize: maxSize,
    onDrop: useCallback(
      (file: File[]) => {
        setImageUploaded(file[0]);
        onChange(file[0]);
      },
      //eslint-disable-next-line
      [onChange]
    ),
    multiple: false,
  });

  return (
    <div {...getRootProps()} className='profile-image-container'>
      <input {...getInputProps()} />
      {imageUploaded && displayProfileImage ? (
        <div className='uploaded-image'>
          <img
            src={URL.createObjectURL(imageUploaded)}
            width='100%'
            height='100%'
            alt='Avatar'
          />
        </div>
      ) : (
        <div className='profile-image d-flex align-items-center justify-content-center'>
          <div>
            <Typography>Add</Typography>
            <Typography>Photo</Typography>
          </div>
        </div>
      )}
    </div>
  );
};
