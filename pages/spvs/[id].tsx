import axios from 'axios';
import { assets } from '@src/assets';
import { Row, Col, Tabs } from 'antd';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { API } from '@src/redux/constants';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { ILP, INewSPVData, ISPVTAbleDataType } from 'types';
import type { ColumnsType } from 'antd/lib/table';
import { isServerSideAuthenticated, serverSideLogOut } from '@src/services';
import { useState, useEffect, Fragment } from 'react';
import { determineInvestmentStatus } from '@src/helpers/utils';
import { fundStatuses } from '@src/helpers/constants';
import { resetLPsState, clearInvestmentDetail } from '@src/redux/slices/spvSlice';
import { Memo, Opportunity, Constitution, Legal } from '@src/components/spvs/SPVDetail/index';
import { capitalizeFirstLetter, formatCurrency, formatDate, formatNumber } from '@src/helpers';
import {
  BackCTA,
  FundDetailBanner,
  LPTable,
  LPDetail,
  DetailDrawer,
  Button,
} from '@src/components';
import {
  GetFundInvestments,
  ApproveFund,
  GetInvestmentDetail,
} from '@src/redux/actions/spvsActions';

interface IProps {
  fund: INewSPVData;
}
const SPVDetail: NextPage<IProps> = ({ fund }) => {
  const router = useRouter();

  const { id: fundId } = router.query;

  const [isOpenMobileFilter, setisOpenMobileFilter] = useState<boolean>(false);
  const [isFundForm, setIsFundForm] = useState(true);
  const [isInvestmentDetailVisible, setIsInvestmentDetailVisible] = useState<boolean>(false);
  const [isFundTable, setIsFundTable] = useState(false);
  const [fundInvestmentQueryParams, setFundInvestmentQueryParams] = useState({
    fundId,
    //would add more here when needed
  });

  const dispatch = useAppDispatch();
  const { lpsData, loading } = useAppSelector((state) => state.spvs);

  const getLPsData = () => dispatch(GetFundInvestments(fundInvestmentQueryParams));

  useEffect(() => {
    getLPsData();

    return () => {
      dispatch(resetLPsState());
    };
    //eslint-disable-next-line
  }, []);

  const showFundForm = () => {
    setIsFundForm(true);
    setIsFundTable(false);
  };

  const showFundTable = () => {
    setIsFundForm(false);
    setIsFundTable(true);
  };

  const handleMenuClick = () => {
    console.log('click');
  };

  const {
    status,
    waterfall,
    lifeCycle,
    commitment,
    opportunity,
    investmentTerms,
    dealOverview,
    feesAndExpenses,
    stakeholders,
    reporting,
  } = fund || {};

  const displayInfo = (text: any, val: any) => {
    return (
      <div className='subscriber d-flex'>
        <img
          src={val.user?.avatar || assets.UserAvatarIcon.src}
          alt={'Avatar'}
          className='mr-2 user-avatar'
        />
        <h4>{`${capitalizeFirstLetter(text.firstName)} ${capitalizeFirstLetter(
          text.lastName
        )}`}</h4>
      </div>
    );
  };

  const totalAmount = lpsData.lps?.length
    ? lpsData.lps
        ?.map(({ amount }) => (amount ? Number(amount) : 0))
        .reduce((curr, next) => curr + next)
    : 0;

  const getSyndicateCarry = (amount: number | string) => {
    if (!amount) return '$0';
    return formatCurrency(Number(fund?.waterfall.carriedInterest) * 0.01 * Number(amount));
  };

  const handleInvestmentClick = async (investmentId: string) => {
    setIsInvestmentDetailVisible(true);
    await dispatch(GetInvestmentDetail({ investmentId }));
  };

  const handleDetailClose = () => {
    setIsInvestmentDetailVisible(false);
    dispatch(clearInvestmentDetail());
  };

  const columns: ColumnsType<ISPVTAbleDataType> = [
    {
      title: (
        <b>
          {lpsData.count} LPs
          <br /> <span>LP Subscriber</span>
        </b>
      ),
      dataIndex: 'user',
      key: 'user',
      render: (text, val) => displayInfo(text, val),
    },
    {
      title: (
        <b>
          {formatCurrency(totalAmount)}
          <br /> <span>Amount</span>
        </b>
      ),
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <span>{formatCurrency(text)}</span>,
    },

    {
      title: (
        <b>
          <br /> <span>Status</span>
        </b>
      ),
      key: 'status',
      dataIndex: 'status',
      render: (text) => determineInvestmentStatus(text),
    },
    {
      title: (
        <b>
          <br /> <span>Commitment Date</span>
        </b>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, value) => <span>{formatDate(text, true)}</span>,
    },
    {
      title: (
        <b>
          <br /> <span>Syndicate Carry</span>
        </b>
      ),
      key: 'carry',
      dataIndex: 'amount',
      render: (text) => {
        return getSyndicateCarry(text);
      },
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
  const { TabPane } = Tabs;
  return (
    <div className='spv-details'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='back-cta'>
          <BackCTA />
        </div>
        {status === fundStatuses.inReview && (
          <Button
            label='Approve Fund'
            loading={loading}
            onClick={() => dispatch(ApproveFund(fundId || ''))}
          />
        )}
      </div>

      <Fragment>
        <FundDetailBanner fund={fund} />
      </Fragment>
      <Row className='fund-tab'>
        <Col xs={4} md={3} lg={1}>
          <p className={isFundForm ? `active` : ``} onClick={showFundForm}>
            Details
          </p>
        </Col>
        <Col xs={2} md={1} lg={1}>
          <p className={isFundTable ? `active` : ``} onClick={showFundTable}>
            LPs
          </p>
        </Col>
      </Row>
      {isFundForm && (
        <div className='fund-form slide-in-bottom'>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Memo' key='1'>
              <Memo {...{ dealOverview, waterfall, lifeCycle, commitment }} />
            </TabPane>
            <TabPane tab='Opportunity' key='2'>
              <Opportunity {...{ investmentTerms, opportunity }} />
            </TabPane>
            <TabPane tab='Constitution' key='3'>
              <Constitution
                {...{
                  waterfall,
                  feesAndExpenses,
                  lifeCycle,
                  commitment,
                  stakeholders,
                  reporting,
                }}
              />
            </TabPane>
            <TabPane tab='Legal Agreement' key='4'>
              <Legal documents={fund.documents} />
            </TabPane>
          </Tabs>
        </div>
      )}
      {isFundTable && (
        <Fragment>
          <LPTable
            columns={columns}
            getData={getLPsData}
            handleMenuClick={handleMenuClick}
            isOpenMobileFilter={isOpenMobileFilter}
            setisOpenMobileFilter={setisOpenMobileFilter}
            handleInvestmentClick={handleInvestmentClick}
            getSyndicateCarry={getSyndicateCarry}
          />
          <DetailDrawer
            visible={isInvestmentDetailVisible}
            width={680}
            handleClose={handleDetailClose}>
            <LPDetail handleDetailClose={handleDetailClose} />
          </DetailDrawer>
        </Fragment>
      )}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { access_token, isAuth } = isServerSideAuthenticated(context);
  if (!isAuth) return serverSideLogOut(context);

  const id = context.query.id;

  try {
    const { data } = await axios.get(`${API}/funds/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return {
      props: {
        fund: data.data.fund,
      },
    };
  } catch (error) {
    // console.log(error);
    return {
      redirect: {
        destination: '/spvs',
        permanent: false,
      },
      props: {},
    };
  }
}

export default SPVDetail;
