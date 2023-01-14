import { IBackCTA } from 'types';
import { useRouter } from 'next/router';
import { Typography } from '@src/components';
import { CaretLeftOutlined } from '@ant-design/icons';

export const BackCTA: React.FC<IBackCTA> = ({ className }) => {
  const { back } = useRouter();

  return (
    <div
      className={`cursor-pointer width-fit-content ${className ? className : ''}`}
      onClick={() => back()}>
      <CaretLeftOutlined />{' '}
      <Typography variant='body6' className='font-inline'>
        Back
      </Typography>
    </div>
  );
};
