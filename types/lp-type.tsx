export interface ILP {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastInvestmentTime: null;
  lastInvestmentAmount: number;
  totalInvestmentAmount: number;
  mean: null;
  createdAt?: Date;
}

export interface ILPQueryParam {
  searchFilter?: string;
  cursor?: string;
}

export interface ILPInitialState {
  loading: boolean;
  lp: {
    lps: Array<ILP> | null;
    count: number;
  };
  selectedLP: {
    loading: boolean;
    data: ILP | {};
  };
  statistics: {
    totalLps: number;
    totalSyndicates: number;
    activeLps: number;
  };
  queryParams: ILPQueryParam;
}
