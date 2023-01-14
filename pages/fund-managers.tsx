import axios from 'axios';
import { assets } from '@src/assets';
import { API } from '@src/redux/constants';
import type { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { AppDispatch } from '@src/redux/store';
import type { ColumnsType } from 'antd/lib/table';
import { IFundManager, ISelectedFundmanagerData } from 'types';
import { isServerSideAuthenticated, serverSideLogOut } from '@src/services';
import { DetailDrawer, FMTable, FMDetail, FMInfo, Pill } from '@src/components';
import { GetFundManagersList } from '@src/redux/actions/fundManagerActions';
import { capitalizeFirstLetter, formatCamelCaseWord } from '@src/helpers';

interface IFMPageProps {
  statistics: {
    totalFundManagers: number;
    totalFundManagersPendingReview: number;
    totalSyndicates: number;
  };
}

const FundManagers: NextPage<IFMPageProps> = ({ statistics }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(GetFundManagersList());
    //eslint-disable-next-line
  }, []);

  const [currentFundManager, setCurrentFundManager] =
    useState<ISelectedFundmanagerData | null>(null);

  const displayInfo = (text: string, val: IFundManager) => {
    return (
      <div className='subscriber d-flex align-items-center'>
        <img
          src={val.avatar || assets.UserAvatarIcon.src}
          alt={'Avatar'}
          className='user-avatar'
        />
        <h4 className='ml-2 mb-0'>{val.name || ''}</h4>
      </div>
    );
  };

  const columns: ColumnsType<IFundManager> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, val) => displayInfo(text, val),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <span>{text}</span>,
    },

    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'kycStatus',
      key: 'kycStatus',
      render: (text) => (
        <Pill
          label={capitalizeFirstLetter(text)}
          className={`fm-status-pill fm-status-pill__${text.toLowerCase()} ml-3`}
        />
      ),
    },
  ];

  return (
    <div className='fund-managers'>
      <FMInfo statistics={statistics} />
      <div className='slide-in-bottom'>
        <FMTable
          columns={columns}
          showDetail={(record: any) => setCurrentFundManager(record)}
        />
      </div>
      <DetailDrawer
        visible={!!currentFundManager}
        handleClose={() => setCurrentFundManager(null)}
        width={500}>
        <FMDetail currentFundManager={currentFundManager} />
      </DetailDrawer>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { access_token, isAuth } = isServerSideAuthenticated(context);
  if (!isAuth) return serverSideLogOut(context);

  try {
    const { data } = await axios.get(`${API}/users/fund-managers/stats`, {
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

export default FundManagers;
