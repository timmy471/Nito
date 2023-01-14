import { Row, Col } from 'antd';
import { useState } from 'react';
import type { NextPage } from 'next';
import { ILoginFormData } from 'types';
import { useAppDispatch } from '@src/hooks/redux';
import { Typography, LoginForm } from '@src/components';
import { UserLogin } from '@src/redux/actions/authActions';

const Login: NextPage = () => {
  const dispatch = useAppDispatch();

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const onSubmitForm = (values: ILoginFormData) => {
    return dispatch(UserLogin(values));
  };

  return (
    <div className='auth'>
      <div className='login-page'>
        <div className='form-container'>
          <Row>
            <Col xs={{ span: 0 }} lg={{ span: 12 }} className='aside'>
              <Row>
                <Typography component='h3'>Welcome to the</Typography>
              </Row>
              <Row>
                <Typography component='h1'>AssetStack</Typography>
                <Typography component='h1'>Web Admin</Typography>
              </Row>
              <Row>
                {' '}
                <Typography component='span'>
                  We make it easy for everyone to maximize their investment
                </Typography>
              </Row>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
              className='aside'>
              <Typography component='h1'>Sign in</Typography>
              <div className='mt-2'>
                <LoginForm
                  onSubmitForm={onSubmitForm}
                  setPasswordVisibility={setPasswordVisibility}
                  passwordVisibility={passwordVisibility}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Login;
