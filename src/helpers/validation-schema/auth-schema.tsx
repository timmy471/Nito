import * as Yup from 'yup';
import { passwordValidation } from '../validators';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email address is required'),
  password: Yup.string().required('Password is required'),
});

export const newPasswordSchema: object = Yup.object().shape({
  password: passwordValidation(),
  confirmPassword: Yup.string().test(
    'password-match',
    'Passwords must match',
    function (value) {
      return this.parent.password === value;
    }
  ),
});
