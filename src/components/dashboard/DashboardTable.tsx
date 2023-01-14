import { useState, useEffect } from 'react';
import { assets } from '@src/assets';
import type { ColumnsType } from 'antd/lib/table';
import { useAppDispatch } from '@src/hooks/redux';
import { capitalizeFirstLetter } from '@src/helpers';
import { IFundManager, ISelectedFundmanagerData } from 'types';
import { DetailDrawer, FMTable, FMDetail, Pill } from '@src/components';
import {
  ClearFundManagersList,
  GetFundManagersList,
} from '@src/redux/actions/fundManagerActions';

export const DashboardTable: React.FC = () => {
  const [currentFundManager, setCurrentFundManager] =
    useState<ISelectedFundmanagerData | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ClearFundManagersList());
    dispatch(GetFundManagersList());
    //eslint-disable-next-line
  }, []);

  const displayInfo = (text: string, val: IFundManager) => {
    return (
      <div className='subscriber'>
        <div className='subscriber d-flex align-items-center'>
          <img
            src={val.avatar || assets.UserAvatarIcon.src}
            alt={'Avatar'}
            width='40'
            height='40'
            className='user-avatar'
          />
          <h4 className='ml-2 mb-0'>{val.name || ''}</h4>
        </div>
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
    <div className='fund-managers slide-in-bottom'>
      <FMTable
        columns={columns}
        showDetail={(record: any) => setCurrentFundManager(record)}
        isMini={true}
      />
      <DetailDrawer
        visible={!!currentFundManager}
        handleClose={() => setCurrentFundManager(null)}
        width={500}>
        <FMDetail currentFundManager={currentFundManager} />
      </DetailDrawer>
    </div>
  );
};
