import {
  GetFundManagersDetail,
  GetFundManagersList,
} from '@src/redux/actions/fundManagerActions';
import { isEmpty } from 'lodash';
import { assets } from '@src/assets';
import { useEffect } from 'react';
import { Row, Col, Collapse } from 'antd';
import { RootState } from '@src/redux/store';
import { AppDispatch } from '@src/redux/store';
import { CaretDownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { hasPermission } from '@src/redux/actions/authActions';
import permissions from '@src/helpers/constants/permissions';
import { IFMTable, IFundManagerSliceState, IFundManager } from 'types';
import { Typography, Table as CustomTable, LoadingSpinner } from '@src/components';
import { ClearFundManagersList } from '@src/redux/actions/fundManagerActions';

export const FMTable: React.FC<IFMTable> = ({ columns, showDetail, isMini }) => {
  const { Panel } = Collapse;
  const dispatch = useDispatch<AppDispatch>();
  const { fundmanager, selectedFundManager, loading }: IFundManagerSliceState = useSelector(
    (state: RootState) => state.fundmanager
  );

  const { fundmanagers, count } = fundmanager;

  useEffect(() => {
    return () => {
      dispatch(ClearFundManagersList());
    };

    //eslint-disable-next-line
  }, [fundmanagers]);

  let fundmanagersArr: Array<IFundManager> = [];
  if (Array.isArray(fundmanagers)) {
    fundmanagersArr = [...fundmanagers];
  }

  if (loading && isEmpty(fundmanagersArr)) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className=''>
        <InfiniteScroll
          dataLength={fundmanagersArr.length}
          next={() => {
            dispatch(GetFundManagersList());
          }}
          hasMore={isMini ? false : count > fundmanagersArr.length}
          loader={<LoadingSpinner isLoadingMore />}
          scrollableTarget='scrollableDiv'>
          <div className='data-table'>
            <CustomTable
              columns={columns}
              loading={loading}
              dataSource={fundmanagersArr}
              onRowClick={(row: any) => {
                if (hasPermission(permissions.viewFundManager)) {
                  dispatch(GetFundManagersDetail(row.id));
                  showDetail(selectedFundManager.data);
                }
              }}
              tableClassName='table-data'
            />
          </div>

          <div className='data-accordion-container mt-1'>
            {fundmanagersArr.map(
              ({ id, name, createdAt, email, kycStatus, avatar }: IFundManager) => {
                const bodyInfo = [
                  { label: 'Joined', value: createdAt },
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
                                {name}
                              </Typography>
                            </Col>

                            <Col span={11}>
                              <Typography variant='body8'>Status</Typography>{' '}
                              <Typography variant='body7' className='wallet-detail'>
                                {kycStatus}
                              </Typography>
                            </Col>
                            <Col
                              xs={2}
                              className='mtop-4'
                              key={id}
                              onClick={() => {
                                if (hasPermission(permissions.viewFundManager)) {
                                  dispatch(GetFundManagersDetail(id));
                                  showDetail(selectedFundManager.data);
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
    </div>
  );
};
