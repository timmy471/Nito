import Link from 'next/link';
import { debounce } from 'lodash';
import type { NextPage } from 'next';
import { Row, Col, Collapse } from 'antd';
import { userProtectedRoutes } from '@src/services';
import { CaretDownOutlined } from '@ant-design/icons';
import { useState, useEffect, useCallback } from 'react';
import { ISelectFieldOptions, ISPVAsset } from 'types';
import { GetAssets } from '@src/redux/actions/assetActions';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { HandleAssetPublish } from '@src/redux/actions/assetActions';
import { assetStatusOptions, industryOptions } from '@src/helpers/constants';
import { setQueryParam, resetAssetState, setCurrentAsset } from '@src/redux/slices/assetSlice';
import {
  Typography,
  MobileFilter,
  SelectField,
  TextField,
  Button,
  AssetsTable,
  DetailDrawer,
  AssetDetail,
  LoadingSpinner,
  Pill,
  AssetModal,
  AssetForm,
} from '@src/components';
import { hasPermission } from '@src/redux/actions/authActions';
import permissions from '@src/helpers/constants/permissions';

const Assets: NextPage = () => {
  const { Panel } = Collapse;
  const dispatch = useAppDispatch();

  const { assets, count, queryParams, loading, publishAsset, currentAsset } = useAppSelector(
    (state) => state.asset
  );

  useEffect(() => {
    dispatch(GetAssets());

    return () => {
      dispatch(resetAssetState());
    };
    //eslint-disable-next-line
  }, [queryParams.status]);

  const [activeKey, setActiveKey] = useState<string | number | undefined>(undefined);
  const [isOpenMobileFilter, setisOpenMobileFilter] = useState<boolean>(false);
  // const [currentAsset, setCurrentAsset] = useState<IAssetsDataType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isNewAssetDrawerOpen, setIsNewAssetDrawerOpen] = useState<boolean>(false);

  const handleMobileFilterClick = () => setisOpenMobileFilter(!isOpenMobileFilter);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAssetSearch = useCallback(
    debounce(() => dispatch(GetAssets()), 400),
    []
  );

  const getAssetIndustry = (industryToFind: string) => {
    if (!industryToFind) return '';
    const existingIndustry = industryOptions.find(
      (industry: ISelectFieldOptions) =>
        industry.value?.toLowerCase() === industryToFind?.toLocaleLowerCase()
    );
    return existingIndustry?.label || '';
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const handlePublishConfirm = () => {
    // dispatch(
    //   HandleAssetPublish({
    //     assetId: currentAsset?.id,
    //     mode: currentAsset?.status === 'draft' ? 'publish' : 'unpublish',
    //     cb: onCancel,
    //   })
    // );
  };

  return (
    <div className='assets-container'>
      {loading && !assets ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='banner'>
            <div className='d-flex justify-content-between'>
              <Typography variant='body7' className='mt-1'>
                All Assets
              </Typography>
              {hasPermission(permissions.createAsset)}
              <Button label='Add New Asset' onClick={() => setIsNewAssetDrawerOpen(true)} />
            </div>

            <Row className='mt-1'>
              <Col xs={24} md={8}>
                <TextField
                  searchField
                  placeholder='Search'
                  name='searchFilter'
                  required={false}
                  onChange={(e) => {
                    dispatch(
                      setQueryParam({
                        param: 'searchFilter',
                        value: e.target.value,
                      })
                    );
                    handleAssetSearch();
                  }}
                  value={queryParams.searchFilter}
                />
              </Col>
              <Col xs={24} md={16}>
                <div className='filter-params-container'>
                  <div className='d-flex filter-params justify-content-end'>
                    <Typography className='mt-1 mr-4 desktop-filter-cta'>
                      Filter By:
                    </Typography>
                    <SelectField
                      placeholder='All Status'
                      required={false}
                      options={[
                        { label: 'All', value: '' },
                        ...assetStatusOptions.map(({ label, value }: ISelectFieldOptions) => ({
                          label,
                          value,
                        })),
                      ]}
                      value={queryParams.status}
                      onChange={(val) =>
                        dispatch(setQueryParam({ param: 'status', value: val }))
                      }
                      className='ml-4 mtop-2'
                    />
                    {/* <SelectField
                      placeholder='All With Deals'
                      required={false}
                      options={[]}
                      onChange={() => {}}
                      className='ml-4 mtop-2'
                    /> */}
                  </div>
                  <div
                    className='mobile-filter-cta cursor-pointer'
                    onClick={handleMobileFilterClick}>
                    <Typography className='mt-1'>Filter By</Typography>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <MobileFilter visible={isOpenMobileFilter} handleClose={handleMobileFilterClick}>
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
                    header={<Typography variant='body6'>All Status</Typography>}
                    key={1}
                    className='wallet-filter-panel'>
                    <div className='d-flex'>
                      {assetStatusOptions.map((option: ISelectFieldOptions, key) => (
                        <div className='mr-2' key={key}>
                          <Pill
                            label={option.label}
                            onClick={() =>
                              dispatch(
                                setQueryParam({
                                  param: 'status',
                                  value: option.value,
                                })
                              )
                            }
                            className={`asset-status-pill asset-status-pill__${option.value.toLowerCase()}`}
                          />
                        </div>
                      ))}
                    </div>
                  </Panel>
                  {/* <Panel
                    header={<Typography variant='body6'>All With Deals</Typography>}
                    key={2}
                    className='wallet-filter-panel'></Panel> */}
                </Collapse>
              </div>
            </div>
          </MobileFilter>

          <div className='mt-2'>
            <AssetsTable
              showDetail={(val: ISPVAsset) => dispatch(setCurrentAsset(val))}
              data={assets || []}
              loading={loading}
              getData={() => dispatch(GetAssets())}
              hasMore={assets ? count > assets?.length : false}
              getAssetIndustry={getAssetIndustry}
            />
          </div>

          <DetailDrawer
            visible={isNewAssetDrawerOpen}
            width={580}
            smWidth='85%'
            className='new-asset-drawer'
            handleClose={() => setIsNewAssetDrawerOpen(false)}>
            <>
              <Typography component='h5'>New Company Setup</Typography>
              <div className='mt-2'>
                <AssetForm handleClose={() => setIsNewAssetDrawerOpen(false)} />
              </div>
            </>
          </DetailDrawer>

          <DetailDrawer
            visible={!!currentAsset}
            width={680}
            handleClose={() => dispatch(setCurrentAsset(null))}>
            <AssetDetail
              asset={currentAsset}
              getAssetIndustry={getAssetIndustry}
              handleOpenModal={() => setIsModalVisible(!isModalVisible)}
            />
          </DetailDrawer>
          <AssetModal
            {...{
              isModalVisible,
              onCancel,
              loading: publishAsset.loading,
              handlePublishConfirm,
            }}
          />
        </>
      )}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  return userProtectedRoutes(context);
}

export default Assets;
