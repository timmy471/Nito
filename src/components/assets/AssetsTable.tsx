import Image from 'next/image';
import { assets } from '@src/assets';
import { Row, Col, Collapse } from 'antd';
import { truncateWord } from '@src/helpers/utils';
import type { ColumnsType } from 'antd/lib/table';
import { CaretDownOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IAssetTableProps, ISPVAsset } from 'types';
import { Table, Typography, LoadingSpinner, Pill } from '@src/components';
import { capitalizeFirstLetter } from '@src/helpers';
import { useEffect } from 'react';
import { hasPermission } from '@src/redux/actions/authActions';
import permissions from '@src/helpers/constants/permissions';

export const AssetsTable: React.FC<IAssetTableProps> = ({
  data,
  loading,
  hasMore,
  getData,
  showDetail,
  getAssetIndustry,
}) => {
  const { Panel } = Collapse;

  useEffect(() => {}, [data]); //To reflect current status after update

  const displayInfo = (text: string, val: ISPVAsset) => {
    return (
      <div className='asset-name-container'>
        <img src={val.logo} alt={''} width='40' height='40' />
        <Typography variant='body5'>{capitalizeFirstLetter(text)}</Typography>
      </div>
    );
  };

  const determineAssetStatus = (text: string, onClick?: () => void) => {
    return (
      <Pill
        label={capitalizeFirstLetter(text)}
        onClick={() => onClick?.()}
        className={`asset-status-pill asset-status-pill__${text.toLowerCase()}`}
      />
    );
  };

  const columns: ColumnsType<ISPVAsset> = [
    {
      title: "Company's Name",
      dataIndex: 'name',
      key: 'name',
      render: (text, val) => displayInfo(text, val),
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
      render: (text) => <span>{getAssetIndustry(text)}</span>,
    },
    // {
    //   title: 'Current Valuation',
    //   dataIndex: 'valuation',
    //   key: 'valuation',
    //   render: (text) => <span>{formatCurrency(text)}</span>,
    // },
    {
      title: 'Website',
      key: 'website',
      dataIndex: 'website',
      render: (text) => <span>{text ? truncateWord(text, 25) : 'NA'}</span>,
    },
    {
      title: 'Founded',
      key: 'founded',
      dataIndex: 'founded',
      // render: (text) => <span>{formatDate(text, true)}</span>,
    },
    // {
    //   title: 'Total Deals',
    //   key: '_count',
    //   dataIndex: '_count',
    //   render: (text) => <span>{formatNumber(text.investments)}</span>,
    // },
    // {
    //   title: 'Status',
    //   key: 'status',
    //   dataIndex: 'status',
    //   render: (text) => determineAssetStatus(text),
    // },
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

  let newData = [];
  if (Array.isArray(data)) {
    newData = [...data];
  }

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={() => getData()}
        hasMore={hasMore}
        loader={<LoadingSpinner isLoadingMore />}
        scrollableTarget='scrollableDiv'>
        <div className='assets-table slide-in-bottom'>
          <Table
            columns={columns}
            dataSource={data}
            onRowClick={(record: any) => {
              if (hasPermission(permissions.viewAsset)) showDetail(record);
            }}
            loading={loading}
          />
        </div>

        <div className='asset-accordion-container mt-1'>
          {data?.length ? (
            data.map(({ name, status, industry, website, founded }: any, key: number) => {
              const bodyInfo = [
                // { label: 'Industry', value: getAssetIndustry(industry) },
                { label: 'Website', value: website ? truncateWord(website, 20) : 'NA' },
                { label: 'Founded', value: founded },
              ];
              return (
                <Collapse
                  bordered={false}
                  expandIconPosition='end'
                  expandIcon={({ isActive }) => (
                    <CaretDownOutlined rotate={isActive ? 180 : 0} />
                  )}
                  className=''
                  key={key}>
                  <Panel
                    header={
                      <Row className='w-100 d-flex justify-content-between pr-1'>
                        <Col xs={13}>
                          <Typography variant='body8'>Company Name</Typography>{' '}
                          <Typography variant='body7' className='asset-detail'>
                            {capitalizeFirstLetter(name)}
                          </Typography>
                        </Col>
                        <Col xs={7}>
                          <Typography variant='body8'>Industry</Typography>{' '}
                          {getAssetIndustry(industry)}
                        </Col>
                        <Col
                          xs={2}
                          className='mtop-4'
                          key={key}
                          onClick={() => {
                            if (hasPermission(permissions.viewAsset)) showDetail(data[key]);
                          }}>
                          <img
                            src={assets.OpenEyeIcon.src}
                            alt={assets.OpenEyeIcon.alt}
                            height='10'
                            width='20'
                          />
                        </Col>
                      </Row>
                    }
                    key={key}
                    className='asset-accordion-panel'>
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
            })
          ) : (
            <div className='mt-4 mx-auto text-center'>
              <Image
                src={assets.emptyStateImg.src}
                alt={'No Investments'}
                width='90'
                height={'90'}
              />
              <Typography variant='body3' className='mt-1'>
                No Results to display
              </Typography>
            </div>
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};
