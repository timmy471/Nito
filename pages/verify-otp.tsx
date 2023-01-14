import Image from 'next/image';
import { Fragment } from 'react';
import type { NextPage } from 'next';
import { assets } from '@src/assets';
import { Layout, Row, Col } from 'antd';
import { IVerifyOTPFormData } from 'types';
import { useAppDispatch } from '@src/hooks/redux';
import { VerifyOTPForm, Typography } from '@src/components';
import { UserVerifyOTP } from '@src/redux/actions/authActions';

const VerifyOTP: NextPage<{}> = () => {
  const { Content } = Layout;
  const dispatch = useAppDispatch();

  const onSubmitForm = (values: IVerifyOTPFormData) => {
    return dispatch(UserVerifyOTP(values));
  };

  return (
    <div className='auth'>
      <div className='half-paged'>
        <Content className='container'>
          <div>
            <Row>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} className='left'>
                <div className='left-hero'>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Fragment>
                      <Image
                        src={assets.AsLogo.src}
                        alt={assets.AsLogo.alt}
                        width={100}
                        height={100}
                      />
                    </Fragment>
                  </Col>
                  <div className='box'>
                    <h1>Verify OTP</h1>
                    <h6>Enter the 6-digit OTP that was sent to the email you submitted</h6>
                    <div className='form'>
                      <VerifyOTPForm onSubmitForm={onSubmitForm} />
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                xs={0}
                sm={0}
                md={0}
                lg={12}
                xl={12}
                className='d-flex justify-content-center align-items-center'>
                <div className='right-hero'>
                  <Typography component='h1'>Everything is better with AssetStack</Typography>
                </div>
              </Col>
            </Row>
          </div>
        </Content>
      </div>
    </div>
  );
};

export default VerifyOTP;
