import { IPermission } from 'types';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Collapse, Row, Col, Checkbox } from 'antd';
import { userProtectedRoutes } from '@src/services';
import { CaretDownOutlined } from '@ant-design/icons';
import { ClearCurrentRole } from '@src/redux/slices/roleSlice';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { Typography, Button, TextField, LoadingSpinner } from '@src/components';
import { capitalizeFirstLetter, displayAlert, escapeUnderScore } from '@src/helpers';
import { GetPermissions, CreateRole, GetRole } from '@src/redux/actions/roleActions';

const NewRole: NextPage = () => {
  const router = useRouter();
  const { role_id } = router.query;
  const dispatch = useAppDispatch();

  const { permissions, loading, isSubmitting, currentRole } = useAppSelector(
    (state) => state.roles
  );

  const { permissions: currentRolePermissions } = currentRole || {};

  const [roleTitle, setRoleTitle] = useState<string>('');
  const [permissionsSelected, setPermissionsSelected] = useState({});

  const { Panel } = Collapse;
  const CheckboxGroup = Checkbox.Group;

  const handlePermissionChange = (checkedValues: CheckboxValueType[], key: string) => {
    setPermissionsSelected({ ...permissionsSelected, [key]: checkedValues });
  };

  const isEditing = !!currentRole;

  useEffect(() => {
    dispatch(GetPermissions());
    if (role_id) {
      dispatch(GetRole({ roleId: role_id }));
    }

    return () => {
      dispatch(ClearCurrentRole());
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setRoleTitle(currentRole?.name || '');
    if (currentRole) {
      let newRoles = {};
      Object.entries(currentRole?.permissions).forEach(
        ([key, value]) =>
          (newRoles = {
            ...newRoles,
            [key]: (value as unknown as IPermission[]).map((val: IPermission) => val.id),
          })
      );
      setPermissionsSelected(newRoles);
    }

    //eslint-disable-next-line
  }, [currentRole]);

  const handleRoleSubmit = async () => {
    if (roleTitle.trim() === '') return displayAlert({ msg: 'Enter role name' });
    let allPermissions: string[] = [];
    Object.entries(permissionsSelected).forEach(([key, value]) =>
      allPermissions.push(...(value as string[]))
    );

    if (!allPermissions.length) return displayAlert({ msg: 'Select Permission(s)' });

    const cb = () => {
      Router.push('/roles');
      displayAlert({
        msg: `Role ${isEditing ? 'updated' : 'created'} successfully`,
        variant: 'success',
      });
    };

    await dispatch(CreateRole({ name: roleTitle, permissionIds: allPermissions, cb }));
  };

  if (!permissions || loading) return <LoadingSpinner />;

  return (
    <div className='roles-container'>
      <div className='roles-create-header'>
        <Row gutter={[40, 20]}>
          <Col xs={24} md={13} xl={15}>
            <TextField
              className='role-name-field'
              placeholder='Role Name'
              name='roleName'
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              required={false}
            />
          </Col>
          <Col xs={24} md={11} xl={9} className='d-flex justify-content-between'>
            <Button label='Cancel' variant='secondary' onClick={() => router.push('/roles')} />

            <Button label='Save Role' onClick={handleRoleSubmit} loading={isSubmitting} />
          </Col>
        </Row>
      </div>
      <div className='roles-create-body'>
        <Typography variant='body5'>Select module and permissions for the role</Typography>
        {Object.entries(permissions).map(([key, value]) => (
          <div className='mt-1 mb-1' key={key}>
            <Collapse
              bordered={false}
              expandIconPosition='end'
              expandIcon={({ isActive }) => (
                <div>
                  <CaretDownOutlined rotate={isActive ? 180 : 0} />
                </div>
              )}>
              <Panel
                header={
                  <Typography>{capitalizeFirstLetter(escapeUnderScore(key))}</Typography>
                }
                key={key}
                className='permissions-accordion-panel'>
                <div className='py-2 permission-checkboxes'>
                  <CheckboxGroup
                    options={(value as IPermission[])?.map((val: IPermission) => ({
                      label: capitalizeFirstLetter(escapeUnderScore(val?.name)),
                      value: val.id,
                    }))}
                    key={key}
                    name={key}
                    defaultValue={
                      isEditing && currentRolePermissions
                        ? (
                            currentRolePermissions[
                              key as unknown as number
                            ] as unknown as IPermission[]
                          )?.map((permission: IPermission) => permission.id)
                        : []
                    }
                    onChange={(checkedValues) => handlePermissionChange(checkedValues, key)}
                  />
                </div>
              </Panel>
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  return userProtectedRoutes(context);
}

export default NewRole;
