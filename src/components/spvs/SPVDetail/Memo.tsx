import { Row, Col } from 'antd';
import { PDFViewer } from '@src/components';
import { formatCurrency } from '@src/helpers';
import { NewSPVCommitment, NewSPVDealOverview, NewSPVLifeCycle, NewSPVWaterfall } from 'types';

interface IProps {
  dealOverview: NewSPVDealOverview;
  waterfall: NewSPVWaterfall;
  lifeCycle: NewSPVLifeCycle;
  commitment: NewSPVCommitment;
}

export const Memo: React.FC<IProps> = ({ dealOverview, waterfall, lifeCycle, commitment }) => {
  return (
    <Row gutter={[20, 20]}>
      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
        <div className='fund-form slide-in-bottom'>
          <div dangerouslySetInnerHTML={{ __html: dealOverview?.memo }} />
          {dealOverview?.pitchDeck && <PDFViewer fileUrl={dealOverview?.pitchDeck} />}
        </div>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
        <div className='fund-form'>
          <h5>INVESTMENT TERMS</h5>
          <div className='mb-1'>
            <span>Carried Interest</span>
            <b>{waterfall?.carriedInterest ? waterfall?.carriedInterest : 'NA'}</b>
          </div>
          <div className='mb-1'>
            <span>Length of Holding Period</span>
            <b>{lifeCycle?.lengthOfHoldingPeriod ? lifeCycle?.lengthOfHoldingPeriod : 'NA'}</b>
          </div>
          <div>
            <span>Minimum Investment (USD)</span>
            <b>
              {commitment?.minimumInvestment
                ? formatCurrency(commitment?.minimumInvestment)
                : 'NA'}
            </b>
          </div>
        </div>
      </Col>
    </Row>
  );
};
