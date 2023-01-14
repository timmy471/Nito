import { Row, Col } from 'antd';
import { useEffect } from 'react';
import { assets } from '@src/assets';
import { Typography } from '@src/components';
import { IAssetDetailProps, INewAssetFounder } from 'types';
import { capitalizeFirstLetter, formatDate } from '@src/helpers';

export const AssetDetail: React.FC<IAssetDetailProps> = ({
  asset,
  getAssetIndustry,
  handleOpenModal,
}) => {
  useEffect(() => {}, [asset]); //To reflect current status after update

  if (!asset) return null;

  const { logo, name, industry, founded, address, website, about, founders } = asset;

  return (
    <div className='px-4 pb-4 asset-detail-container'>
      <div className='mb-2 d-flex asset-detail mt-1'>
        <img src={logo} alt={name} width={80} height={80} />
        <div className='d-flex flex-column ml-2 mt-1'>
          <div className='d-flex'>
            <Typography variant='body3'>{name}</Typography>
            {/* <Pill
              label={capitalizeFirstLetter(status)}
              className={`asset-status-pill asset-status-pill__detail asset-status-pill__${status.toLocaleLowerCase()}`}
            /> */}
          </div>
          <Typography className='mb-0 date-created' state='secondary' variant='body10'>
            Founded {founded}
          </Typography>
        </div>
      </div>

      <Typography variant='body7' className='mbottom-2'>
        {' '}
        Profile
      </Typography>
      <div className='bg-grey pt-3 pb-2 px-3'>
        <Row gutter={[20, 20]}>
          <Col xs={12} md={8} lg={6}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Industry
            </Typography>{' '}
            <Typography variant='body9'>{getAssetIndustry(industry) || 'NA'}</Typography>
          </Col>
        </Row>
        <Row className='mtop-3' gutter={[20, 20]}>
          <Col xs={12} md={8} lg={6}>
            <Typography state='secondary' variant='body9' className='mbottom-3'>
              Founded
            </Typography>{' '}
            <Typography variant='body9'>{formatDate(founded, true) || 'NA'}</Typography>
          </Col>
          <Col xs={12} md={8} lg={6}>
            <Typography state='secondary' variant='body9' className='mbottom-3 word-break-all'>
              Website
            </Typography>{' '}
            <Typography variant='body9'>{website || 'NA'}</Typography>
          </Col>
          <Col xs={12} md={8} lg={6}>
            <Typography state='secondary' variant='body9' className='mbottom-3 word-break-all'>
              Address
            </Typography>{' '}
            <Typography variant='body9'>{address || 'NA'}</Typography>
          </Col>
        </Row>
        <div className='mtop-4'>
          <Typography state='secondary' variant='body9' className='mbottom-2'>
            About Company
          </Typography>
          <Typography variant='body8' className='about'>
            {about || 'NA'}
          </Typography>
        </div>
      </div>
      <div className='mt-2'>
        <Typography variant='body7'>Founders</Typography>
        <div className='d-flex mt-1 ml-2'>
          {founders?.length
            ? founders?.map(({ name, jobTitle, imageUrl }: INewAssetFounder, key: number) => (
                <div className='founder' key={key}>
                  <img
                    src={imageUrl}
                    alt={name}
                    height={90}
                    width={90}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = assets.UserAvatarIcon.src;
                    }}
                  />
                  <div className='text-center'>
                    <Typography variant='body7' className='mtop-2 mbottom-2'>
                      {capitalizeFirstLetter(name)}
                    </Typography>
                    <Typography variant='body10' state='secondary'>
                      {capitalizeFirstLetter(jobTitle)}
                    </Typography>
                  </div>
                </div>
              ))
            : 'NA'}
        </div>
      </div>
      <div className='mt-4 d-flex justify-content-between action-ctas'>
        {/* <div className='d-flex'>
          <Button label='Edit' variant='secondary' className='mr-4' />
          {status === 'published' || status === 'draft' ? (
            <Button
              label={status === 'published' ? 'Unpublish' : 'Publish'}
              onClick={handleOpenModal}
            />
          ) : (
            ''
          )}
        </div> */}
      </div>
    </div>
  );
};
