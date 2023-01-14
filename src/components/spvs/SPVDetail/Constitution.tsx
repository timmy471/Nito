import { Row, Col } from 'antd';
import { Typography } from '@src/components';
import {
  NewSPVWaterfall,
  NewSPVFeesAndExpenses,
  NewSPVLifeCycle,
  NewSPVCommitment,
  NewSPVStakeholders,
  NewSPVReporting,
} from 'types';
import {
  SPVWaterfallFormOptions,
  SPVFeesAndExpensesFormOptions,
  SPVCommitmentFormOptions,
  SPVStakeholdersFormOptions,
  SPVReportingFormOptions,
} from '@src/helpers/constants';
import { capitalizeFirstLetter, formatCurrency, formatDate } from '@src/helpers';

interface IProps {
  waterfall: NewSPVWaterfall;
  feesAndExpenses: NewSPVFeesAndExpenses;
  lifeCycle: NewSPVLifeCycle;
  commitment: NewSPVCommitment;
  stakeholders: NewSPVStakeholders;
  reporting: NewSPVReporting;
}

export const Constitution: React.FC<IProps> = ({
  waterfall,
  feesAndExpenses,
  lifeCycle,
  commitment,
  stakeholders,
  reporting,
}) => {
  const { returnOfCommitment, preferredReturn, carriedInterest, carriedInterestRecipient } =
    waterfall || {};

  const { spvManagementFee, handleGpFees, spvOperatingExpenses, setupCosts } =
    feesAndExpenses || {};

  const {
    closingDate,
    timelineForInvestorSendingMoney,
    lengthOfExitPeriod,
    lengthOfHoldingPeriod,
  } = lifeCycle || {};

  const {
    minimumInvestment,
    chargeSubscriptionFee,
    // subscriptionFee,
    allowTransferOfInterests,
  } = commitment || {};

  const {
    appointInvestmentAdviser,
    appointInvestmentManager,
    investmentManagerDetails,
    auditSpv,
    keyPersonProvision,
  } = stakeholders || {};

  const { getTargetCompanyReports, targetCompanyReportFrequency } = reporting;

  // const getValue = (arrayToSearch: any, itemToFind?: string | boolean) => {
  //     if (itemToFind) return 'NA';
  //     return arrayToSearch.find(({ value }: { value: string }) => value === itemToFind)?.label;
  //   };

  const waterfallData = [
    {
      label: 'Return of Commitment',
      value:
        returnOfCommitment === true || returnOfCommitment === false
          ? SPVWaterfallFormOptions.returnOfCommitment.find(
              (option) => option.value === returnOfCommitment
            )?.label
          : 'NA',
    },
    {
      label: 'Preferred Return',
      value: preferredReturn
        ? SPVWaterfallFormOptions.preferredReturn.find(
            (option) => option.value === preferredReturn
          )?.label
        : 'NA',
    },
    {
      label: 'Carried Interest',
      value: carriedInterest ? carriedInterest : 'NA',
      subtitle: '% for the Sponsor',
    },
    {
      label: 'To whom should the carried interest be paid?',
      value: carriedInterestRecipient
        ? SPVWaterfallFormOptions.carriedInterestRecipient.find(
            (option) => option.value === carriedInterestRecipient
          )?.label
        : 'NA',
    },
  ];

  const feesData = [
    {
      label: 'Do you want to charge the SPV a Management Fee?',
      value: spvManagementFee
        ? SPVFeesAndExpensesFormOptions.spvManagementFee.find(
            (option) => option.value === spvManagementFee
          )?.label
        : 'NA',
    },
    {
      label:
        "How would you like to handle the fees paid to the GP related to the SPV's Portfolio Investment?",
      value: handleGpFees
        ? SPVFeesAndExpensesFormOptions.handleGpFees.find(
            (option) => option.value === handleGpFees
          )?.label
        : 'NA',
    },
    {
      label: 'Will there be any operating expenses at the SPV level?',
      value: spvOperatingExpenses
        ? SPVFeesAndExpensesFormOptions.spvOperatingExpenses.find(
            (option) => option.value === spvOperatingExpenses
          )?.label
        : 'NA',
    },
    {
      label: 'Setup Costs',
      value: setupCosts
        ? SPVFeesAndExpensesFormOptions.setupCosts.find(
            (option) => option.value === setupCosts
          )?.label
        : 'NA',
    },
  ];

  const lifeCycleData = [
    {
      label: 'Closing Date',
      value: closingDate ? formatDate(closingDate, true) : 'NA',
    },
    {
      label: 'How long will investors have to send the money',
      value: timelineForInvestorSendingMoney ? timelineForInvestorSendingMoney : 'NA',
      subtitle: 'working days after they receive payment instructions',
    },
    {
      label: 'Length of Holding Period',
      value: lengthOfHoldingPeriod ? lengthOfHoldingPeriod : 'NA',
      subtitle: 'years after the closing date',
    },
    {
      label: 'Length of exit period',
      value: lengthOfExitPeriod ? lengthOfExitPeriod : 'NA',
      subtitle: 'years after the end of the holding period',
    },
  ];

  const commitmentData = [
    {
      label: 'Minimum investment amount',
      value: minimumInvestment ? formatCurrency(minimumInvestment) : 'NA',
    },
    {
      label: 'Do you want to charge a Subscription Fee on the Commitment?',
      value:
        chargeSubscriptionFee === true || chargeSubscriptionFee === false
          ? SPVCommitmentFormOptions.chargeSubscriptionFee.find(
              (option) => option.value === chargeSubscriptionFee
            )?.label
          : 'NA',
    },
    {
      label:
        'Would you allow the investors to transfer their Interests in the SPV to other potential investors?',
      value: allowTransferOfInterests
        ? SPVCommitmentFormOptions.allowTransferOfInterests.find(
            (option) => option.value === allowTransferOfInterests
          )?.label
        : 'NA',
    },
    {
      label: 'Do you want your SPV to be audited?',
      value:
        auditSpv === true || auditSpv === false
          ? SPVStakeholdersFormOptions.auditSpv.find((option) => option.value === auditSpv)
              ?.label
          : 'NA',
    },
  ];

  const partnerAndManagerData = [
    {
      label: 'Will the General Partner appoint an Investment Manager for your SPV?',
      value:
        appointInvestmentManager === true || appointInvestmentManager === false
          ? SPVStakeholdersFormOptions.appointInvestmentManager.find(
              (option) => option.value === appointInvestmentManager
            )?.label
          : 'NA',
    },
    {
      label: "Investment Manager's name",
      value: investmentManagerDetails?.name
        ? capitalizeFirstLetter(investmentManagerDetails?.name)
        : 'NA',
    },
    {
      label: "Investment Manager's address",
      value: investmentManagerDetails?.address
        ? capitalizeFirstLetter(investmentManagerDetails?.address)
        : 'NA',
    },
    {
      label: 'Will the General Partner appoint an Investment Adviser for your SPV?',
      value:
        appointInvestmentAdviser === true || appointInvestmentAdviser === false
          ? SPVStakeholdersFormOptions.appointInvestmentAdviser.find(
              (option) => option.value === appointInvestmentAdviser
            )?.label
          : 'NA',
    },
    {
      label: 'Key Person Provision',
      value: keyPersonProvision
        ? SPVStakeholdersFormOptions.keyPersonProvision.find(
            (option) => option.value === keyPersonProvision
          )?.label
        : 'NA',
    },
  ];

  const reportsData = [
    {
      label:
        'Do you want to provide to Investors with reports of the operation and financial performance of the Target Company?',
      value:
        getTargetCompanyReports === true || getTargetCompanyReports === false
          ? SPVReportingFormOptions.getTargetCompanyReports.find(
              (option) => option.value === getTargetCompanyReports
            )?.label
          : 'NA',
    },
    {
      label: 'How often would you like to send the report on the Target Company to Investors?',
      value: targetCompanyReportFrequency
        ? SPVReportingFormOptions.targetCompanyReportFrequency.find(
            (option) => option.value === targetCompanyReportFrequency
          )?.label
        : 'NA',
    },
  ];

  return (
    <Row gutter={[70, 40]} className='detail-container'>
      <Col xs={24} md={12} xl={8}>
        {waterfallData.map((info, key: number) => (
          <div className='mb-2' key={key}>
            <Typography variant='body9' state='secondary'>
              {info.label}
            </Typography>
            <Typography variant='body7' className='detail-value'>
              {info.value}{' '}
              {info.subtitle && info.value !== 'NA' && <span>{info.subtitle}</span>}
            </Typography>
          </div>
        ))}
      </Col>

      <Col xs={24} md={12} xl={8}>
        {feesData.map((info, key: number) => (
          <div className='mb-2' key={key}>
            <Typography variant='body9' state='secondary'>
              {info.label}
            </Typography>
            <Typography variant='body7' className='detail-value'>
              {info.value}
            </Typography>
          </div>
        ))}
      </Col>

      <Col xs={24} md={12} xl={8}>
        {lifeCycleData.map((info, key: number) => (
          <div className='mb-2' key={key}>
            <Typography variant='body9' state='secondary'>
              {info.label}
            </Typography>
            <Typography variant='body7' className='detail-value'>
              {info.value}{' '}
              {info.value !== 'NA' && info.subtitle && <span>{info.subtitle}</span>}
            </Typography>
          </div>
        ))}
      </Col>

      <Col xs={24} md={12} xl={8} className='secondary-section'>
        {commitmentData.map((info, key: number) => (
          <div className='mb-2' key={key}>
            <Typography variant='body9' state='secondary'>
              {info.label}
            </Typography>
            <Typography variant='body7' className='detail-value'>
              {info.value}
            </Typography>
          </div>
        ))}
      </Col>

      <Col xs={24} md={12} xl={8} className='secondary-section'>
        {partnerAndManagerData.map((info, key: number) => (
          <div className='mb-2' key={key}>
            <Typography variant='body9' state='secondary'>
              {info.label}
            </Typography>
            <Typography variant='body7' className='detail-value'>
              {info.value}
            </Typography>
          </div>
        ))}
      </Col>

      <Col xs={24} md={12} xl={8} className='secondary-section'>
        {reportsData.map((info, key: number) => (
          <div className='mb-2' key={key}>
            <Typography variant='body9' state='secondary'>
              {info.label}
            </Typography>
            <Typography variant='body7' className='detail-value'>
              {info.value}
            </Typography>
          </div>
        ))}
      </Col>
    </Row>
  );
};
