import { IUser } from 'types';
import Image from 'next/image';
import { assets } from '@src/assets';
import type { NextPage } from 'next';
import { Logout } from '@src/services';
import { Typography } from '@src/components';
import { Layout, Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { capitalizeFirstLetter } from '@src/helpers';

interface IProps {
  showDrawer: () => void;
  user: IUser;
  currentPath: string;
}

export const TopHeader: NextPage<IProps> = ({ user, showDrawer, currentPath }) => {
  const { Header } = Layout;

  const getPageTitle = () => {
    switch (currentPath.slice(1).split('/')[0]) {
      case 'spvs':
        return 'Funds';

      case 'fund-managers':
        return 'Fund Manager';

      case 'assets':
        return 'Assets';

      case 'lps':
        return 'LPs';

      case 'roles':
        return 'Roles';

      case 'team':
        return 'Teams';

      default:
        return 'Dashboard';
    }
  };

  const profileMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Typography
              variant='body7'
              className='mb-0'
              state='error'
              onClick={() => Logout()}>
              Logout
            </Typography>
          ),
        },
      ]}
    />
  );

  const notificationsMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div className='d-flex justify-content-between align-items-center px-1 py-2'>
              <Typography variant='body5' className='mb-0'>
                Notifications
              </Typography>
              {/* <Typography variant='body7' className='mb-0' state='secondary'>
                Clear
              </Typography> */}
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div>
              {/* Loop an array of objects to get this */}
              {/* <div className='px-1 mbottom-3'>
                <Typography state='secondary' variant='body9'>
                  Today
                </Typography>
                <div className='mtop-2'>
                  <Typography variant='body7' className='mbottom-1'>
                    Lorem ipsum dolor sit amet, consect
                  </Typography>
                  <Typography state='secondary' variant='body9'>
                    Just Now
                  </Typography>
                </div>

                <div className='mtop-2'>
                  <Typography variant='body7' className='mbottom-1'>
                    Lorem ipsum dolor sit amet, consect
                  </Typography>
                  <Typography state='secondary' variant='body9'>
                    2h
                  </Typography>
                </div>
              </div> */}

              <div className='px-1 mb-1'>
                {/* <Typography state='secondary' variant='body9'>
                  Yesterday
                </Typography>
                <div className='mtop-2'>
                  <Typography variant='body8' className='mbottom-1'>
                    Lorem ipsum dolor sit amet, consect
                  </Typography>
                  <Typography state='secondary' variant='body9'>
                    10:30pm
                  </Typography>
                </div> */}

                <div className='mtop-2'>
                  <Typography variant='body8' className='mbottom-1'>
                    No new Notifications
                  </Typography>
                  {/* <Typography state='secondary' variant='body9'>
                    2:15pm
                  </Typography> */}
                </div>
              </div>
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <Header className='top-header'>
      <div className='d-flex justify-content-between w-100'>
        <div className='d-flex'>
          <div className='mobile-hambugger'>
            <Image
              src={assets.HamburgerIcon.src}
              alt={assets.HamburgerIcon.alt}
              width={'25'}
              height={'25'}
              onClick={showDrawer}
              className='hamburger-icon'
            />
          </div>
          <Typography className='page-title' component='h4'>
            {getPageTitle()}
          </Typography>
          {user.lastLogin && (
            <div className='login-time'>
              <Typography state='secondary' className='mr-2'>
                <b>Last Login:</b>
              </Typography>
              <Typography>{user.lastLogin}</Typography>
            </div>
          )}
        </div>
        <div className='d-flex'>
          <Dropdown
            overlay={notificationsMenu}
            placement='bottom'
            trigger={['click']}
            overlayStyle={{
              paddingTop: '.2rem',
            }}>
            <div className='notif-bell cursor-pointer'>
              <Image
                src={assets.NotificationBellIcon.src}
                alt={assets.NotificationBellIcon.alt}
                height='20'
                width='20'
              />
            </div>
          </Dropdown>

          <div className='user-avatar'>
            <Image
              src={assets.UserAvatarIcon.src}
              alt={assets.UserAvatarIcon.alt}
              height='45'
              width='45'
            />
          </div>

          <div className='user-detail'>
            <Typography variant='body5'>{capitalizeFirstLetter(user.firstName)}</Typography>
            <Typography variant='body8' state='tetiary'>
              Admin
            </Typography>
          </div>

          <div className='dropdown-cta'>
            <Dropdown
              overlay={profileMenu}
              placement='bottomLeft'
              trigger={['click']}
              overlayStyle={{
                minWidth: '7rem',
                paddingTop: '.7rem',
              }}>
              <CaretDownOutlined style={{ color: '#3F3F3F' }} />
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  );
};
