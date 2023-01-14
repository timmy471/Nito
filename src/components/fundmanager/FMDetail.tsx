import Image from 'next/image';
import { Row, Col } from 'antd';
import { assets } from '@src/assets';
import { useEffect } from 'react';
import { ISelectedFundmanagerData } from 'types';
import { kycStatuses } from '@src/helpers/constants';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/redux/store';
import { formatDate, capitalizeFirstLetter } from '@src/helpers';
import { Typography, Pill, Button, LoadingSpinner } from '@src/components';
import { ApproveFundManager } from '@src/redux/actions/fundManagerActions';
import { hasPermission } from '@src/redux/actions/authActions';
import permissions from '@src/helpers/constants/permissions';

interface IProps {
  currentFundManager?: ISelectedFundmanagerData | null;
}

export const FMDetail: React.FC<IProps> = () => {
  const { selectedFundManager } = useSelector((state: RootState) => state.fundmanager);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {}, [selectedFundManager]);

  const { loading, data, approvingFundManager } = selectedFundManager;
  const { firstName, lastName, FundManagerKYC, createdAt, email, avatar, id }: any = data;

  const kycStatus = FundManagerKYC?.status ? FundManagerKYC?.status : kycStatuses.registered;

  if (loading) return <LoadingSpinner />;

  return (
    <div className='p-4 pb-4 detail-container'>
      <div className='mb-2 d-flex detail'>
        <img
          src={avatar || assets.UserAvatarIcon.src}
          alt={'Avatar'}
          width={80}
          className='border-radius-50'
          height={80}
        />
        <div className='d-flex flex-column ml-2 mt-1'>
          <div className='d-flex'>
            <Typography variant='body3'>
              {firstName} {lastName}
            </Typography>

            <Pill
              label={capitalizeFirstLetter(kycStatus)}
              className={`fm-status-pill fm-status-pill__${kycStatus.toLowerCase()} ml-3`}
            />
          </div>
          <Typography className='mb-0 date-created' state='secondary' variant='body10'>
            Joined {formatDate(createdAt, true)}
          </Typography>
        </div>
      </div>

      <div className='pt-3 pb-2 px-3'>
        <b>About</b>
        <Row gutter={[20, 20]} className='mt-2'>
          <Col xs={12} md={8} lg={8}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Address
            </Typography>{' '}
            <Typography variant='body9'>{FundManagerKYC?.VCAddress || 'N/A'}</Typography>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Nationality
            </Typography>{' '}
            <Typography variant='body9'>{FundManagerKYC?.nationality || 'N/A'}</Typography>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Email
            </Typography>{' '}
            <Typography variant='body9' className='break-text'>
              {email || 'N/A'}
            </Typography>
          </Col>
        </Row>
      </div>

      <div className='pt-3 pb-2 px-3'>
        <b>About Firm</b>
        <Row gutter={[20, 20]} className='mt-2'>
          <Col xs={12} md={8} lg={8}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Registered as?
            </Typography>{' '}
            <Typography variant='body9'>{'Fund Manager' || 'NA'}</Typography>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Investor Type
            </Typography>{' '}
            <Typography variant='body9'>
              {FundManagerKYC?.investorType === 'VENTURE_CAPITAL' && 'Venture Capital'}
              {FundManagerKYC?.investorType === 'INDIVIDUAL' && 'Individual'}
              {!FundManagerKYC?.investorType && 'N/A'}
            </Typography>
          </Col>
        </Row>
      </div>

      <div className='pt-3 pb-2 px-3'>
        <b>About Investment</b>
        <Row gutter={[20, 20]} className='mt-2'>
          <Col xs={12} md={8} lg={8}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Avg No of SPVs
            </Typography>{' '}
            <Typography variant='body9'>
              {FundManagerKYC?.averageSPVsPerQuarter || 'N/A'}
            </Typography>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Existing Network
            </Typography>{' '}
            <Typography variant='body9' className='text-capitalize'>
              {FundManagerKYC?.hasExistingLPNetwork === true
                ? 'Yes'
                : FundManagerKYC?.hasExistingLPNetwork === false
                ? 'NO'
                : 'NA'}
            </Typography>
          </Col>
        </Row>
      </div>

      <div className='pt-3 pb-2 px-3'>
        <b>Supporting Document</b>
        <Row gutter={[20, 20]} className='mt-2'>
          <Col xs={12} md={8} lg={8}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Proof of ID
            </Typography>{' '}
            {FundManagerKYC?.proofOfIdDocumentUrl ? (
              <a
                href={FundManagerKYC?.proofOfIdDocumentUrl}
                target={'_blank'}
                rel='noreferrer'>
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
              </a>
            ) : (
              <Typography variant='body9' className='text-capitalize'>
                {'N/A'}
              </Typography>
            )}
          </Col>
        </Row>
      </div>
      <div className='mt-4 d-flex justify-content-between action-ctas'>
        {FundManagerKYC?.status === kycStatuses.submitted &&
          hasPermission(permissions.approveFundManager) && (
            <Button
              label='Approve'
              loading={approvingFundManager}
              onClick={() => dispatch(ApproveFundManager(id))}
            />
          )}
      </div>
    </div>
  );
};
