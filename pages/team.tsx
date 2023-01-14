import moment from 'moment';
import { debounce } from 'lodash';
import { IAdminUser } from 'types';
import { assets } from '@src/assets';
import { Row, Col, Collapse } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { capitalizeFirstLetter } from '@src/helpers';
import { CaretDownOutlined } from '@ant-design/icons';
import { determineUserStatus } from '@src/helpers/utils';
import { GetRoles } from '@src/redux/actions/roleActions';
import { GetAdminUsers } from '@src/redux/actions/teamActions';
import { useEffect, useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import {
  clearCurrentAdminUser,
  setQueryParam,
  setCurrentAdminUser,
} from '@src/redux/slices/teamSlice';
import {
  Typography,
  Button,
  TextField,
  Table,
  LoadingSpinner,
  DetailDrawer,
  AdminUserForm,
} from '@src/components';
import { hasPermission } from '@src/redux/actions/authActions';
import permissions from '@src/helpers/constants/permissions';

const Teams = () => {
  const dispatch = useAppDispatch();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const { users, loading, count, queryParams } = useAppSelector((state) => state.team);

  const { roles } = useAppSelector((state) => state.roles);

  useEffect(() => {
    dispatch(GetAdminUsers());
    dispatch(GetRoles());

    //eslint-disable-next-line
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAdminUserSearch = useCallback(
    debounce(() => dispatch(GetAdminUsers()), 400),
    []
  );

  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
    dispatch(clearCurrentAdminUser());
  };

  const { Panel } = Collapse;

  const displayInfo = (val: IAdminUser) => {
    return (
      <div className='subscriber'>
        <div className='subscriber d-flex align-items-center'>
          <img
            src={val.avatar || assets.UserAvatarIcon.src}
            alt={'Avatar'}
            width='40'
            height='40'
          />
          <h4 className='ml-2 mb-0'>{`${capitalizeFirstLetter(
            val.firstName
          )} ${capitalizeFirstLetter(val.lastName)}`}</h4>
        </div>
      </div>
    );
  };

  const columns: ColumnsType<IAdminUser> = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, val) => {
        return text ? displayInfo(val) : <div className='text-center'>NA</div>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (text) => roles.find((role) => role.id === text)?.name,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <span>{moment(text).format('MMM DD, YYYY')}</span>,
    },
    {
      title: 'Status',
      key: 'isEnabled',
      dataIndex: 'isEnabled',
      render: (text) => determineUserStatus(text),
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

  if (!roles.length) return <LoadingSpinner />;

  return (
    <div className='teams-container'>
      <div className='teams-create-header'>
        <div className='d-flex mb-1 justify-content-between'>
          <Typography variant='body5'>All Teams</Typography>
          <Button label='Add New User' onClick={() => setIsOpenDrawer(true)} />
        </div>
        <Row gutter={[40, 20]}>
          <Col xs={24} md={13} xl={15}>
            <TextField
              className='role-name-field'
              name='searchFiled'
              searchField
              placeholder='Search'
              onChange={(e) => {
                dispatch(
                  setQueryParam({
                    param: 'searchFilter',
                    value: e.target.value,
                  })
                );
                handleAdminUserSearch();
              }}
              value={queryParams.searchFilter}
              required={false}
            />
          </Col>
          <Col xs={24} md={11} xl={9} className='d-flex justify-content-end'></Col>
        </Row>
      </div>
      <div className='mt-2'>
        <InfiniteScroll
          dataLength={users?.length || 0}
          next={() => {
            dispatch(GetAdminUsers());
          }}
          hasMore={users?.length ? count > users.length : false}
          loader={<LoadingSpinner isLoadingMore />}
          scrollableTarget='scrollableDiv'>
          <div className='data-table'>
            <Table
              onRowClick={(record: IAdminUser) => {
                if (hasPermission(permissions.viewUser)) {
                  dispatch(setCurrentAdminUser(record));
                  setIsOpenDrawer(true);
                }
              }}
              loading={loading}
              columns={columns}
              dataSource={users ? users : []}
              tableClassName='table-data'
            />
          </div>
          <div className='data-accordion-container mt-1'>
            {users?.map((user: IAdminUser, key: number) => {
              const bodyInfo = [
                {
                  label: 'Status',
                  value: determineUserStatus(user.isEnabled),
                },
                {
                  label: 'Email',
                  value: user.email,
                },
              ];
              return (
                <Collapse
                  bordered={false}
                  expandIconPosition='end'
                  expandIcon={({ isActive }) => (
                    <div>
                      <CaretDownOutlined rotate={isActive ? 180 : 0} />
                    </div>
                  )}
                  className=''
                  key={key}>
                  <Panel
                    header={
                      <Row className='w-100 pr-1'>
                        <Col xs={12} className='pr-2'>
                          <Typography variant='body8'>Name</Typography>{' '}
                          <Typography variant='body7'>
                            {`${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(
                              user.lastName
                            )}`}
                          </Typography>
                        </Col>
                        <Col xs={10}>
                          <Typography variant='body8'>Role</Typography>{' '}
                          <Typography variant='body7' className='word-break'>
                            {roles.find((role) => role.id === user.roleId)?.name}
                          </Typography>
                        </Col>

                        <Col xs={2} className='my-auto'>
                          <img
                            src={assets.EyeOpen.src}
                            alt={'Eye'}
                            height='20'
                            width='20'
                            onClick={() => {
                              if (hasPermission(permissions.viewUser)) {
                                dispatch(setCurrentAdminUser(user));
                                setIsOpenDrawer(true);
                              }
                            }}
                          />
                        </Col>
                      </Row>
                    }
                    key={key}
                    className='wallet-accordion-panel'>
                    <div className='pr-4'>
                      {bodyInfo.map((info, key) => (
                        <div
                          className='d-flex justify-content-between align-items-center'
                          key={key}>
                          <Typography variant='body8'>{info.label}</Typography>
                          <Typography variant='body6'>{info.value}</Typography>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </Collapse>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
      <DetailDrawer
        visible={isOpenDrawer}
        width={480}
        smWidth='85%'
        handleClose={handleDrawerClose}>
        <AdminUserForm {...{ handleDrawerClose }} />
      </DetailDrawer>
    </div>
  );
};

export default Teams;
