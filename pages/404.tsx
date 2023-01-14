import Image from 'next/image';
import { assets } from '@src/assets';
import { useRouter } from 'next/router';
import { Typography, Button } from '@src/components';

const NotFound = () => {
  const { back } = useRouter();
  return (
    <div className='notfound-container'>
      <Image
        src={assets.NotFoundImg.src}
        alt={assets.NotFoundImg.alt}
        width={200}
        height={200}
      />
      <br />
      <Typography component='h3'>Oops! An error occurred!</Typography>
      <div className='mt-2'>
        <Typography variant='body6'>
          The page you are looking for isn’t available. Please go back using the button below.
        </Typography>
        <Button label='Go Back' onClick={() => back()} />
      </div>
    </div>
  );
};

export default NotFound;
