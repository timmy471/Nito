import {
  Button as CustomButton,
  Typography,
  TextField,
  Table as CustomTable,
  LoadingSpinner,
} from '@src/components';
import Image from 'next/image';
import { assets } from '@src/assets';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ILP, ILPTable, ILPTAbleDataType } from 'types';
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Row, Col, Button, Collapse, Dropdown, Menu, Space } from 'antd';
import { useAppSelector } from '@src/hooks/redux';
import { capitalizeFirstLetter, formatCurrency, formatDate } from '@src/helpers';
import { determineInvestmentStatus } from '@src/helpers/utils';

export const LPTable: React.FC<ILPTable> = ({
  handleMenuClick,
  handleInvestmentClick,
  getData,
  getSyndicateCarry,
  columns,
}) => {
  const { Panel } = Collapse;
  const { lpsData } = useAppSelector((state) => state.spvs);
  const { loading, lps, count } = lpsData;

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

  const emptyState = () => (
    <div className='empty-lp-data'>
      <Image src={assets.emptyStateImg.src} alt={'No LPs'} width='90' height={'90'} />
      <Typography component='h5'>There are currently no LPs </Typography>
    </div>
  );

  let locale = {
    emptyText: emptyState(),
  };

  return (
    <InfiniteScroll
      dataLength={lps?.length ? lps?.length : 0}
      next={() => {
        getData();
      }}
      hasMore={lps ? count > lps?.length : false}
      loader={<LoadingSpinner isLoadingMore />}
      scrollableTarget='scrollableDiv'>
      <div className='fund-table'>
        <CustomTable
          columns={columns}
          locale={locale}
          dataSource={lps?.length ? lps : []}
          onRowClick={(record: ILP) => handleInvestmentClick(record.id)}
          tableClassName='table-data'
        />
      </div>

      <div className='spv-details-accordion-container mt-1'>
        {!lps?.length && !loading
          ? emptyState()
          : lps?.map(({ user, amount, status, createdAt, id }: ILPTAbleDataType, key) => {
              const bodyInfo = [
                { label: 'Date', value: createdAt ? formatDate(createdAt, true) : 'NA' },
                { label: 'Status', value: determineInvestmentStatus(status) },
                { label: 'Syndicate Carry', value: getSyndicateCarry(amount) },
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
                      <div className='w-100'>
                        <Row gutter={[10, 0]}>
                          <Col span={12}>
                            <Typography variant='body8'>Subscriber</Typography>{' '}
                            <Typography variant='body7' className='wallet-detail'>
                              {`${capitalizeFirstLetter(
                                user.firstName
                              )} ${capitalizeFirstLetter(user.lastName)}`}
                            </Typography>
                          </Col>
                          <Col span={10}>
                            <Typography variant='body8'>Amount</Typography>{' '}
                            <Typography variant='body7' className='wallet-detail'>
                              {formatCurrency(amount)}
                            </Typography>
                          </Col>
                          <Col span={2} className='mtop-3'>
                            <img
                              src={assets.OpenEyeIcon.src}
                              alt={assets.OpenEyeIcon.alt}
                              height='10'
                              width='20'
                            />
                          </Col>
                        </Row>
                      </div>
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
  );
};
