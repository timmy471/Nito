import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Row, Col } from 'antd';
import { formatNumber } from '@src/helpers';
import { IDashboardChartProps } from 'types';
import { Typography, SelectField } from '@src/components';

export const DashboardCharts: React.FC<IDashboardChartProps> = ({ fundManagerData }) => {
  const { fundManagersApprovedCount, fundManagersPendingApproval } = fundManagerData;

  const yearOptions = [
    {
      label: 'This Year',
      value: '2022',
    },
    {
      label: '2021',
      value: '2021',
    },
    {
      label: '2020',
      value: '2020',
    },
    {
      label: '2019',
      value: '2019',
    },
    {
      label: '2018',
      value: '2018',
    },
  ];

  const amountRaisedData = [
    {
      amount: 8000,
      month: 'Feb',
    },
    {
      amount: 10000,
      month: 'Mar',
    },
    {
      amount: 40000,
      month: 'Apr',
    },
    {
      amount: 20000,
      month: 'May',
    },
    {
      amount: 55000,
      month: 'Jun',
    },
    {
      amount: 35000,
      month: 'Jul',
    },
  ];

  const fundManagersData = [
    {
      label: 'Approved',
      value: fundManagersPendingApproval,
    },
    {
      label: 'Pending Approval',
      value: fundManagersApprovedCount,
    },
  ];

  const fundManagerColor = ['#A6EAFF', '#FF824D'];

  return (
    <Row gutter={[22, 40]}>
      <Col xs={24} xl={16}>
        <Row className='chart-card line-chart-container'>
          <Col xs={24} lg={8}>
            <Typography variant='body5'>Overview</Typography>
            <Typography className='mt-2' variant='body7' state='secondary'>
              Total Raised
            </Typography>
            <Typography component='h2'>$1.5M</Typography>
          </Col>
          <Col xs={24} lg={16}>
            <div className='d-flex justify-content-between align-items-center sub-container'>
              <Typography variant='body7' state='secondary'>
                Amount Raised Month on Month
              </Typography>
              <SelectField
                options={yearOptions.map(({ label, value }) => ({ label, value }))}
                onChange={() => {}}
                defaultValue='2022'
                required={false}
                className='date-select'
              />
            </div>
            <div className='line-chart'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart
                  data={amountRaisedData}
                  margin={{ top: 20, right: 14, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id='colorAmount' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='rgb(221,248,254)' stopOpacity={1} />
                      <stop offset='95%' stopColor='rgb(221,248,254)' stopOpacity={0.7} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey='month'
                    dy={19}
                    axisLine={false}
                    tickSize={0}
                    minTickGap={20}
                    style={{
                      fontSize: '12px',
                      fontFamily: 'Airbnb Cereal App',
                      color: '#9A9A9A',
                    }}
                  />
                  <YAxis
                    style={{
                      fontSize: '12px',
                      fontFamily: 'Airbnb Cereal App',
                      color: '#9A9A9A',
                    }}
                    axisLine={false}
                    tickSize={0}
                    dx={-10}
                  />
                  <Tooltip cursor={false} />
                  <CartesianGrid stroke='#eee' horizontal={false} />
                  <Area
                    type='monotone'
                    dataKey='amount'
                    stroke='#6EE3FF'
                    strokeWidth={2}
                    // fillOpacity={1}
                    fill='url(#colorAmount)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>
      </Col>

      <Col xs={24} xl={8}>
        <div className='chart-card p-3' style={{ minHeight: '10rem' }}>
          <>
            <Typography variant='body7' state='secondary' className='mb-0'>
              Fund Managers
            </Typography>
            <Row>
              <Col xs={0} sm={4} xl={0}></Col>
              <Col xs={16} sm={10} xl={16} className='pie-chart'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart width={500} height={500}>
                    <Pie
                      data={fundManagersData.map((entry) => ({
                        value: entry.value,
                      }))}
                      dataKey='value'
                      cx='50%'
                      cy='50%'
                      innerRadius={55}
                      outerRadius={95}
                      stroke=''>
                      {fundManagersData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={fundManagerColor[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Col>

              <Col xs={8} sm={6} xl={8} className='color-indicators'>
                <div className='d-flex'>
                  <div className='approved'></div>
                  <div>
                    <Typography state='secondary' variant='body10'>
                      Approved
                    </Typography>
                    <Typography component='h4'>
                      {formatNumber(fundManagersPendingApproval)}
                    </Typography>
                  </div>
                </div>
                <div className='d-flex mtop-2'>
                  <div className='pending'></div>
                  <div>
                    <Typography state='secondary' variant='body10'>
                      Pending Approval
                    </Typography>
                    <Typography component='h4'>
                      {formatNumber(fundManagersApprovedCount)}
                    </Typography>
                  </div>
                </div>
              </Col>

              <Col xs={0} sm={4} xl={0}></Col>
            </Row>
          </>
        </div>
      </Col>
    </Row>
  );
};
