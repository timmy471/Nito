import { Row, Col, Collapse } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/redux/store';
import { formatCurrency, formatDate } from '@src/helpers';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IGeneralLPTable, ILPInitialState } from 'types';
import { Typography, Table as CustomTable, LoadingSpinner } from '@src/components';
import { GetLpList, GetLPDetail } from '@src/redux/actions/lpActions';
import { isEmpty } from 'lodash';
import { assets } from '@src/assets';
import { hasPermission } from '@src/redux/actions/authActions';
import permissions from '@src/helpers/constants/permissions';

export const GeneralLPTable: React.FC<IGeneralLPTable> = ({ columns, showDetail, isMini }) => {
  const { Panel } = Collapse;
  const dispatch = useDispatch<AppDispatch>();
  const { lp, loading }: ILPInitialState = useSelector((state: RootState) => state.lp);

  const { lps, count } = lp;

  let lpsArr: Array<any> = [];
  if (Array.isArray(lps)) {
    lpsArr = [...lps];
  }

  if (loading && isEmpty(lpsArr)) {
    return <LoadingSpinner />;
  }

  return (
    <div className=''>
      <InfiniteScroll
        dataLength={lpsArr.length}
        next={() => {
          dispatch(GetLpList());
        }}
        hasMore={isMini ? false : count > lpsArr.length}
        loader={<LoadingSpinner isLoadingMore />}
        scrollableTarget='scrollableDiv'>
        <div className='data-table'>
          <CustomTable
            columns={columns}
            dataSource={lpsArr}
            loading={loading}
            onRowClick={(row: any) => {
              if (hasPermission(permissions.viewLimitedPartner)) {
                dispatch(GetLPDetail(row.id));
                showDetail(row);
              }
            }}
            tableClassName='table-data'
          />
        </div>

        <div className='data-accordion-container mt-1'>
          {lpsArr.map(
            ({
              id,
              email,
              firstName,
              lastName,
              lastInvestmentTime,
              lastInvestmentAmount,
              totalInvestmentAmount,
              mean,
            }: any) => {
              const bodyInfo = [
                { label: 'Last Investment', value: lastInvestmentAmount || 0 },
                { label: 'Mean', value: mean ? formatCurrency(mean) : 'NA' },
                {
                  label: 'Time',
                  value: lastInvestmentTime ? formatDate(lastInvestmentTime, true) : 'NA',
                },
                {
                  label: 'Total Amount',
                  value: totalInvestmentAmount ? formatCurrency(totalInvestmentAmount) : 'NA',
                },
                { label: 'Email', value: email },
              ];
              return (
                <Collapse
                  bordered={false}
                  expandIconPosition='end'
                  expandIcon={({ isActive }) => (
                    <CaretDownOutlined rotate={isActive ? 180 : 0} />
                  )}
                  className=''
                  key={id}>
                  <Panel
                    header={
                      <div className='w-100'>
                        <Row gutter={[10, 0]}>
                          <Col span={11}>
                            <Typography variant='body8'>Name</Typography>{' '}
                            <Typography variant='body7' className='wallet-detail'>
                              {firstName} {lastName}
                            </Typography>
                          </Col>
                          <Col span={9}>
                            <Typography variant='body8'>Last Investment</Typography>{' '}
                            <Typography variant='body7' className='wallet-detail'>
                              {lastInvestmentTime
                                ? formatDate(lastInvestmentTime, true)
                                : 'NA'}
                            </Typography>
                          </Col>
                          <Col
                            xs={2}
                            className='mtop-4'
                            key={id}
                            onClick={() => {
                              if (hasPermission(permissions.viewLimitedPartner)) {
                                dispatch(GetLPDetail(id));
                                showDetail(id);
                              }
                            }}>
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
                    key={id}
                    className='detail-accordion-panel'>
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
            }
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};
