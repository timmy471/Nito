import Image from 'next/image';
import { Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/redux/store';

import { assets } from '@src/assets';
import { LoadingSpinner, Typography } from '@src/components';
import { ILP } from 'types';
import { formatDate } from '@src/helpers';

interface IProps {
  currentLP: ILP | null;
}
export const GeneralLPDetail: React.FC<IProps> = ({ currentLP }) => {
  const { selectedLP }: any = useSelector((state: RootState) => state.lp);

  const { loading, data } = selectedLP;

  if (loading) return <LoadingSpinner />;

  const { email, lastName, firstName, avatar, userType, isOnboarded, createdAt } = data;

  return (
    <div className='px-4 pb-4 lp-detail-container'>
      <div className='mb-2 d-flex lp-detail'>
        <Image
          src={avatar || assets.UserAvatarIcon.src}
          alt={assets.UserAvatarIcon.alt}
          width={80}
          height={80}
        />
        <div className='d-flex flex-column ml-2 mt-1'>
          <div className='d-flex'>
            <Typography variant='body3'>
              {firstName} {lastName}
            </Typography>
          </div>
          <Typography className='mb-0 date-created' state='secondary' variant='body10'>
            Joined {formatDate(createdAt, true)}
          </Typography>
        </div>
      </div>

      <div className='bg-grey pt-3 pb-2 px-3'>
        <b>About</b>
        <Row gutter={[20, 20]} className='mt-2'>
          <Col xs={12} md={8} lg={6}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Investor Since
            </Typography>{' '}
            <Typography variant='body9'>{'NA'}</Typography>
          </Col>
          <Col xs={12} md={8} lg={6}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Syndicates
            </Typography>{' '}
            <Typography variant='body9'>{'NA'}</Typography>
          </Col>
          <Col xs={12} md={8} lg={6}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Last Investment
            </Typography>{' '}
            <Typography variant='body9'>{'NA'}</Typography>
          </Col>
        </Row>
        <Row className='mtop-3' gutter={[20, 20]}>
          <Col xs={12} md={8} lg={6}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Address
            </Typography>{' '}
            <Typography variant='body9'>{'NA'}</Typography>
          </Col>
          <Col xs={12} md={8} lg={6}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Phone Number
            </Typography>{' '}
            <Typography variant='body9'>{'NA'}</Typography>
          </Col>
          <Col xs={12} md={8} lg={6}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              DOB
            </Typography>{' '}
            <Typography variant='body9'>{'NA'}</Typography>
          </Col>
          <Col xs={12} md={8} lg={6}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Email
            </Typography>{' '}
            <Typography variant='body9' className='break-text'>
              {email}
            </Typography>
          </Col>
        </Row>
      </div>
      <div className='mt-2'>
        <Typography variant='body7'>Accreditation</Typography>
        <Row gutter={[20, 20]}>
          <Col xs={12} lg={12}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Investor‘s Acrreditation
            </Typography>
            <Typography variant='body9'>{'N/A'}</Typography>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Verification
            </Typography>
            <Typography variant='body9'>{'N/A'}</Typography>
            {/* <div className='ml-1 mt-1 d-flex align-items-center'>
              <Image
                src={assets.FileIcon.src}
                alt={assets.FileIcon.alt}
                height={18}
                width={18}
              />
              <Typography className='mb-0 ml-2' variant='body9' state='tetiary'>
                Evidence document.pdf
              </Typography>
            </div> */}
          </Col>
        </Row>
      </div>

      {/* <div className='mt-2'>
        <Typography variant='body7'>Uploaded KYC</Typography>
        <Row gutter={[20, 20]}>
          <Col xs={12} lg={12}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Proof of ID
            </Typography>
            <div className='ml-1 mt-1 d-flex align-items-center'>
              <Image
                src={assets.FileIcon.src}
                alt={assets.FileIcon.alt}
                height={18}
                width={18}
              />
              <Typography className='mb-0 ml-2' variant='body9' state='tetiary'>
                proof.pdf
              </Typography>
            </div>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Proof of address
            </Typography>
            <div className='ml-1 mt-1 d-flex align-items-center'>
              <Image
                src={assets.FileIcon.src}
                alt={assets.FileIcon.alt}
                height={18}
                width={18}
              />
              <Typography className='mb-0 ml-2' variant='body9' state='tetiary'>
                Addresss Doc.pdf
              </Typography>
            </div>
          </Col>
        </Row>
      </div> */}
      {/* <Row className='mt-2' gutter={[20, 20]}>
        <Col xs={24} lg={12}>
          <Typography variant='body7'>
            Investing Activity{' '}
            <Typography component='span' variant='body9'>
              - Last 12 Months
            </Typography>
          </Typography>
          <Typography component='p' variant='body7'>
            Total Invested{' '}
            <Typography component='span' variant='body9'>
              : {'0'}
            </Typography>
          </Typography>
          <Typography component='p' variant='body7'>
            Investments{' '}
            <Typography component='span' variant='body9'>
              : {'0'}
            </Typography>
          </Typography>
          <Typography component='p' variant='body7'>
            Invested / Invited{' '}
            <Typography component='span' variant='body9'>
              : {'0'}
            </Typography>
          </Typography>
        </Col>
      </Row> */}
    </div>
  );
};
