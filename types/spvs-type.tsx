import { ISPVAsset } from './assets-type';

export interface ISPVListTableDataType {
  key: string;
  company: string;
  stage: string;
  date: string;
  target: string;
  syndicate: string;
  fundManager: string;
  status: string;
  allocation: string;
  info?: string;
}

export interface ILPTAbleDataType {
  id: string;
  user: { firstName: string; lastName: string; avatar: string };
  amount: string;
  status: string;
  createdAt: string | Date;
  yourCarry: number;
}

export interface ISPVTAbleDataType {
  key: string;
  subscriber: string;
  amount: string;
  status: string;
  date: string;
  yourCarry: string;
  ffCarry: string;
  img?: string;
  logo: string;
  investorSince: string;
  syndicateNumber: number;
  lastInvestment: string;
  address: string;
  phoneNumber: string;
  dob: string;
  email: string;
  investorsAccreditation: string;
  verificationProofLink: string;
  idProofLink: string;
  addressProofLink: string;
  investingActivity: string;
  totalInvested: string;
  totalNumberOfInvestments: number;
  investmentPercentage: string;
  commitmentAmount: string;
}

export interface ISPVQueryParam {
  searchFilter?: string;
  cursor?: string;
  round?: string;
}

export interface lpsData {
  loading: boolean;
  lps: ILPTAbleDataType[] | null;
  count: number;
  cursor: string;
}

export interface ICurrentInvestmentData {
  loading: boolean;
  currentInvestment: any;
}
export interface ISPVSInitialState {
  loading: boolean;
  spvs: null | IFund[];
  count: number;
  queryParams: ISPVQueryParam;
  lpsData: lpsData;
  currentInvestmentData: ICurrentInvestmentData;
}

export type spvInvestor = {
  lead: string;
  amount: string | number;
  name: string;
};

export interface FundInvestmentTerms {
  round: string;
  discount: number;
  totalRoundSize: number;
  convertationCap: string;
}

export interface IFund {
  id: string;
  name?: string;
  transactionType: string;
  title?: string;
  investmentTermsData?: FundInvestmentTerms;
  roundSize: string;
  instrument: string;
  shareClass: string;
  allocation: string;
  round: string;
  raised?: string;
  reference: string;
  otherTerms: string;
  targetRaise: null;
  closingDate: Date;
  minimumInvestment: string;
  proRataRights: string;
  investors: spvInvestor[];
  carriedInterest?: number;
  runway: null;
  userId: string;
  status: string;
  published: boolean;
  fundType: string;
  createdAt: Date;
  updatedAt: Date;
  syndicateId: string;
  managementFee: number;
  carry: number;
  previousRaise: boolean;
  assets: ISPVAsset[];
  wallet?: {
    availableBalance: string | number;
  };
}

export interface IFundUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  userType: string;
  acceptedTandC: boolean;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface INewSPVData {
  status?: string;
  opportunity: NewSPVOpportunity;
  investmentTerms: NewSPVInvestmentTerms;
  dealOverview: NewSPVDealOverview;
  basicInfo: NewSPVBasicInfo;
  waterfall: NewSPVWaterfall;
  feesAndExpenses: NewSPVFeesAndExpenses;
  lifeCycle: NewSPVLifeCycle;
  commitment: NewSPVCommitment;
  stakeholders: NewSPVStakeholders;
  reporting: NewSPVReporting;
  legalDocuments: NewSPVLegalDocuments;
  asset?: ISPVAsset;
  reference?: string;
  id?: string;
  documents: ISPVDocument[];
  user?: IFundUser;
}

export interface NewSPVInvestmentTerms {
  investmentType: string;
  equityRound: NewSPVEquityRound;
  convertibleNote: NewSPVConvertibleNote;
  safe: NewSPVConvertibleNote;
  secondary: NewSPVSecondary;
}

export interface NewSPVConvertibleNote {
  round: string;
  totalRoundSize: number | string;
  discount: number | string;
  convertationCap: string;
  safeType?: string;
}

export interface NewSPVEquityRound {
  round: string;
  totalRoundSize: number | string;
  preMoneyValuation: number | string;
  shareClass: string;
}

export interface NewSPVSecondary {
  offeringOrPriceValuation: number | string;
  lastRoundValuation: number | string;
  lastRoundDate: string;
}

export interface NewSPVOpportunity {
  assetId: string;
  currency: string;
  allocation: number | string;
}

export interface NewSPVBasicInfo {
  name: string;
  currency: string;
}

export interface NewSPVCommitment {
  minimumInvestment: number | string;
  subscriptionFee: number;
  chargeSubscriptionFee?: boolean;
  allowTransferOfInterests: string;
}

export interface NewSPVDealOverview {
  memo: string;
  pitchDeck: string;
  pitchDeckFile?: File | null;
}

export interface NewSPVFeesAndExpenses {
  spvManagementFee: string;
  handleGpFees: string;
  spvOperatingExpenses: string;
  setupCosts: string;
}

export interface NewSPVLifeCycle {
  closingDate: string;
  timelineForInvestorSendingMoney: number;
  lengthOfHoldingPeriod: number;
  lengthOfExitPeriod: number;
}

export interface NewSPVWaterfall {
  returnOfCommitment?: boolean;
  preferredReturn: string;
  carriedInterest: number;
  carriedInterestRecipient: string;
}

export interface NewSPVLegalDocuments {
  approveCurrencyCloudAccountCurrencyForm: string;
  signSpvServicesAgreement: string;
  approveLpAgreement: string;
}

export interface NewSPVReporting {
  getTargetCompanyReports?: boolean;
  targetCompanyReportFrequency: string;
}

export interface NewSPVStakeholders {
  appointInvestmentManager?: boolean;
  investmentManagerDetails: NewSPVInvestmentManagerDetails;
  appointInvestmentAdviser?: boolean;
  auditSpv?: boolean;
  keyPersonProvision: string;
}

export interface NewSPVInvestmentManagerDetails {
  name: string;
  address: string;
}

export interface INewSPVModalProps {
  handleNewSPVModalOpen: () => void;
  isSPVModalOpen: boolean;
}

export interface INewSPVControlButtonProps {
  backLabel?: string;
  continueLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  onBackClick?: () => void;
  onSubmitClick?: () => void;
}

export interface INewSPVLayoutTopbarProps {
  spvName?: string;
  spvStatus?: string;
  isFormVisible: boolean;
  handleFormVisibility: () => void;
}

export type NewSPVActiveSections =
  | 'identify-your-opportunity'
  | 'complete-the-institution'
  | 'generate-the-legal-aggreement';

export interface INewSPVsectionMenu {
  identifyYourOpportunity: string;
  completeTheConstitution: string;
  generateTheLegalAggrement: string;
}

export interface NewSPVSectionMenu {
  [key: string]: NewSPVActiveSections;
}

export interface INewSPVLayoutSectionProps {
  activeSection: NewSPVActiveSections;
  handleSectionChange: (activeSection: NewSPVActiveSections) => void;
  sectionMenu: NewSPVSectionMenu;
  spv_id?: string | string[];
}

//   export interface INewSPVFormStepperProps {
//     steps: NewSPVSectionStep[];
//   }

export interface INewSPVLayoutProps {
  currentSpv: INewSPVData;
  children: React.ReactNode;
  sectionMenu: any;
  isFormVisible: boolean;
  setIsFormVisible: (val: boolean) => void;
}

export type InvestmentTypeOptions = 'equityRound' | 'convertibleNote' | 'safe' | 'secondary';

export interface IInvestmentTermsFormProps {
  investmentTerms: NewSPVInvestmentTerms;
  handleInvestTermsFormBack: () => void;
  SubmitEquityRound: (values: NewSPVEquityRound, formik: any) => void;
  SubmitConvertibleNote: (values: NewSPVConvertibleNote, formik: any) => void;
  SubmitSAFE: (values: NewSPVConvertibleNote, formik: any) => void;
  SubmitSecondary: (values: NewSPVSecondary, formik: any) => void;
  SetInvestmentType: (investmentType: InvestmentTypeOptions) => void;
}

export interface IDealOverviewFormProps {
  dealOverview: NewSPVDealOverview;
  handleFormBack: () => void;
  SubmitDealOverview: (values: NewSPVDealOverview, formik: any) => void;
}

export interface ISPVDocument {
  id: string;
  url: string | null;
  status: 'signed' | 'pending' | 'confirmed';
  template: string;
  reference: string | null;
  signatory: string | null;
  createdAt: string;
  fundId: string;
}
