import * as Yup from 'yup';
import { IAdminUser } from 'types';
import { useEffect } from 'react';
import { displayAlert } from '@src/helpers';
import { Formik, Form, ErrorMessage } from 'formik';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { CreateAdminUser } from '@src/redux/actions/teamActions';

import { Typography, SelectField, FormError, TextField, Button } from '@src/components';
import { defaultValidation, emailValidation, optionValidation } from '@src/helpers/validators';
import { hasPermission } from '@src/redux/actions/authActions';
import permissions from '@src/helpers/constants/permissions';

interface INewAdminUserFormProps {
  handleDrawerClose: () => void;
}
export const AdminUserForm: React.FC<INewAdminUserFormProps> = ({ handleDrawerClose }) => {
  const dispatch = useAppDispatch();

  const { roles } = useAppSelector((state) => state.roles);
  const { currentUser } = useAppSelector((state) => state.team);

  const { firstName, lastName, email, roleId } = currentUser || {};

  const initialValues: IAdminUser = {
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    roleId: roleId || undefined,
  };

  const validationSchema = Yup.object().shape({
    firstName: defaultValidation('First Name'),
    lastName: defaultValidation('Last Name'),
    email: emailValidation(),
    roleId: optionValidation(),
  });

  const cb = () => {
    handleDrawerClose();
    displayAlert({
      msg: `user ${!!currentUser ? 'updated' : 'created'} successfully`,
      variant: 'success',
    });
  };

  return (
    <div className='admin-user-form'>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await dispatch(
            CreateAdminUser({
              payload: values,
              cb: () => {
                cb();
                resetForm();
              },
            })
          );
        }}>
        {({
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          getFieldProps,
          handleChange,
          handleBlur,
        }) => (
          <Form noValidate autoComplete='off'>
            <Typography component='h4'>
              {!!currentUser ? 'Edit User' : 'Add New User'}
            </Typography>
            <div className='mt-3'>
              <div className='mb-1'>
                <TextField
                  placeholder='First Name'
                  required={false}
                  {...getFieldProps('firstName')}
                  hasError={errors.firstName && touched.firstName}
                />
                <ErrorMessage component={FormError} name='firstName' />
              </div>
              <div className='mb-1'>
                <TextField
                  placeholder='Last Name'
                  required={false}
                  {...getFieldProps('lastName')}
                  hasError={errors.lastName && touched.lastName}
                />
                <ErrorMessage component={FormError} name='lastName' />
              </div>
              <div className='mb-1'>
                <TextField
                  placeholder='Email'
                  required={false}
                  disabled={!!currentUser}
                  {...getFieldProps('email')}
                  hasError={errors.email && touched.email}
                />
                <ErrorMessage component={FormError} name='email' />
              </div>
              <div className='mb-1'>
                <SelectField
                  options={roles.map((role) => ({
                    label: role.name,
                    value: role.id,
                  }))}
                  onChange={(value: string) => {
                    setFieldValue('roleId', value);
                  }}
                  onBlur={handleBlur}
                  onSelect={handleChange}
                  value={values.roleId}
                  isSearchable={true}
                  required={false}
                  placeholder='Select Role'
                  hasError={errors.roleId && touched.roleId}
                />
                <ErrorMessage component={FormError} name='roleId' />
              </div>
            </div>
            <div className={`d-flex justify-content-between control-btns `}>
              <Button
                label={'Cancel'}
                variant='secondary'
                disabled={isSubmitting}
                onClick={handleDrawerClose}
              />{' '}
              {hasPermission(permissions.createUser) && (
                <Button label={'Save'} type='submit' loading={isSubmitting} />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
