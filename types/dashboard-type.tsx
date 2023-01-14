type dashboardData = {
  currentlyRaisingSPVs: number;
  totalLPs: number;
  totalRaised: number;
  totalSPVs: number;
  fundManagersApprovedCount: number;
  fundManagersPendingApproval: number;
};
export interface IDashboardProps {
  dashboardData: dashboardData;
}

export interface IDashboardStats {
  currentlyRaisingSPVs: number;
  totalLPs: number;
  totalRaised: number;
  totalSPVs: number;
}

type dashboardStateFundManagers = {
  fundManagersApprovedCount: number;
  fundManagersPendingApproval: number;
};

export interface IDashboardInitialState {
  loading: boolean;
  error: string | null;
}

export interface IDashboardChartProps {
  fundManagerData: dashboardStateFundManagers;
}
