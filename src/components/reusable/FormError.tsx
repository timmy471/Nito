import React from 'react';
import { Typography } from '@src/components';
import { IFormError } from 'types';

export const FormError: React.FC<IFormError> = ({ children, msg }) => (
  <Typography className='form-error' state='error'>
    {children || msg}
  </Typography>
);
