import { useCallback } from 'react';
import { debounce } from 'lodash';

import { Row, Col, Space, Dropdown, Button, Menu } from 'antd';
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import { Typography, Button as CustomButton, TextField } from '@src/components';
import { GetFundManagersList } from '@src/redux/actions/fundManagerActions';

import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { setQueryParam } from '@src/redux/slices/fundManagerSlice';

interface IProps {
  statistics: {
    totalFundManagers: number;
    totalFundManagersPendingReview: number;
    totalSyndicates: number;
  };
}

export const FMInfo = ({ statistics }: IProps) => {
  const dispatch = useAppDispatch();

  const { queryParams } = useAppSelector((state) => state.fundmanager);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFMSearch = useCallback(
    debounce(() => dispatch(GetFundManagersList()), 400),
    []
  );

  const menu = (
    <Menu
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
  return (
    <div>
      <div className='metrics'>
        <Row>
          <Col xs={12} sm={12} md={7} lg={7} xl={5} className='item'>
            <Typography component='span'>Total Fund Managers</Typography>
            <Typography component='h1'>{statistics?.totalFundManagers || '0'}</Typography>
          </Col>
          <Col xs={12} sm={12} md={5} lg={5} xl={5} className='item'>
            <Typography component='span'>FM Pending Review</Typography>
            <Typography component='h1'>
              {statistics?.totalFundManagersPendingReview || '0'}
            </Typography>
          </Col>
          <Col xs={12} sm={12} md={5} lg={5} xl={5} className='item'>
            <Typography component='span'>Syndicates</Typography>
            <Typography component='h1'>{statistics?.totalSyndicates || '0'}</Typography>
          </Col>
        </Row>
      </div>

      <div className='search-container'>
        <div className='top-row'>
          <Typography component='p'>All Fund Managers</Typography>
          {/* <CustomButton label='Filters' variant='secondary' /> */}
        </div>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={12} lg={9} xl={9}>
            <TextField
              placeholder='Search'
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
                handleFMSearch();
              }}
              value={queryParams.searchFilter}
            />
          </Col>
          {/* <Col xs={0} sm={0} md={0} lg={7} xl={7}></Col>
          <Col xs={0} sm={0} md={0} lg={0} xl={4} className='my-auto'>
            <Typography component='span'>Display List:</Typography>
          </Col>
          <Col xs={0} sm={0} md={0} lg={5} xl={4}>
            <Dropdown overlay={menu}>
              <Button className='fm-dropdown'>
                <Space>
                  All LPs
                  <span className='mleft-3'>
                    <CaretDownOutlined />
                  </span>
                </Space>
              </Button>
            </Dropdown>
          </Col> */}
        </Row>
      </div>
    </div>
  );
};
