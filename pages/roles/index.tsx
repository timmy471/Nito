import { useEffect } from 'react';
import { IPermission } from 'types';
import { useRouter } from 'next/router';
import { Collapse, Checkbox } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { GetRoles } from '@src/redux/actions/roleActions';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { Button, LoadingSpinner, Typography } from '@src/components';
import { capitalizeFirstLetter, escapeUnderScore } from '@src/helpers';
import { hasPermission } from '@src/redux/actions/authActions';
import permissions from '@src/helpers/constants/permissions';

const Roles = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { Panel } = Collapse;
  const CheckboxGroup = Checkbox.Group;

  const { roles, loading } = useAppSelector((state) => state.roles);

  useEffect(() => {
    dispatch(GetRoles());

    //eslint-disable-next-line
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className='roles-container role-view'>
      <div className='d-flex justify-content-end'>
        {hasPermission(permissions.createRole) && (
          <Button label='New Role' onClick={() => router.push('/roles/new-role')} />
        )}
      </div>
      <div className='mt-2'>
        {roles.map((role, i) => (
          <Collapse
            bordered={false}
            expandIconPosition='end'
            className='mb-1'
            expandIcon={({ isActive }) => (
              <div>
                <CaretDownOutlined rotate={isActive ? 180 : 0} />
              </div>
            )}
            key={i}>
            <Panel
              header={
                <div className='d-flex'>
                  <Checkbox checked />
                  <div className='ml-4'>
                    <Typography
                      className='mbottom-2'
                      variant='body7'
                      onClick={() => {
                        if (hasPermission(permissions.editRole))
                          router.push(`/roles/new-role?role_id=${role.id}`);
                      }}>
                      {capitalizeFirstLetter(role.name)}
                    </Typography>
                    <Typography state='secondary' variant='body10'>
                      Show all modules
                    </Typography>
                  </div>
                </div>
              }
              key={i}
              className='permissions-accordion-panel view-container'>
              <div className=''>
                {Object?.entries(role.permissions).map(([key, value]) => (
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
                          <Typography variant='body7'>
                            {capitalizeFirstLetter(escapeUnderScore(key))}
                          </Typography>
                        }
                        key={key}
                        className='permissions-accordion-panel pl-4'>
                        <div className='permission-checkboxes'>
                          <CheckboxGroup
                            options={(value as any)?.map((val: IPermission) => ({
                              label: capitalizeFirstLetter(escapeUnderScore(val?.name)),
                              value: val.id,
                            }))}
                            value={(value as any)?.map((val: IPermission) => val.id)}
                            name={key}
                          />
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                ))}
              </div>
            </Panel>
          </Collapse>
        ))}
      </div>
    </div>
  );
};

export default Roles;
