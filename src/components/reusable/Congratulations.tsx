import Link from 'next/link';
import { Button, Typography } from '@src/components';
import { ICongratulationsPageProps } from 'types';

export const Congratulations: React.FC<ICongratulationsPageProps> = ({
  headerText = 'Congratulations!',
  bodyText,
  redirectLink,
  buttonLabel,
  containerClass,
  fullHeight,
}) => {
  return (
    <div
      className={`congratulations-container ${
        fullHeight ? 'congratulations-container__full-height' : ''
      }`}>
      <div className={`text-center ${containerClass}`}>
        <Typography component='h4'>{headerText}</Typography>
        <Typography className='mt-2 mb-4' variant='body6'>
          {bodyText}
        </Typography>
        <Link href={redirectLink} passHref>
          <Button label={buttonLabel} />
        </Link>
      </div>
    </div>
  );
};
