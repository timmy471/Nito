import {
  Typography,
  MobileFilter,
  Pill,
  TextField,
  Button as CustomButton,
  Table,
  LoadingSpinner,
} from '@src/components';
import axios from 'axios';
import moment from 'moment';
import Router from 'next/router';
import { assets } from '@src/assets';
import type { NextPage } from 'next';
import type { MenuProps } from 'antd';
import { debounce } from 'lodash';
import { IFund } from 'types';
import { API } from '@src/redux/constants';
import type { ColumnsType } from 'antd/lib/table';
import { useState, useEffect, useCallback } from 'react';
import { dateMenuOptions } from '@src/helpers/constants';
import { GetSPVs } from '@src/redux/actions/spvsActions';
import { setQueryParam } from '@src/redux/slices/spvSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Col, Button, Dropdown, Space, Menu, Collapse } from 'antd';
import { isServerSideAuthenticated, serverSideLogOut } from '@src/services';
import { determineFundStatus, truncateWord, determineStage } from '@src/helpers/utils';
import {
  formatCamelCaseWord,
  formatNumber,
  capitalizeFirstLetter,
  formatCurrency,
} from '@src/helpers';

interface IProps {
  statistics: {
    totalFunds: number;
    raisingSpvs: number;
    spvClosing: number;
    spvWired: number;
  };
}

const SPVs: NextPage<IProps> = ({ statistics }) => {
  const { Panel } = Collapse;
  const [isOpenMobileFilter, setisOpenMobileFilter] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string | number | undefined>(undefined);

  const { totalFunds, raisingSpvs, spvClosing, spvWired } = statistics || {};

  const dispatch = useAppDispatch();

  const { spvs, count, loading, queryParams } = useAppSelector((state) => state.spvs);

  useEffect(() => {
    dispatch(GetSPVs());
    //eslint-disable-next-line
  }, []);

  const handleMenuClick: MenuProps['onClick'] = () => {
    console.log('click');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSPVSearch = useCallback(
    debounce(() => dispatch(GetSPVs()), 400),
    []
  );

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: '1st menu item',
          key: '1',
          icon: <UserOutlined />,
        },
        {
          label: '2nd menu item',
          key: '2',
          icon: <UserOutlined />,
        },
        {
          label: '3rd menu item',
          key: '3',
          icon: <UserOutlined />,
        },
      ]}
    />
  );
  const displayInfo = (text: string, val: IFund) => {
    const hasAsset = val.assets?.length && val.assets[0];
    return (
      <div className='company'>
        <div className='d-flex align-items-center'>
          <img
            src={hasAsset ? val?.assets[0]?.logo : assets.emptyStateImg.src}
            alt={'Logo'}
            width='45'
            height='45'
          />
          <h4 className='mtop-2'>{capitalizeFirstLetter(text)}</h4>
        </div>
        <div className='mtop-2'>
          {hasAsset && val?.assets[0]?.website && (
            <a href={`${val?.assets[0]?.website}`} target='__blank' rel='noopener'>
              Website
            </a>
          )}
        </div>
      </div>
    );
  };

  const columns: ColumnsType<IFund> = [
    {
      title: 'SPV Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, val) => {
        return text ? displayInfo(text, val) : <div className='text-center'>NA</div>;
      },
    },
    {
      title: 'Stage',
      dataIndex: 'investmentTermsData',
      key: 'investmentTermsData',
      render: (text) =>
        text?.round ? <span className='stage-pill'>{determineStage(text?.round)}</span> : 'NA',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <span>{moment(text).format('MMM Do')}</span>,
    },
    {
      title: '$ Raised',
      key: 'wallet',
      dataIndex: 'wallet',
      render: (text) => {
        return (
          <span>${text?.availableBalance ? formatNumber(text.availableBalance) : '0'}</span>
        );
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text) => determineFundStatus(text),
    },
    {
      title: 'Allocation',
      key: 'allocation',
      dataIndex: 'allocation',
      render: (text) => (text ? <span>${formatNumber(text)}</span> : 'NA'),
    },
    {
      title: 'Fund Manager',
      key: 'user',
      dataIndex: 'user',
      render: (text) => (
        <span>{`${capitalizeFirstLetter(text.firstName)} ${capitalizeFirstLetter(
          text.lastName
        )}`}</span>
      ),
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
    <div className='spvs'>
      <Row className='mt-1'>
        <Col xs={0} sm={0} md={0} lg={20} xl={20}></Col>
        <Col xs={8} sm={8} md={4} lg={4} xl={4}>
          {/* <Link href={'/fundmanager/dashboard/new-spv'} passHref>
              <CustomButton label='New SPV' fullWidth />
          </Link> */}
        </Col>
      </Row>

      <div className='metrics'>
        <Row>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} className='item'>
            <Typography component='span'>Total SPVs</Typography>
            <Typography component='h1'>{totalFunds || 0}</Typography>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} className='item'>
            <Typography component='span'>SPVs currently Raising</Typography>
            <Typography component='h1'>{raisingSpvs || 0}</Typography>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} className='item'>
            <Typography component='span'>SPVs currently Closing</Typography>
            <Typography component='h1'>{spvClosing || 0}</Typography>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} className='item'>
            <Typography component='span'>SPVs Wired</Typography>
            <Typography component='h1'>{spvWired || 0}</Typography>
          </Col>
        </Row>
      </div>

      <div className='search-container mt-2'>
        <Typography component='p'>All SPVs ({totalFunds})</Typography>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={8} lg={9} xl={9}>
            <TextField
              placeholder='Search SPVs'
              name='search'
              required={false}
              searchField
              onChange={(e) => {
                dispatch(
                  setQueryParam({
                    param: 'searchFilter',
                    value: e.target.value,
                  })
                );

                handleSPVSearch();
              }}
              value={queryParams.searchFilter}
            />
          </Col>
          <Col xs={0} sm={0} md={0} lg={4} xl={5}></Col>
          {/* <Col xs={24} sm={24} md={12} lg={0} xl={0} className='text-right mt-2'>
            <Typography component='span'>Filter by:</Typography>
            <img
              src={assets.FilterHarmBurger.src}
              alt={assets.FilterHarmBurger.alt}
              width='20'
              height={'20'}
              className='ml-2'
              onClick={() => setisOpenMobileFilter(!isOpenMobileFilter)}
            />
          </Col> */}
          {/* <Col xs={0} sm={0} md={0} lg={0} xl={2} className='my-auto'>
            <Typography component='span'>Filter by:</Typography>
          </Col>
          <Col xs={0} sm={0} md={0} lg={5} xl={4}>
            <Dropdown overlay={menu}>
              <Button className='fm-dropdown'>
                <Space>
                  All Target
                  <span className='mleft-3'>
                    <CaretDownOutlined />
                  </span>
                </Space>
              </Button>
            </Dropdown>
          </Col>
          <Col xs={0} sm={0} md={0} lg={5} xl={4}>
            <Dropdown overlay={menu}>
              <Button className='fm-dropdown'>
                <Space>
                  All Stage
                  <span className='mleft-3'>
                    <CaretDownOutlined />
                  </span>
                </Space>
              </Button>
            </Dropdown>
          </Col> */}
        </Row>
      </div>
      <InfiniteScroll
        dataLength={spvs?.length || 0}
        next={() => {
          dispatch(GetSPVs());
        }}
        hasMore={spvs?.length ? count > spvs.length : false}
        loader={<LoadingSpinner isLoadingMore />}
        scrollableTarget='scrollableDiv'>
        <div className='table slide-in-bottom'>
          <Table
            onRowClick={(record: IFund) => {
              Router.push(`/spvs/${record.id}`);
            }}
            loading={loading}
            columns={columns}
            dataSource={spvs ? spvs : []}
            tableClassName='table-data'
          />
        </div>
        <div className='accordion-container mt-1'>
          {spvs?.map((fund: IFund, key: number) => {
            const hasAsset = fund.assets?.length && fund.assets[0];
            const bodyInfo = [
              { label: 'Company', value: hasAsset ? fund.assets[0]?.name : 'NA' },
              {
                label: 'Stage',
                value: fund?.investmentTermsData?.round
                  ? determineStage(fund?.investmentTermsData?.round)
                  : 'NA',
              },
              {
                label: 'Allocation',
                value: `${formatCurrency(fund.allocation)}` || 'NA',
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
                        <Typography variant='body8'>SPV Name</Typography>{' '}
                        <Typography variant='body7'>{fund?.name || 'NA'}</Typography>
                      </Col>
                      <Col xs={10}>
                        <Typography variant='body8'>Raised</Typography>{' '}
                        <Typography variant='body7'>
                          {formatCurrency(fund.wallet?.availableBalance) || '$0'}
                        </Typography>
                      </Col>

                      <Col xs={2} className='my-auto'>
                        <img
                          src={assets.EyeOpen.src}
                          alt={'Eye'}
                          height='20'
                          width='20'
                          onClick={() => Router.push(`/spvs/${fund.id}`)}
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

      <MobileFilter
        visible={isOpenMobileFilter}
        handleClose={() => setisOpenMobileFilter(!isOpenMobileFilter)}>
        <div className='p-4 mobile-filter-accordion'>
          <div className='d-flex justify-content-between'>
            <Typography component='h5'>Filter</Typography>
          </div>
          <div className='mt-2'>
            <Collapse
              bordered={false}
              expandIconPosition='end'
              expandIcon={(info: any) => (
                <CaretDownOutlined
                  style={{ color: '#bfbfbf' }}
                  onClick={() =>
                    activeKey === info.panelKey
                      ? setActiveKey(undefined)
                      : setActiveKey(info.panelKey)
                  }
                />
              )}
              activeKey={activeKey}>
              <Panel
                header={<Typography variant='body6'>All Providers</Typography>}
                key={1}
                className='filter-panel'></Panel>
              <Panel
                header={<Typography variant='body6'>All Status</Typography>}
                key={2}
                className='filter-panel'></Panel>
              <Panel
                header={<Typography variant='body6'>All Dates</Typography>}
                key={3}
                className='filter-panel'>
                <div className='d-flex' style={{ flexWrap: 'wrap' }}>
                  {/* {dateMenuOptions.map((option, key) => (
                    <Pill
                      label={option}
                      key={key}
                      onClick={() => setFilterParams({ ...filterParams, date: option })}
                      selected={filterParams.date === option}
                    />
                  ))} */}
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
      </MobileFilter>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { access_token, isAuth } = isServerSideAuthenticated(context);
  if (!isAuth) return serverSideLogOut(context);

  try {
    const { data } = await axios.get(`${API}/funds/stats`, {
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

export default SPVs;
