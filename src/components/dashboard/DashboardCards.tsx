import { Row, Col } from 'antd';
import { assets } from '@src/assets';
import { IDashboardStats } from 'types';
import { Typography, FaCarousel } from '@src/components';
import { formatCurrency, formatNumber } from '@src/helpers';

export const DashboardCards: React.FC<IDashboardStats> = (props) => {
  const { spvCurrentBg, totalSPVBg, totalFeesBg, totalLpBg } = assets;

  const { currentlyRaisingSPVs, totalLPs, totalRaised, totalSPVs } = props;

  const cardsDetail = [
    {
      title: 'TotalSPV',
      value: formatNumber(totalSPVs),
      bg: totalSPVBg,
    },
    {
      title: 'SPV Currently Raising',
      value: formatNumber(currentlyRaisingSPVs),
      bg: spvCurrentBg,
    },
    {
      title: 'Total LPs',
      value: formatNumber(totalLPs),
      bg: totalLpBg,
    },
    {
      title: 'Total Fees Made',
      value: formatCurrency(totalRaised) || 0,
      bg: totalFeesBg,
      inverted: true,
    },
  ];

  return (
    <>
      <Row gutter={[30, 30]} className='mtop-4 dashboard-cards desktop-cards'>
        {cardsDetail.map(({ title, value, bg, inverted }, key) => (
          <Col
            xl={6}
            className={`card-main ${inverted ? 'card-main__inverted' : ''}`}
            key={key}
            style={{ backgroundImage: `url(${bg.src})` }}>
            <Typography variant='body7'>{title}</Typography>
            <Typography component='h3'>{value}</Typography>
          </Col>
        ))}
      </Row>
      <div className='mtop-4 dashboard-cards mobile-cards'>
        <FaCarousel>
          {cardsDetail.map(({ title, value, bg, inverted }, key) => (
            <div
              className={`card-main ${inverted ? 'card-main__inverted' : ''}`}
              key={key}
              style={{ backgroundImage: `url(${bg.src})` }}>
              <Typography variant='body7'>{title}</Typography>
              <Typography component='h3'>{value}</Typography>
            </div>
          ))}
        </FaCarousel>
      </div>
    </>
  );
};
