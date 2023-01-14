import * as Yup from 'yup';
import { Form } from 'formik-antd';
import React, { Fragment } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { IForgotPasswordFormData } from 'types';
import { TextField, FormError, Button } from '@src/components';

interface Props {
  onSubmitForm: (values: IForgotPasswordFormData) => void;
}
export const ForgotPasswordForm: React.FC<Props> = ({ onSubmitForm }) => {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={onSubmitForm}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Invalid email address')
          .required('Email address is required'),
      })}>
      {({ errors, touched, isSubmitting, getFieldProps }) => (
        <Form name='forgot-password-form' autoComplete='none' noValidate>
          <div className='mt-10 mbottom-4'>
            <TextField
              label='Email'
              {...getFieldProps('email')}
              hasError={errors.email && touched.email}
              required={false}
            />
            <ErrorMessage component={FormError} name='email' />
          </div>
          <Fragment>
            <Button
              label='Submit'
              type='submit'
              size='lg'
              className='mt-1'
              loading={isSubmitting}
            />
          </Fragment>
        </Form>
      )}
    </Formik>
  );
};
