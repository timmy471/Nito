import { Row, Col } from 'antd';
import { Typography } from '@src/components';
import { NewSPVOpportunity, NewSPVInvestmentTerms } from 'types';
import { formatCamelCaseWord, formatCurrency } from '@src/helpers';

export const Opportunity = ({
  investmentTerms,
  opportunity,
}: {
  investmentTerms: NewSPVInvestmentTerms;
  opportunity: NewSPVOpportunity;
}) => {
  const equityRoundData = [
    {
      label: 'Investment Type',
      value: investmentTerms?.investmentType
        ? formatCamelCaseWord(investmentTerms?.investmentType)
        : 'NA',
    },
    {
      label: 'Share Class',
      value: investmentTerms?.investmentType
        ? formatCamelCaseWord(
            (investmentTerms as any)[investmentTerms.investmentType]?.shareClass
          )
        : 'NA',
    },
    {
      label: 'Allocation',
      value: opportunity?.allocation ? formatCurrency(opportunity?.allocation) : 'NA',
    },
    {
      label: 'Round',
      value: investmentTerms?.investmentType
        ? formatCamelCaseWord((investmentTerms as any)[investmentTerms.investmentType]?.round)
        : 'NA',
    },
    {
      label: 'Total Round Size',
      value: investmentTerms?.investmentType
        ? formatCurrency(
            (investmentTerms as any)[investmentTerms.investmentType]?.totalRoundSize
          )
        : 'NA',
    },
    {
      label: 'Pre-money Valuation',
      value: investmentTerms?.investmentType
        ? formatCurrency(
            (investmentTerms as any)[investmentTerms.investmentType]?.preMoneyValuation
          )
        : 'NA',
    },
    {
      label: 'Currency',
      value: opportunity?.currency?.toUpperCase(),
    },
  ];

  const opportunityData = () => {
    switch (investmentTerms?.investmentType) {
      case 'equityRound':
        return equityRoundData;

      case 'convertibleNote':
        return '';

      case 'safe':
        return '';

      case 'secondary':
        return '';

      default:
        return equityRoundData;
    }
  };

  return (
    <Row gutter={[20, 40]} className='detail-container'>
      <Col xs={24} lg={18} xl={12}>
        <Row>
          {investmentTerms?.investmentType && (
            <Col xs={12} lg={8} xl={6} className='mb-1'>
              <Typography variant='body9' state='secondary'>
                Investment Type
              </Typography>
              <Typography variant='body7' className='detail-value'>
                {formatCamelCaseWord(investmentTerms?.investmentType)}
              </Typography>
            </Col>
          )}

          {(investmentTerms as any)[investmentTerms.investmentType]?.shareClass && (
            <Col xs={12} lg={8} xl={6} className='mb-1'>
              <Typography variant='body9' state='secondary'>
                Share Class
              </Typography>
              <Typography variant='body7' className='detail-value'>
                {formatCamelCaseWord(
                  (investmentTerms as any)[investmentTerms.investmentType]?.shareClass
                )}
              </Typography>
            </Col>
          )}
          {opportunity?.allocation && (
            <Col xs={12} lg={8} xl={6} className='mb-1'>
              <Typography variant='body9' state='secondary'>
                Allocation
              </Typography>
              <Typography variant='body7' className='detail-value'>
                {formatCurrency(opportunity?.allocation)}
              </Typography>
            </Col>
          )}

          {(investmentTerms as any)[investmentTerms.investmentType]?.round && (
            <Col xs={12} lg={8} xl={6} className='mb-1'>
              <Typography variant='body9' state='secondary'>
                Round
              </Typography>
              <Typography variant='body7' className='detail-value'>
                {formatCamelCaseWord(
                  (investmentTerms as any)[investmentTerms.investmentType]?.round
                )}
              </Typography>
            </Col>
          )}

          {(investmentTerms as any)[investmentTerms.investmentType]?.totalRoundSize && (
            <Col xs={12} lg={8} xl={6} className='mb-1'>
              <Typography variant='body9' state='secondary'>
                Total Round Size
              </Typography>
              <Typography variant='body7' className='detail-value'>
                {formatCurrency(
                  (investmentTerms as any)[investmentTerms.investmentType]?.totalRoundSize
                )}
              </Typography>
            </Col>
          )}

          {(investmentTerms as any)[investmentTerms.investmentType]?.preMoneyValuation && (
            <Col xs={12} lg={8} xl={6} className='mb-1'>
              <Typography variant='body9' state='secondary'>
                Pre-money Valuation
              </Typography>
              <Typography variant='body7' className='detail-value'>
                {formatCurrency(
                  (investmentTerms as any)[investmentTerms.investmentType]?.preMoneyValuation
                )}
              </Typography>
            </Col>
          )}

          {opportunity?.currency && (
            <Col xs={12} lg={8} xl={6} className='mb-1'>
              <Typography variant='body9' state='secondary'>
                Currency
              </Typography>
              <Typography variant='body7' className='detail-value'>
                {opportunity?.currency?.toUpperCase()}
              </Typography>
            </Col>
          )}

          {/* {opportunityData()?.map((info, key: number) => (
            <Col xs={12} lg={8} xl={6} className='mb-1'>
              <Typography variant='body9' state='secondary'>
                {info.label}
              </Typography>
              <Typography variant='body7' className='detail-value'>
                {info.value}
              </Typography>
            </Col>
          ))} */}
        </Row>
      </Col>
    </Row>
  );
};
