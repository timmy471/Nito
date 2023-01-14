import axios from 'axios';
import type { NextPage } from 'next';
import { IDashboardProps } from 'types';
import { API } from '@src/redux/constants';
import { isServerSideAuthenticated, serverSideLogOut } from '@src/services';
import { DashboardCharts, DashboardCards, DashboardTable } from '@src/components';
import { hasPermission } from '@src/redux/actions/authActions';
import permissions from '@src/helpers/constants/permissions';

const Dashboard: NextPage<IDashboardProps> = ({ dashboardData }) => {
  const {
    fundManagersApprovedCount,
    fundManagersPendingApproval,
    currentlyRaisingSPVs,
    totalLPs,
    totalRaised,
    totalSPVs,
  } = dashboardData || {};

  const fundManagerData = {
    fundManagersApprovedCount,
    fundManagersPendingApproval,
  };

  const statsData = {
    currentlyRaisingSPVs,
    totalLPs,
    totalRaised,
    totalSPVs,
  };

  return (
    <div className='dashboard-home'>
      <DashboardCharts fundManagerData={fundManagerData} />
      <DashboardCards {...statsData} />
      {hasPermission(permissions.listFundManager) && <DashboardTable />}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { access_token, isAuth } = isServerSideAuthenticated(context);
  if (!isAuth) return serverSideLogOut(context);

  try {
    const { data } = await axios.get(`${API}/dashboard`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return {
      props: { dashboardData: data.data },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default Dashboard;
