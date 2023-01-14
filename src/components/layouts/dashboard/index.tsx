import { Layout } from 'antd';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux/store';
import { IDashboradLayoutProps } from 'types';
import { Menu, TopHeader } from '@src/components';

export const DashboardLayout: React.FC<IDashboradLayoutProps> = ({
  children,
  contentClassName,
}) => {
  const { Content } = Layout;
  const [visible, setVisible] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.auth);

  const router = useRouter();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className='dashboard-container'>
      <Layout>
        <Menu user={user} onClose={onClose} visible={visible} currentPath={router.pathname} />
        <Layout className='site-layout'>
          <TopHeader showDrawer={showDrawer} user={user} currentPath={router.pathname} />
          <Content className='site-content'>
            <div
              className={`site-layout-background ${contentClassName ? contentClassName : ''}`}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
