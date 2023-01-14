import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import { assets } from '@src/assets';
import type { NextPage } from 'next';
import { Layout, Row, Col } from 'antd';
import { Fragment, useState } from 'react';
import { useAppDispatch } from '@src/hooks/redux';
import { IForgotPasswordFormData } from 'types';
import { UserForgotPassword } from '@src/redux/actions/authActions';
import { CustomModal, ForgotPasswordForm, Typography } from '@src/components';

const ForgotPassword: NextPage = () => {
  const { Content } = Layout;
  const dispatch = useAppDispatch();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showVerifyModal = () => {
    setIsModalVisible(true);
  };
  const handleVerifyOk = () => {
    setIsModalVisible(false);
    Router.push('/verify-otp');
  };
  const handleVerifyCancel = () => {
    setIsModalVisible(false);
  };
  const onSubmitForm = (payload: IForgotPasswordFormData) => {
    return dispatch(UserForgotPassword({ payload, cb: showVerifyModal }));
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
                    <h1>Forgot Password?</h1>
                    <h6>
                      That’s okay, it happens!
                      <br /> Enter the email address associated with your account and we will
                      send you an OTP to reset your password.
                    </h6>
                    <div className='form'>
                      <ForgotPasswordForm onSubmitForm={onSubmitForm} />
                    </div>
                  </div>
                  <div className='mtop-3 text-center'>
                    <Link href='/'>Log in to AssetStack</Link>
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

        <div className='modal'>
          <CustomModal
            btnText='Continue'
            footerText='Resend mail.'
            header='Check your mail'
            subheader='We’ve sent an email with an OTP to reset your password'
            visibility={isModalVisible}
            imageSrc={assets.SendEnvelope.src}
            handleOk={handleVerifyOk}
            handleCancel={handleVerifyCancel}
            footerTextClick={() => dispatch(UserForgotPassword({}))}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
