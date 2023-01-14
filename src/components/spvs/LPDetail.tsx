import Image from 'next/image';
import { Row, Col } from 'antd';
import { assets } from '@src/assets';
import { determineInvestmentStatus } from '@src/helpers/utils';
import { investmentStatuses } from '@src/helpers/constants';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { Typography, Pill, Button, LoadingSpinner } from '@src/components';
import { ApproveInvestment, ConfirmInvestmentWire } from '@src/redux/actions/spvsActions';
import {
  capitalizeFirstLetter,
  formatCamelCaseWord,
  formatCurrency,
  formatDate,
} from '@src/helpers';

interface IProps {
  handleDetailClose: () => void;
}
export const LPDetail: React.FC<IProps> = ({ handleDetailClose }) => {
  const {
    currentInvestmentData: { loading, currentInvestment },
  } = useAppSelector((state) => state.spvs);

  const { amount, status, investmentEntity, createdAt, user } = currentInvestment || {};

  const {
    cityOfResidence,
    countryOfResidence,
    zipCodeOfResidence,
    addressOfResidence,
    firstName,
    lastName,
    cityOfBirth,
    countryOfBirth,
    dateOfBirth,
    phoneNumber,
    sourceOfWealth,
    proofOfSourceOfWealthUrl,
    proofOfAddressUrl,
    proofOfIdUrl,
    taxResidencyAgreementNonUSA,
    taxResidencyAgreementNotApplicable,
    taxResidencyAgreementUnavailabilityReason,
    taxResidencyProofOfCitizenshipRenouncementUrl,
    taxResidencyUSATIN,
    hasAcceptedClosingTerms,
  } = investmentEntity || {};

  const dispatch = useAppDispatch();

  return (
    <div className='px-4 pb-4 lp-detail-container'>
      {loading ? (
        <LoadingSpinner />
      ) : (
        currentInvestment !== null && (
          <>
            <div className='mb-2 d-flex lp-detail pt-2'>
              <img
                src={user.avatar || assets.UserAvatarIcon.src}
                alt={'Avatar'}
                width='80'
                height='80'
                className='border-radius-50'
              />
              <div className='d-flex flex-column ml-2 mt-1'>
                <div className='d-flex'>
                  <Typography variant='body3'>{`${capitalizeFirstLetter(
                    firstName
                  )} ${capitalizeFirstLetter(lastName)}`}</Typography>{' '}
                  &nbsp; &nbsp;
                  <div>{determineInvestmentStatus(status)}</div>
                </div>
                <Typography className='mb-0 date-created' state='secondary' variant='body10'>
                  Created {formatDate(createdAt, true)}
                </Typography>
              </div>
            </div>
            <Typography variant='body7' className='mbottom-2'>
              {' '}
              Review Application
            </Typography>
            <div className='mb-2 mt-2 bg-grey pt-3 pb-2 px-3'>
              <b>About </b>
              <Row gutter={[20, 20]} className='mt-1'>
                <Col xs={12} md={8} lg={6}>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    Country Of Birth
                  </Typography>{' '}
                  <Typography variant='body9'>{countryOfBirth || 'NA'}</Typography>
                </Col>
                <Col xs={12} md={8} lg={6}>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    City O fBirth
                  </Typography>{' '}
                  <Typography variant='body9'>{cityOfBirth || 'NA'}</Typography>
                </Col>
                <Col xs={12} md={8} lg={6}>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    Date Of Birth
                  </Typography>{' '}
                  <Typography variant='body9'>
                    {dateOfBirth ? formatDate(dateOfBirth, true) : 'NA'}
                  </Typography>
                </Col>
                <Col xs={12} md={8} lg={6}>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    Phone Number
                  </Typography>{' '}
                  <Typography variant='body9'>{phoneNumber}</Typography>
                </Col>
              </Row>
              <Row gutter={[20, 20]} className='mt-1'>
                <Col xs={12} md={8} lg={6}>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    Country Of Residence
                  </Typography>{' '}
                  <Typography variant='body9'>{countryOfResidence || 'NA'}</Typography>
                </Col>
                <Col xs={12} md={8} lg={6}>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    City Of Residence
                  </Typography>{' '}
                  <Typography variant='body9'>{cityOfResidence || 'NA'}</Typography>
                </Col>
                <Col xs={12} md={8} lg={6}>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    Address Of Residence
                  </Typography>{' '}
                  <Typography variant='body9'>{addressOfResidence || 'NA'}</Typography>
                </Col>
                <Col xs={12} md={8} lg={6}>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    Zip Code of Residence
                  </Typography>{' '}
                  <Typography variant='body9'>{zipCodeOfResidence}</Typography>
                </Col>

                <Col xs={12} md={8} lg={6}>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    Source Of Wealth
                  </Typography>{' '}
                  <Typography variant='body9'>{sourceOfWealth}</Typography>
                </Col>
              </Row>
            </div>

            <div className=''>
              <b>About Commitment</b>
              <Row gutter={[20, 20]} className='mt-1'>
                <Col xs={12} md={8} lg={6}>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    Amount
                  </Typography>{' '}
                  <Typography variant='body9'>
                    {amount ? formatCurrency(amount) : 'NA'}
                  </Typography>
                </Col>
                <Col xs={12} md={8} lg={6}>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    Date
                  </Typography>{' '}
                  <Typography variant='body9'>
                    {formatDate(createdAt, true) || 'NA'}
                  </Typography>
                </Col>
                <Col xs={12} md={8} lg={6}>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    Status
                  </Typography>{' '}
                  <Typography variant='body9'>{formatCamelCaseWord(status)}</Typography>
                </Col>
                <Col xs={12} md={8} lg={6}>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    Accepted Terms
                  </Typography>{' '}
                  <Typography variant='body9'>
                    {hasAcceptedClosingTerms ? 'Yes' : 'No'}
                  </Typography>
                </Col>
              </Row>

              <div className='mb-2 mt-2'>
                <b>Tax Information </b>
                <Row gutter={[20, 20]} className='mt-1'>
                  <Col xs={12} md={8} lg={6}>
                    <Typography state='secondary' variant='body9' className='mbottom-3'>
                      TIN
                    </Typography>{' '}
                    <Typography variant='body9'>{taxResidencyUSATIN || 'NA'}</Typography>
                  </Col>
                  <Col xs={12} md={8} lg={6}>
                    <Typography state='secondary' variant='body9' className='mbottom-3'>
                      Tax Residency Agreement
                    </Typography>{' '}
                    <Typography variant='body9'>
                      {taxResidencyAgreementNotApplicable ? 'Yes' : 'No'}
                    </Typography>
                  </Col>
                  <Col xs={12} lg={8}>
                    <Typography state='secondary' variant='body9' className='mbottom-3'>
                      Proof of Renouncement
                    </Typography>
                    {taxResidencyProofOfCitizenshipRenouncementUrl ? (
                      <a
                        href={taxResidencyProofOfCitizenshipRenouncementUrl}
                        target='__blank'
                        rel='noopener'>
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
                      <Typography variant='body9'>NA</Typography>
                    )}
                  </Col>
                </Row>
                <div className='mt-1'>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    Tax Residency Aggrement Unavailability Reason
                  </Typography>{' '}
                  <Typography variant='body9'>
                    {taxResidencyAgreementUnavailabilityReason || 'NA'}
                  </Typography>
                </div>
                <div className='mt-1'>
                  <Typography state='secondary' variant='body9' className='mbottom-3'>
                    Non-US Tax Residency Aggrement Detail
                  </Typography>
                  {taxResidencyAgreementNonUSA?.length ? (
                    <div>
                      {taxResidencyAgreementNonUSA.map((info: any, key: number) => (
                        <Row className='mb-1' key={key}>
                          <Col xs={12} lg={8}>
                            <Typography
                              state='secondary'
                              variant='body9'
                              className='mbottom-3'>
                              Country
                            </Typography>
                            <Typography variant='body9'>{info.country}</Typography>
                          </Col>
                          <Col xs={12} lg={8}>
                            <Typography
                              state='secondary'
                              variant='body9'
                              className='mbottom-3'>
                              Tax Reference Number Type
                            </Typography>
                            <Typography variant='body9'>
                              {info.taxReferenceNumberType}
                            </Typography>
                          </Col>
                          <Col xs={12} lg={8}>
                            <Typography
                              state='secondary'
                              variant='body9'
                              className='mbottom-3'>
                              Tax Reference Number
                            </Typography>
                            <Typography variant='body9'>{info.taxReferenceNumber}</Typography>
                          </Col>
                        </Row>
                      ))}
                    </div>
                  ) : (
                    <Typography variant='body9'>NA</Typography>
                  )}
                </div>
              </div>

              <div className='mt-2'>
                <Typography variant='body7'>Uploaded Documents</Typography>
                <Row gutter={[20, 20]}>
                  <Col xs={12} lg={8}>
                    <Typography state='secondary' variant='body9' className='mbottom-3'>
                      Proof of ID
                    </Typography>
                    {proofOfIdUrl ? (
                      <a href={proofOfIdUrl} target='__blank' rel='noopener'>
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
                      'NA'
                    )}
                  </Col>
                  <Col xs={12} md={8} lg={8}>
                    <Typography state='secondary' variant='body9' className='mbottom-3'>
                      Proof of Source of wealth
                    </Typography>
                    {proofOfSourceOfWealthUrl ? (
                      <a href={proofOfSourceOfWealthUrl} target='__blank' rel='noopener'>
                        <div className='ml-1 mt-1 d-flex align-items-center'>
                          <Image
                            src={assets.FileIcon.src}
                            alt={assets.FileIcon.alt}
                            height={18}
                            width={18}
                          />
                          <Typography className='mb-0 ml-2' variant='body9' state='tetiary'>
                            Source Of Wealth Doc.pdf
                          </Typography>
                        </div>
                      </a>
                    ) : (
                      'NA'
                    )}
                  </Col>
                  <Col xs={12} md={8} lg={8}>
                    <Typography state='secondary' variant='body9' className='mbottom-3'>
                      Proof of Address
                    </Typography>
                    {proofOfAddressUrl ? (
                      <a href={proofOfAddressUrl} target='__blank' rel='noopener'>
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
                      </a>
                    ) : (
                      'NA'
                    )}
                  </Col>
                </Row>
              </div>
              <div className='d-flex justify-content-end mt-4'>
                {status === investmentStatuses.committed && (
                  <Button
                    label='Approve KYC + Commitment'
                    style={{ width: '15rem' }}
                    onClick={() => dispatch(ApproveInvestment({ cb: handleDetailClose }))}
                  />
                )}

                {status === investmentStatuses.paymentPending && (
                  <Button
                    label='Confirm Wire'
                    onClick={() => dispatch(ConfirmInvestmentWire({ cb: handleDetailClose }))}
                  />
                )}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};
