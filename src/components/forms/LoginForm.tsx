import Link from 'next/link';
import { Row, Col } from 'antd';
import { assets } from '@src/assets';
import { ILoginFormProps } from 'types';
import React, { Fragment } from 'react';
import { Form, Checkbox } from 'formik-antd';
import { Formik, ErrorMessage } from 'formik';
import { onKeyDown } from '@src/helpers/utils';
import { getRememberEmail } from '@src/helpers';
import { Button, FormError, TextField } from '@src/components';
import { loginValidationSchema } from '@src/helpers/validation-schema';

export const LoginForm = ({
  onSubmitForm,
  passwordVisibility,
  setPasswordVisibility,
}: ILoginFormProps) => {
  return (
    <Formik
      initialValues={{
        email: getRememberEmail() || '',
        password: '',
        remember: false,
      }}
      onSubmit={onSubmitForm}
      validationSchema={loginValidationSchema}>
      {({ isSubmitting, errors, touched, getFieldProps }) => (
        <Form name='login-form' autoComplete='off' noValidate onKeyDown={onKeyDown}>
          <div className='mt-10 mbottom-4'>
            <TextField
              label='Email'
              {...getFieldProps('email')}
              hasError={errors.email && touched.email}
              required={false}
            />
            <ErrorMessage component={FormError} name='email' />
          </div>
          <div className='mb-1'>
            <TextField
              label='Password'
              {...getFieldProps('password')}
              type={passwordVisibility ? 'text' : 'password'}
              required={false}
              hasError={errors.password && touched.password}
              endIcon={
                <img
                  src={passwordVisibility ? assets.EyeOpen.src : assets.EyeClose.src}
                  alt='Password'
                  className='pr-3 cursor-pointer'
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                />
              }
            />
            <ErrorMessage component={FormError} name='password' />
          </div>
          <div className='check-input mt-2'>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Checkbox {...getFieldProps('remember')}>
                  <label>Remember me</label>
                </Checkbox>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <h5 className='float-right'>
                  <Link href='/forgot-password' passHref>
                    Forgot your password?
                  </Link>
                </h5>
              </Col>
            </Row>
          </div>
          <Fragment>
            <Button
              className='btn-login mt-2'
              label='Sign in'
              fullWidth
              type='submit'
              loading={isSubmitting}
            />
          </Fragment>
        </Form>
      )}
    </Formik>
  );
};
