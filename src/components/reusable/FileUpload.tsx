import Image from 'next/image';
import { useState } from 'react';
import { assets } from '@src/assets';
import { IFileUploadProps } from 'types';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button } from '@src/components';
import { displayAlert } from '@src/helpers';

export const FileUpload: React.FC<IFileUploadProps> = ({
  // acceptedFormats = { 'image/*': ['.jpeg', '.png', '.jpg'] },
  acceptedFormats = { 'application/pdf': ['.pdf'] },
  label,
  maxSize = 20000000, //20MB
  onChange,
  uploadedFile,
  uploadedFileUrl,
  nameOfFile,
  className,
  hasError,
  size = 'sm',
}) => {
  const { CancelIcon, FileIcon } = assets;
  const [showDoc, setShowDoc] = useState(!!uploadedFileUrl);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedFormats,
    maxSize: maxSize,
    onDrop: useCallback(
      (file: File[]) => {
        // check for file extension
        if (!acceptedFormats && file[0].type !== 'application/pdf') {
          displayAlert({ msg: 'File must be in PDF Format' });
        } else {
          onChange(file[0]);
        }
      },
      //eslint-disable-next-line
      [onChange]
    ),
    multiple: false,
  });

  if (size === 'sm')
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={`file-upload-container d-flex align-items-center justify-content-between pr-3 ${
            hasError ? 'file-upoad__error' : ''
          } ${className}`}>
          <div className='d-flex align-items-center'>
            <Button label='Browse' />
            {uploadedFile ? (
              <div className='ml-1 d-flex align-items-center'>
                <Image src={FileIcon.src} alt={FileIcon.alt} height={18} width={18} />
                <Typography className='mb-0 ml-2' variant='body9'>
                  {uploadedFile?.name}
                </Typography>
              </div>
            ) : (
              <Typography className='mb-0 ml-2' variant='body10'>
                {label}
              </Typography>
            )}
          </div>
          {uploadedFile && (
            <Image
              src={CancelIcon.src}
              alt={CancelIcon.alt}
              height={15}
              width={15}
              onClick={() => onChange('')}
            />
          )}
        </div>
      </div>
    );

  return (
    <>
      {!showDoc && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className='file-upload-container file-upload-container__large'>
            <Typography variant='body5'>{label}</Typography>
            <div className='text-center'>
              {isDragActive ? (
                <Typography variant='body7' className='mb-0'>
                  Drop file here ...
                </Typography>
              ) : (
                <>
                  <Image src={assets.CloudIcon.src} height='90' width='90' alt='Icon' />
                  <Typography variant='body7' className='mb-0'>
                    Drag n Drop here
                  </Typography>
                  <Typography variant='body8'>or browse</Typography>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {uploadedFile ? (
        <div className='mt-1 d-flex align-items-center justify-content-between uploaded-doc-detail'>
          <div className='d-flex align-items-center'>
            <Image src={FileIcon.src} alt={FileIcon.alt} height={22} width={22} />
            <Typography className='mb-0 ml-2 word-break pr-2' variant='body9'>
              {uploadedFile?.name}
            </Typography>
          </div>

          <Typography
            state='tetiary'
            variant='body9'
            className='mb-0 cursor-pointer'
            onClick={() => onChange('')}>
            Delete
          </Typography>
        </div>
      ) : showDoc ? (
        <div className='mt-1 d-flex align-items-center justify-content-between uploaded-doc-detail'>
          <div className='d-flex align-items-center'>
            <Image src={FileIcon.src} alt={FileIcon.alt} height={22} width={22} />
            <Typography className='mb-0 ml-2 word-break pr-2' variant='body9'>
              {nameOfFile}
            </Typography>
          </div>

          <div className='d-flex '>
            <Typography
              state='tetiary'
              variant='body9'
              className='mb-0 cursor-pointer mr-4'
              onClick={() => setShowDoc(false)}>
              Edit
            </Typography>
            <a href={uploadedFileUrl} target='__blank' rel='noopener'>
              <Typography state='tetiary' variant='body9' className='mb-0 cursor-pointer'>
                View
              </Typography>
            </a>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
