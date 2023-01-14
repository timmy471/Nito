import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import { assets } from '@src/assets';
import type { NextPage } from 'next';
import { Layout, Row, Col } from 'antd';
import { useState, Fragment } from 'react';
import { INewPasswordFormData } from 'types';
import { useAppDispatch } from '@src/hooks/redux';
import { UserResetPassword } from '@src/redux/actions/authActions';
import { NewPasswordForm, Typography, CustomModal } from '@src/components';

const NewPassword: NextPage = () => {
  const { Content } = Layout;

  const dispatch = useAppDispatch();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showVerifyModal = () => {
    setIsModalVisible(true);
  };

  const handleVerifyOk = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      Router.push('/');
    }, 1000);
  };

  const handleVerifyCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmitForm = (payload: INewPasswordFormData) => {
    return dispatch(UserResetPassword({ payload, cb: showVerifyModal }));
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
                    <h1>New Password?</h1>
                    <h6>
                      Password must contain at least 8 characters, a number an uppercase letter
                      and a symbol
                    </h6>
                    <div className='form'>
                      <NewPasswordForm onSubmitForm={onSubmitForm} />
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
            btnText='Login'
            header='Password changed successfully!'
            subheader='You have successfully reset your password! Use this password to log in to your
            web dashboard'
            visibility={isModalVisible}
            imageSrc={assets.SendEnvelope.src}
            handleOk={handleVerifyOk}
            handleCancel={handleVerifyCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
