import {
  UserTypes,
  InvestmentStatuses,
  SourceOfWealthOptions,
  TransactionTypeOptions,
  ShareClassOptions,
  S3ConfigType,
  OnboardingRegistrationTypes,
  ISelectFieldOptions,
} from 'types';

export const dateMenuOptions = [
  'Today',
  'Yesterday',
  'This Month',
  'Last Month',
  'Date Range',
];

export const companySizes = [
  { value: '10-50', label: '10-50' },
  { value: '51-200', label: '51-200' },
  { value: '201-500', label: '201-500' },
  { value: '501-1000', label: '501-1000' },
];

export const carouselbreakPoints = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    partialVisibilityGutter: 11,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 120,
  },
};

export const assetStatusOptions: ISelectFieldOptions[] = [
  {
    label: 'Published',
    value: 'published',
  },
  {
    label: 'Draft',
    value: 'draft',
  },
];

export const industryOptions: ISelectFieldOptions[] = [
  {
    label: 'Agriculture',
    value: 'agriculture',
  },
  {
    label: 'Consumer goods',
    value: 'consumerGoods',
  },
  {
    label: 'Education',
    value: 'education',
  },
  {
    label: 'Energy',
    value: 'energy',
  },
  {
    label: 'Finance',
    value: 'finance',
  },
  {
    label: 'Healthcare',
    value: 'healthcare',
  },
  {
    label: 'Industrial goods',
    value: 'industrialGoods',
  },
  {
    label: 'ICT',
    value: 'ICT',
  },
  {
    label: 'Natural resources',
    value: 'naturalResources',
  },
  {
    label: 'Oil and Gas',
    value: 'oilAndGas',
  },
  {
    label: 'Real estate',
    value: 'realEstate',
  },
  {
    label: 'Services',
    value: 'services',
  },
  {
    label: 'Utilities',
    value: 'utilities',
  },
  {
    label: 'Others',
    value: 'others',
  },
];

export const kycStatuses = {
  registered: 'REGISTERED',
  submitted: 'SUBMITTED',
  approved: 'APPROVED',
  rejected: 'REJECTED',
};

export const fundStatuses = {
  draft: 'draft',
  inReview: 'inReview',
  raising: 'raising',
  closing: 'closing',
  wired: 'wired',
};

export const userTypes: UserTypes = {
  limitedPartner: 'LIMITED_PARTNER', //formerly 'INVESTOR
  fundManager: 'FUND_MANAGER',
};

export const s3Config: S3ConfigType = {
  bucketName: process.env.NEXT_PUBLIC_S3_BUCKET_NAME || '',
  region: process.env.NEXT_PUBLIC_S3_REGION || '',
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCES_KEY_ID || '',
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY || '',
};

export const onboardingRegistrationTypes: OnboardingRegistrationTypes = {
  individual: 'INDIVIDUAL',
  ventureCapital: 'VENTURE_CAPITAL',
};

export const investmentStatuses: InvestmentStatuses = {
  initiated: 'initiated',
  committed: 'committed',
  paymentPending: 'paymentPending',
  paymentComplete: 'paymentComplete',
};

export const sourceOfWealthOptions: SourceOfWealthOptions = {
  Personal: 'Personal',
  Business: 'Business',
  Employment: 'Employment',
  Others: 'Others',
};

export const transactionTypeOptions: TransactionTypeOptions = {
  Primary: 'primary',
  Secondary: 'secondary',
};

export const instrumentOptions: ISelectFieldOptions[] = [
  {
    label: 'Equity',
    value: 'equity',
  },
  { label: 'Convertible Note', value: 'convertibleNote' },
  {
    label: 'SAFE',
    value: 'safe',
  },
];

export const shareClassOptions: ShareClassOptions = {
  Common: 'common',
  Preferred: 'preferred',
};

export const roundOptions: ISelectFieldOptions[] = [
  {
    label: 'Pre-Seed',
    value: 'preSeed',
  },
  {
    label: 'Seed',
    value: 'seed',
  },
  {
    label: 'Series A',
    value: 'seriesA',
  },
  {
    label: 'Series B',
    value: 'seriesB',
  },
  { label: 'Series C', value: 'seriesC' },
];

export const investmentTypeOptions: ISelectFieldOptions[] = [
  {
    label: 'Equity Round',
    value: 'equityRound',
  },
  { label: 'Convertible Note', value: 'convertibleNote' },
  {
    label: 'SAFE',
    value: 'safe',
  },
  {
    label: 'Secondary',
    value: 'secondary',
  },
];

export const SPVFeesAndExpensesFormOptions = {
  spvManagementFee: [
    { label: 'No', value: 'no' },
    {
      label: 'Yes, a percentage of the Commitment, which will be paid upfront to the GP',
      value: 'yesWithPercentageCommitmentUpfront',
    },
    {
      label:
        'Yes, an annual percentage of the Commitment, which will be paid to the GP when the Investment is realized',
      value: 'yesAsAnAnnualPercentageOfCommitment',
    },
  ],
  handleGpFees: [
    { label: ' The GP shall retain these fees', value: 'gpRetainFees' },
    { label: 'The GP shall reimburse these fees to the SPV', value: 'gpReimburseFeeToSpv' },
  ],
  spvOperatingExpenses: [
    {
      label: 'Yes, unlimited',
      value: 'yesWithunlimited',
    },
    {
      label: 'Yes, with a maximum cap',
      value: 'yesWithmaximumCap',
    },
    {
      label: 'No',
      value: 'no',
    },
  ],
  setupCosts: [
    {
      label: 'A precise figure',
      value: 'preciseFigure',
    },
    {
      label: 'A % of the total commitment',
      value: 'pecentageOfCommitment',
    },
    {
      label: 'None',
      value: 'no',
    },
  ],
};

export const SPVWaterfallFormOptions = {
  returnOfCommitment: [
    {
      label: 'Return to the Investors their Commitments',
      value: true,
    },
  ],
  preferredReturn: [
    {
      label: 'No preferred return',
      value: 'noReturn',
    },
    {
      label: 'Preferred Return (Annualized percentage rate) of Commitment',
      value: 'preferredReturn',
    },
    {
      label: 'Multiple Commitment',
      value: 'multipleCommitment',
    },
    {
      label: 'Tiered Carry (Annualized percentage rate) of Commitment',
      value: 'tieredCarry',
    },
    {
      label: 'Tiered Carry Multiple of Commitment',
      value: 'tieredCarryMiltpleCommitment',
    },
  ],
  carriedInterestRecipient: [
    {
      label: 'To one or multiple carried interest partners',
      value: 'multipleCarriedInterestPartners',
    },
    {
      label: 'To the general partner',
      value: 'generalPartner',
    },
    {
      label: 'To the Investment Manager',
      value: 'investmentManager',
    },
    {
      label: 'To the investment adviser',
      value: 'investmentAdviser',
    },
  ],
};

export const SPVCommitmentFormOptions = {
  chargeSubscriptionFee: [
    {
      label: 'Yes',
      value: true,
    },
    {
      label: 'No',
      value: false,
    },
  ],
  allowTransferOfInterests: [
    {
      label: 'Yes to both existing & potential Investors',
      value: 'toPotentialInvestors',
    },
    {
      label: 'Yes but only to existing Investors',
      value: 'toExistingInvestors',
    },
  ],
};

export const SPVStakeholdersFormOptions = {
  appointInvestmentAdviser: [
    {
      label: 'Yes',
      value: true,
    },
    {
      label: 'No',
      value: false,
    },
  ],
  appointInvestmentManager: [
    {
      label: 'Yes',
      value: true,
    },
    {
      label: 'No',
      value: false,
    },
  ],
  auditSpv: [
    {
      label: 'Yes',
      value: true,
    },
    {
      label: 'No',
      value: false,
    },
  ],
  keyPersonProvision: [
    {
      label: 'No',
      value: 'no',
    },
    {
      label: 'Yes, one of them',
      value: 'yesOneOfThem',
    },
    {
      label: 'Yes, two of them',
      value: 'yesTwoOfThem',
    },
    {
      label: 'Yes, all of them',
      value: 'yesAllOfThem',
    },
  ],
};

export const SPVReportingFormOptions = {
  getTargetCompanyReports: [
    {
      label: 'Yes',
      value: true,
    },
    {
      label: 'No',
      value: false,
    },
  ],
  targetCompanyReportFrequency: [
    {
      label: 'Monthly',
      value: 'monthly',
    },
    {
      label: 'Quarterly',
      value: 'quarterly',
    },
    {
      label: 'Semi-Annually',
      value: 'semiAnnually',
    },
    { label: 'Annualy', value: 'annually' },
  ],
};

export const defaultMemoHTML =
  '<p>[One-liner describing the company]</p><h4><strong>INTRODUCTION</strong></h4><p>Give a quick overview of what the company does.</p><h4><strong>Problem/Market/Segment/Industry</strong></h4><p>Explain the problem that the company is attempting to tackle, as well as the market/segment in which they operate.</p><h4><strong>Business Model</strong></h4><p>What is the business model of the company? What are their plans to make money and what are their costs? Is the company performing well? Do they have users or revenue?</p><h4><strong>Traction</strong></h4><p>Give some evidence of early traction.</p><h4><strong>Competition</strong></h4><p>Give a broad picture of the competitive environment. If competitors exist, how do they differ? Do you think that will change if there are no rivals, or can you explain why that may be?</p><h4><strong>Founders &amp; Team</strong></h4><p>Provide information about the founders and the team. What professional experience do the founders have? Have they started companies previously, do they have successful exits, have they raised money in the past? Do they have experience building teams? Do they have an unfair advantage? Have they made key hires with specific domain knowledge? You may want to include bios on the founders or founding team.</p><h4><strong>Press</strong></h4><p>Include links to any interesting press articles on the company.</p><p>&nbsp;</p><p>&nbsp;</p>';
