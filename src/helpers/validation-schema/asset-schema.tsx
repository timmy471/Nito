import * as Yup from 'yup';
import moment from 'moment';
import { defaultValidation } from '@src/helpers/validators';

const validateAssetDetail1 = () =>
  Yup.object().shape({
    name: Yup.string()
      .required('Asset Name is required')
      .min(3, 'Asset Name should be at least 3 characters'),
    address: Yup.string().min(10, 'At least 10 characters'),
    country: defaultValidation('Country'),
    industry: defaultValidation('Industry'),
    website: Yup.string().url(),
    about: Yup.string()
      .required('Provide details about the Asset')
      .min(100, 'At least 100 characters'),
    founded: Yup.string().test('founded', 'Please choose a past date', (value) => {
      const currentDate = moment().format('YYYY-MM-DD');
      const newDate = value?.split('/').reverse().join('-');
      return moment(newDate).isBefore(currentDate);
    }),
  });

const validateAssetDetail2 = () =>
  Yup.object().shape({
    logo: defaultValidation('Logo'),
    // backgroundPicture: defaultValidation('Banner'),
    founder: Yup.object().shape(
      {
        // image: Yup.string().when(['name', 'jobTitle'], {
        //   is: (name: string, jobTitle: string) => !!name || !!jobTitle,
        //   then: defaultValidation('Image'),
        // }),
        name: Yup.string().when(['image', 'jobTitle'], {
          is: (image: string, jobTitle: string) => !!image || !!jobTitle,
          then: defaultValidation('Name'),
        }),
        jobTitle: Yup.string().when(['image', 'name'], {
          is: (image: string, name: string) => !!image || !!name,
          then: defaultValidation('Position'),
        }),
      },
      [
        ['name', 'jobTitle'],
        ['image', 'jobTitle'],
        ['image', 'name'],
      ]
    ),
  });

export const validateNewAsset = { validateAssetDetail1, validateAssetDetail2 };
