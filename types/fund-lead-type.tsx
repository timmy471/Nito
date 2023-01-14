export interface IFundManagerTableDataType {
  key: string;
  name: string;
  nationality: string;
  email: string;
  joined: string;
  registrationFormat: string;
  status: string;
  img?: string;
  address: string;
  phoneNumber: string;
  details: string;
  noOfSpvs: number;
  existingNetwork: string;
  verificationProofLink: string;
  idProofLink: string;
}
export interface IGeneralLPTableDataType {
  key: string;
  name: string;
  email: string;
  lastInvestment: string;
  img: string;
  median: number;
  rate: string;
  address: string;
  investmentOverTime: string;
  lastInvestmentDate: string;
  dateOfFirstInvestment: string;
  numberOfSyndicates: number;
  dob: string;
  phoneNumber: string;
  investorsAccreditation: string;
  verificationEvidenceLink: string;
  proofOfId: string;
  proofOfAddress: string;
  totalInvested: string;
  investments: number;
  ratio: string;
  syndicates: string[];
}

export interface ISelectedFundmanagerData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: null;
  userType: string;
  isOnboarded: boolean;
  acceptedTandC: boolean;
  createdAt: Date;
  profile: any[];
  FundManagerKYC: IFundManagerKYC;
}

export interface IFundManagerKYC {
  id: string;
  investorType: string;
  VCName: string;
  VCAddress: string;
  averageSPVsPerQuarter: number;
  hasExistingLPNetwork: boolean;
  nationality: string;
  addressLineOne: string;
  addressLineTwo: string;
  zipCode: number;
  proofOfIdDocumentUrl: string;
  kycStatus: string;
  requestAttendedBy: null;
  userId: string;
}

export type IFundManager = {
  id: string;
  name: string;
  createdAt: string;
  email: string;
  kycStatus: string;
  registeredAs: string;
  avatar: string;
  isOnboarded: boolean;
};

export interface IFMQueryParam {
  searchFilter?: string;
  cursor?: string;
}

export interface IFundManagerSliceState {
  loading: boolean;
  fundmanager: {
    fundmanagers: Array<IFundManager> | null;
    count: number;
  };
  selectedFundManager: {
    loading: boolean;
    approvingFundManager: boolean;
    data: ISelectedFundmanagerData | {};
  };
  statistics: {
    totalFundManagers: number;
    totalFundManagersPendingReview: number;
    totalSyndicates: number;
  };
  queryParams: IFMQueryParam;
}
