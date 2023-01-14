import { Typography } from '@src/components';

export const InputLabel = ({ label = '', required = true }) => {
  return (
    <Typography variant='body7' className='mbottom-1 input-label'>
      {label} {required && <span className='font-danger'>*</span>}
    </Typography>
  );
};
