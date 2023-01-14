import axios from 'axios';
import type { NextPage } from 'next';
import { ILP } from 'types';
import type { ColumnsType } from 'antd/lib/table';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@src/redux/store';
import { useState, useEffect } from 'react';
import { assets } from '@src/assets';
import { GetLpList } from '@src/redux/actions/lpActions';
import { API } from '@src/redux/constants';
import { formatCurrency, formatDate } from '@src/helpers';
import { isServerSideAuthenticated, serverSideLogOut } from '@src/services';
import { DetailDrawer, GeneralLPInfo, GeneralLPTable, GeneralLPDetail } from '@src/components';

interface ILPPageProps {
  statistics: {
    totalLps: number;
    totalSyndicates: number;
    activeLps: number;
  };
}

const LPs: NextPage<ILPPageProps> = ({ statistics }) => {
  const [currentLP, setCurrentLP] = useState<ILP | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(GetLpList());
    //eslint-disable-next-line
  }, []);

  const displayInfo = (text: string, val: ILP) => {
    return (
      <div className='subscriber d-flex align-items-center'>
        <img src={assets.UserAvatarIcon.src} alt={'Avatar'} className='user-avatar' />
        <h4 className='ml-2 mb-0'>{`${val.firstName} ${val.lastName}`}</h4>
      </div>
    );
  };

  const columns: ColumnsType<ILP> = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, val) => displayInfo(text, val),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span>{text ? text : ''}</span>,
    },
    {
      title: 'Mean',
      dataIndex: 'mean',
      key: 'mean',
      render: (text) => <span>{text ? formatCurrency(text) : 'NA'}</span>,
    },
    {
      title: 'Last Investment Time',
      key: 'lastInvestmentTime',
      dataIndex: 'lastInvestmentTime',
      render: (text) => <span>{text ? formatDate(text, true) : 'NA'}</span>,
    },
    {
      title: 'Total Investment Amount',
      key: 'totalInvestmentAmount',
      dataIndex: 'totalInvestmentAmount',
      render: (text) => <span>{text ? formatCurrency(text) : 'NA'}</span>,
    },
    {
      key: 'icon',
      dataIndex: 'icon',
      render: () => (
        <img
          src={assets.OpenEyeIcon.src}
          alt={assets.OpenEyeIcon.alt}
          height='10'
          width='20'
        />
      ),
    },
  ];

  return (
    <div className='lps'>
      <GeneralLPInfo statistics={statistics} />
      <div className='slide-in-bottom'>
        <GeneralLPTable columns={columns} showDetail={(record: any) => setCurrentLP(record)} />
      </div>
      <DetailDrawer visible={!!currentLP} handleClose={() => setCurrentLP(null)} width={500}>
        <GeneralLPDetail currentLP={currentLP} />
      </DetailDrawer>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { access_token, isAuth } = isServerSideAuthenticated(context);
  if (!isAuth) return serverSideLogOut(context);

  try {
    const { data } = await axios.get(`${API}/funds/lps/stats`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return {
      props: { statistics: data.data },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default LPs;
