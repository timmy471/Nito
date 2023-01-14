import Link from 'next/link';
import Image from 'next/image';
import { IUser } from 'types';
import { Fragment } from 'react';
import { assets } from '@src/assets';
import type { NextPage } from 'next';
import { Layout, Drawer } from 'antd';
import { Logout } from '@src/services';
import { Typography } from '@src/components';
import permissions from '@src/helpers/constants/permissions';
import { hasPermission } from '@src/redux/actions/authActions';

interface IProps {
  user: IUser;
  visible: boolean;
  onClose: () => void;
  currentPath: string;
}

export const Menu: NextPage<IProps> = ({ visible, onClose, currentPath }) => {
  const { Sider } = Layout;

  const {
    dashboardIcon,
    spvIcon,
    fundManagerIcon,
    assetsIcon,
    LogoutIcon,
    lpIcon,
    rolesIcon,
    teamsIcon,
  } = assets;

  const { listFundManager, listLimitedPartner, viewUser, viewAsset, viewRole } = permissions;

  const links = [
    {
      path: '/dashboard',
      icon: dashboardIcon,
      title: 'Dashboard',
    },
    {
      path: '/spvs',
      icon: spvIcon,
      title: 'SPVs',
      // canView: listFund,
    },
    {
      path: '/fund-managers',
      icon: fundManagerIcon,
      title: 'Fund Managers',
      canView: listFundManager,
    },
    {
      path: '/lps',
      icon: lpIcon,
      title: 'LPs',
      canView: listLimitedPartner,
    },
    {
      path: '/assets',
      icon: assetsIcon,
      title: 'Assets',
      canView: viewAsset,
    },
    {
      path: '/team',
      icon: teamsIcon,
      title: 'Teams',
      canView: viewUser,
    },
    {
      path: '/roles',
      icon: rolesIcon,
      title: 'Roles & Permission',
      canView: viewRole,
    },
  ];

  const isCurrentPath = (path: string) =>
    path === currentPath || path === `/${currentPath.split('/')[1]}`;

  const getMenuLinks = () => (
    <div className='side-navigation-container'>
      <div className='dashboard-links-container'>
        <ul>
          {links.map(({ path, icon, title, canView }, key) => {
            return (
              (hasPermission(canView) || !canView) && (
                <Link href={path} passHref key={key}>
                  <li className={`d-flex ${isCurrentPath(path) ? 'active' : ''}`} key={key}>
                    <Image src={icon.src} alt={icon.alt} width={25} height={28} />
                    <Typography>{title}</Typography>
                  </li>
                </Link>
              )
            );
          })}
        </ul>
      </div>
      <div className='logout-cta cursor-pointer' onClick={() => Logout()}>
        <Image src={LogoutIcon.src} alt={LogoutIcon.alt} width={25} height={28} />{' '}
        <Typography>Logout</Typography>
      </div>
    </div>
  );

  return (
    <div>
      <Sider className='menu'>
        <Link href='/dashboard' passHref>
          <div className='dashboard-menu-logo'>
            <Image src={assets.AsLogoLight.src} width={200} height={50} alt='Logo' />
          </div>
        </Link>
        {getMenuLinks()}
      </Sider>

      <Fragment>
        <Drawer
          placement={'left'}
          closable={false}
          onClose={onClose}
          visible={visible}
          width='250'
          key={'left'}
          className='mobile-drawer'>
          <div className='drawer-menu'>
            <Link href='/dashboard' passHref>
              <div className='dashboard-menu-logo mt-2'>
                <Image src={assets.AsLogoLight.src} width={150} height={40} alt='Logo' />
              </div>
            </Link>
            {getMenuLinks()}
          </div>
        </Drawer>
      </Fragment>
    </div>
  );
};
