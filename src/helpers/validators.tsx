import * as Yup from 'yup';

export const validateEmail = (email: string) => {
  //Check for @,. com
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validatePassword = (password: string) => {
  // Regex to check for minimum 8 characters, at least one number and one letter
  const newReg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(password);
  return newReg;
};

export const defaultValidation = (name: string) =>
  Yup.string().required(`${name} is required`);

export const optionValidation = () => Yup.string().required('Select an option');

export const urlValidation = (name: string, required = true) =>
  required
    ? Yup.string()
        .matches(
          /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
          'Enter valid url!'
        )
        .required(`${name} is required`)
    : Yup.string().matches(
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        'Enter valid url!'
      );

export const passwordValidation = (path = 'password') =>
  Yup.string()
    .required('Password is required')
    .min(8, 'Password must not be less than 8 characters')
    .test({
      test: function (value: any) {
        return !/(?=.*[!@#$%^&*])/.test(value)
          ? this.createError({
              message: 'Password must contain at least one special character',
              path,
            })
          : true;
      },
    })
    .test({
      test: function (value: any) {
        return !/(?=.*?[A-Z])/.test(value)
          ? this.createError({
              message: 'Password must contain at least upper case letter',
              path,
            })
          : true;
      },
    })
    .test({
      test: function (value: any) {
        return !/(?=.*[0-9])/.test(value)
          ? this.createError({
              message: 'Password must contain at least one number',
              path,
            })
          : true;
      },
    });

export const emailValidation = (required = true) =>
  required
    ? Yup.string().email('Invalid email format!').required('Email is required')
    : Yup.string().email('Invalid email format!');
