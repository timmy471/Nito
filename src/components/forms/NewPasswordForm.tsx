import Image from 'next/image';
import { assets } from '@src/assets';
import type { NextPage } from 'next';
import React, { Fragment } from 'react';
import { Form, Input } from 'formik-antd';
import { Formik, ErrorMessage } from 'formik';
import { INewPasswordFormProps } from 'types';
import { Button, FormError } from '@src/components';

import { newPasswordSchema } from '@src/helpers/validation-schema';

export const NewPasswordForm: NextPage<INewPasswordFormProps> = ({ onSubmitForm }) => {
  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      onSubmit={onSubmitForm}
      validationSchema={newPasswordSchema}>
      {({ errors, touched, isSubmitting, getFieldProps }) => (
        <Form name='new-password-form' autoComplete='none'>
          <div>
            <Input.Password
              className='fa_textfield'
              placeholder='Password'
              {...getFieldProps('password')}
              style={errors.password && touched.password ? { borderColor: 'red' } : {}}
              iconRender={(visible) =>
                visible ? (
                  <Image
                    src={assets.EyeOpen.src}
                    alt={assets.EyeOpen.alt}
                    height={20}
                    width={20}
                  />
                ) : (
                  <Image
                    src={assets.EyeClose.src}
                    alt={assets.EyeClose.alt}
                    height={20}
                    width={20}
                  />
                )
              }
            />
            <ErrorMessage
              component={FormError}
              className='new-password-error'
              name='password'
            />
          </div>
          <div>
            <Input.Password
              className='fa_textfield mtop-3'
              placeholder='Confirm Password'
              {...getFieldProps('confirmPassword')}
              name='confirmPassword'
              style={
                errors.confirmPassword && touched.confirmPassword ? { borderColor: 'red' } : {}
              }
              iconRender={(visible) =>
                visible ? (
                  <Image
                    src={assets.EyeOpen.src}
                    alt={assets.EyeOpen.alt}
                    height={20}
                    width={20}
                  />
                ) : (
                  <Image
                    src={assets.EyeClose.src}
                    alt={assets.EyeClose.alt}
                    height={20}
                    width={20}
                  />
                )
              }
            />
            <ErrorMessage
              component={FormError}
              className='new-password-error'
              name='confirmPassword'
            />
          </div>
          <Fragment>
            <Button
              className='btn-new-password mt-2'
              type='submit'
              label='Submit new password'
              fullWidth
              loading={isSubmitting}
            />
          </Fragment>
        </Form>
      )}
    </Formik>
  );
};
