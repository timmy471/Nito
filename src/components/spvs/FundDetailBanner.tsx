import { Row, Col } from 'antd';
import { INewSPVData } from 'types';
import { formatDate } from '@src/helpers';
import { determineFundStatus, determineStage } from '@src/helpers/utils';
import { capitalizeFirstLetter, formatNumber } from '@src/helpers';
interface IProps {
  fund: INewSPVData;
}

export const FundDetailBanner: React.FC<IProps> = ({ fund }) => {
  const { status, basicInfo, lifeCycle, opportunity, investmentTerms } = fund || {};

  const hasRound =
    (fund?.investmentTerms as any)[fund?.investmentTerms?.investmentType] &&
    (fund?.investmentTerms as any)[fund?.investmentTerms?.investmentType]['round'];

  const spvTotalRoundSize = (investmentTerms as any)[investmentTerms.investmentType]
    ?.totalRoundSize;

  return (
    <div className='fund-info'>
      <Row>
        <div className='logo-box'>
          <img src={fund?.asset?.logo} alt='' />
        </div>
        <Col xs={24} sm={24} md={20} lg={20} xl={9} className='mr-2'>
          <div className='d-flex  justify-content-between'>
            <h1>{basicInfo?.name} Fund</h1>
            <div className='status'>{determineFundStatus(status || '')}</div>
          </div>

          <Row>
            {hasRound && (
              <Col xs={12} sm={12} md={12} lg={8} xl={8} className='mb-1'>
                Stage
                <span className='series'>
                  {determineStage(
                    (fund?.investmentTerms as any)[fund?.investmentTerms.investmentType][
                      'round'
                    ]
                  )}
                </span>
              </Col>
            )}

            <Col xs={12} sm={12} md={12} lg={8} xl={8} className='mb-1'>
              Syndicate
              <b className='d-block'>{fund?.asset?.name}</b>
            </Col>
            <Col xs={12} sm={12} md={12} lg={8} xl={8} className='mb-1'>
              Fund Manager
              <b className='d-block'>{`${capitalizeFirstLetter(
                fund?.user?.firstName
              )} ${capitalizeFirstLetter(fund?.user?.lastName)}`}</b>
            </Col>
          </Row>
        </Col>
        <Col xs={11} sm={11} md={6} lg={6} xl={4} className='card'>
          <h6>Total Round Size</h6>
          <h2>${formatNumber(spvTotalRoundSize || '0')}</h2>
        </Col>
        <Col xs={11} sm={11} md={6} lg={6} xl={4} className='card'>
          <h6>Allocation</h6>
          <h2>${formatNumber(opportunity.allocation || '0')}</h2>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={4} className='card'>
          <h6>Closing Date</h6>
          <h2>{lifeCycle.closingDate ? formatDate(lifeCycle.closingDate) : 'NA'}</h2>
        </Col>
      </Row>
    </div>
  );
};
