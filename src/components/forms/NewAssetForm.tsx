import {
  Typography,
  SelectField,
  FormError,
  TextField,
  TextAreaField,
  FileUpload,
  Button,
  InputLabel,
  ProfileImageUpload,
} from '@src/components';
import moment from 'moment';
import { useState } from 'react';
import { assets } from '@src/assets';
import { Col, Row, DatePicker } from 'antd';
import { ISPVAsset, INewAssetFounder } from 'types';
import { Formik, Form, ErrorMessage } from 'formik';
import { industryOptions } from '@src/helpers/constants';
import { useAppDispatch } from '@src/hooks/redux';
import { setQueryParam } from '@src/redux/slices/assetSlice';
import { GetAssets, CreateAsset } from '@src/redux/actions/assetActions';
import { validateNewAsset } from '@src/helpers/validation-schema';
import { isArray, getCountries, displayAlert, capitalizeFirstLetter } from '@src/helpers';

interface INewAssetProps {
  handleClose: () => void;
}
export const AssetForm: React.FC<INewAssetProps> = ({ handleClose }) => {
  const { CancelIcon } = assets;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [founders, setFounders] = useState<INewAssetFounder[]>([]);
  const [displayProfileImage, setDisplayProfileImage] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleBack = () => {
    currentStep > 1 ? setCurrentStep(currentStep - 1) : handleClose();
  };

  const handleAssetSubmit = (values: ISPVAsset, resetForm: () => void) => {
    const cb = (assetId: string) => {
      handleClose();
      resetForm();
      displayAlert({ msg: 'Asset created successfully', variant: 'success' });
      setCurrentStep(currentStep - 1);
      setFounders([]);
      dispatch(
        setQueryParam({
          param: 'cursor',
          value: undefined,
        })
      );
      dispatch(GetAssets());
    };

    return currentStep > 1
      ? dispatch(CreateAsset({ payload: values, founders, cb }))
      : setCurrentStep(currentStep + 1);
  };

  const addFounder = (
    founderDetail: INewAssetFounder,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    if (founderDetail.image) founderDetail.imageUrl = URL.createObjectURL(founderDetail.image);
    let newFounders = [...founders, founderDetail];

    setFounders(newFounders);
    setFieldValue('founder.name', '');
    setFieldValue('founder.jobTitle', '');
    setFieldValue('founder.image', undefined);
    setDisplayProfileImage(false);
  };

  const removeFounder = (founderKey: number) => {
    setFounders(founders.filter((_, i) => i !== founderKey));
  };

  const founderDetail = {
    name: '',
    jobTitle: '',
    image: undefined,
    imageUrl: '',
  };

  const initialValues: ISPVAsset = {
    name: '',
    address: '',
    country: '',
    industry: '',
    founded: '',
    website: '',
    about: '',
    logo: '',
    // backgroundPicture: '',
    founder: founderDetail,
  };

  const { validateAssetDetail1, validateAssetDetail2 } = validateNewAsset;

  return (
    <div className='asset-form'>
      <Formik
        initialValues={initialValues}
        validationSchema={currentStep === 1 ? validateAssetDetail1 : validateAssetDetail2}
        onSubmit={async (values, { setTouched, resetForm }) => {
          setTouched({});
          await handleAssetSubmit(values, resetForm);
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
            {currentStep === 1 && (
              <div className=''>
                <Row gutter={[40, 28]}>
                  <Col xs={24}>
                    <div className=''>
                      <InputLabel label='Full Legal Name' />
                      <TextField
                        {...getFieldProps('name')}
                        hasError={errors.name && touched.name}
                      />
                      <ErrorMessage component={FormError} name='name' />
                    </div>
                    <div className='mtop-4'>
                      <InputLabel label='Address' required={false} />
                      <TextAreaField
                        {...getFieldProps('address')}
                        rows={4}
                        value={values.address}
                        hasError={errors.address && touched.address}
                        className='asset-text-area'
                      />
                      <ErrorMessage component={FormError} name='address' />
                    </div>
                    <div className='mtop-4'>
                      <InputLabel label='Country of Incorporation' />
                      <SelectField
                        options={getCountries()}
                        onChange={(value: string) => {
                          setFieldValue('country', value);
                        }}
                        onBlur={handleBlur}
                        onSelect={handleChange}
                        value={values.country}
                        isSearchable={true}
                        required={false}
                        placeholder='Select an option'
                        hasError={errors.country && touched.country}
                      />
                      <ErrorMessage component={FormError} name='country' />
                    </div>
                    <div className='mtop-4'>
                      <InputLabel label='Industry' />
                      <SelectField
                        options={industryOptions.map(({ label, value }) => ({ label, value }))}
                        onChange={(value: string) => {
                          setFieldValue('industry', value);
                        }}
                        value={values.industry}
                        required={false}
                        onBlur={handleBlur}
                        onSelect={handleChange}
                        placeholder='Select option'
                        isSearchable={true}
                        hasError={errors.industry && touched.industry}
                      />
                      <ErrorMessage component={FormError} name='industry' />
                    </div>
                    <div className='mtop-4'>
                      <InputLabel label='Founded' />
                      <DatePicker
                        className='fa_textfield custom-input'
                        placeholder='DD/MM/YYYY'
                        inputReadOnly
                        format='DD/MM/YYYY'
                        name='founded'
                        style={{
                          border: errors.founded && touched.founded ? '1px solid red' : 'none',
                        }}
                        defaultValue={
                          values.founded ? moment(values.founded, 'DD/MM/YYYY') : undefined
                        }
                        value={
                          values.founded ? moment(values.founded, 'DD/MM/YYYY') : undefined
                        }
                        onChange={(date, dateString) => setFieldValue('founded', dateString)}
                      />
                      <ErrorMessage component={FormError} name='founded' />
                    </div>
                    <div className='mtop-4'>
                      <InputLabel label='Website Address' required={false} />
                      <TextField
                        {...getFieldProps('website')}
                        placeholder='https://www.abc.com'
                        required={false}
                        hasError={errors.website && touched.website}
                      />
                      <ErrorMessage component={FormError} name='website' />
                    </div>
                    <div className='mtop-4'>
                      <InputLabel label='About the company' />
                      <TextAreaField
                        {...getFieldProps('about')}
                        rows={4}
                        value={values.about}
                        className='asset-text-area'
                        hasError={errors.about && touched.about}
                      />
                      <ErrorMessage component={FormError} name='about' />
                    </div>
                  </Col>
                </Row>
              </div>
            )}

            {currentStep === 2 && (
              <>
                {/* <div className='mtop-3'>
                  <InputLabel label='Cover banner' />
                  <FileUpload
                    label='Upload Cover Banner'
                    className='no-border'
                    acceptedFormats={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}
                    onChange={(file) => {
                      setFieldValue('backgroundPicture', isArray(file) ? file[0] : file);
                    }}
                    uploadedFile={values.backgroundPicture}
                  />
                  <ErrorMessage component={FormError} name='backgroundPicture' />
                </div> */}
                <div className='mtop-3'>
                  <InputLabel label='Logo' />
                  <FileUpload
                    label='Upload Logo'
                    acceptedFormats={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}
                    className='no-border'
                    onChange={(file) => {
                      setFieldValue('logo', isArray(file) ? file[0] : file);
                    }}
                    uploadedFile={values.logo}
                  />
                  <ErrorMessage component={FormError} name='logo' />
                </div>
                <div className='mt-2'>
                  <InputLabel label="Founder's Details" required={false} />
                  <div className='founders-container'>
                    <Row className='founder-form'>
                      <Col
                        xs={24}
                        md={6}
                        className='text-center d-flex flex-column justify-content-center align-items-center'>
                        <ProfileImageUpload
                          onChange={(file) => {
                            setFieldValue('founder.image', isArray(file) ? file[0] : file);
                            setDisplayProfileImage(true);
                          }}
                          uploadedFile={values.founder?.image}
                          displayProfileImage={displayProfileImage}
                        />
                        {/* <ErrorMessage component={FormError} name='founder.image' /> */}
                      </Col>
                      <Col xs={24} md={12} className='detail-fields'>
                        <div>
                          <TextField
                            {...getFieldProps('founder.name')}
                            onChange={(e) =>
                              setFieldValue(
                                'founder.name',
                                capitalizeFirstLetter(e.target.value)
                              )
                            }
                            value={values.founder?.name}
                            onBlur={handleBlur}
                            required={false}
                            placeholder='Name'
                          />
                          <ErrorMessage component={FormError} name='founder.name' />
                        </div>
                        <div className='mtop-2'>
                          <TextField
                            {...getFieldProps('founder.jobTitle')}
                            placeholder='Position'
                            required={false}
                          />
                          <ErrorMessage component={FormError} name='founder.jobTitle' />
                        </div>
                      </Col>
                      <Col
                        xs={24}
                        md={6}
                        className='d-flex justify-content-center pl-3 align-items-end detail-fields'>
                        <Button
                          label='Add'
                          onClick={() => {
                            addFounder(
                              values.founder ? values?.founder : founderDetail,
                              setFieldValue
                            );
                          }}
                          disabled={!values.founder?.name || !values.founder?.jobTitle}
                        />
                      </Col>
                    </Row>
                    <Row
                      className={`founders-detail-container ${
                        founders.length ? 'founders-detail-container__exist' : ''
                      }`}>
                      {founders.map(({ image, imageUrl, name, jobTitle }, key) => (
                        <Col xs={12} md={6} className='text-center' key={key}>
                          <div className='founder-image'>
                            <img
                              src={CancelIcon.src}
                              alt={CancelIcon.alt}
                              className='cancel-img'
                              onClick={() => removeFounder(key)}
                            />
                            {image ? (
                              <img src={imageUrl} width='100%' height='100%' alt='Avatar' />
                            ) : (
                              <img
                                src={assets.userAvatar.src}
                                width='100%'
                                height='100%'
                                alt='Avatar'
                              />
                            )}
                          </div>
                          <Typography variant='body7' className='mb-0 mtop-2'>
                            {name}
                          </Typography>
                          <Typography state='secondary' variant='body7'>
                            {jobTitle}
                          </Typography>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              </>
            )}

            <div
              className={`d-flex justify-content-end mt-2 ${
                currentStep === 2 ? 'cta-btns' : ''
              }`}>
              <Button
                label={currentStep === 1 ? 'Cancel' : 'Back'}
                variant='secondary'
                disabled={isSubmitting}
                onClick={handleBack}
              />{' '}
              <Button
                label={currentStep === 2 ? 'Save' : 'Next'}
                className={'ml-4'}
                size='sm'
                type='submit'
                loading={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
