import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form } from 'formik-antd';
import OtpInput from 'react18-input-otp';
import { IVerifyOTPProps } from 'types';
import { Typography, Button } from '@src/components';

export const VerifyOTPForm: React.FC<IVerifyOTPProps> = ({ onSubmitForm }) => {
  return (
    <Formik
      initialValues={{
        otp: '',
      }}
      onSubmit={onSubmitForm}
      validationSchema={Yup.object().shape({
        otp: Yup.string()
          .required('Error: OTP is required')
          .test('len', 'Error: OTP must be 6 digits', (val) => val?.length === 6),
      })}>
      {({ setFieldValue, values, errors, touched, isSubmitting }) => (
        <Form name='verify-otp-form' autoComplete='off'>
          <div className='mt-2'>
            <OtpInput
              value={values.otp}
              inputStyle='otp-input verify-otp-input'
              onChange={(val: string) => setFieldValue('otp', val)}
              numInputs={6}
              shouldAutoFocus
              isInputNum
            />
            <div className='mtop-2'>
              {errors.otp && touched.otp ? (
                <Typography state='error'>{errors.otp}</Typography>
              ) : null}
            </div>
          </div>
          <Button
            label='Verify OTP'
            type='submit'
            loading={isSubmitting}
            fullWidth
            className='mt-2'
          />
        </Form>
      )}
    </Formik>
  );
};
