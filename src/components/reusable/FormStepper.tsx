import { IFormStepper } from 'types';
import { Typography } from '@src/components';
import { CheckOutlined } from '@ant-design/icons';

export const FormStepper: React.FC<IFormStepper> = ({ currentStep = 1, steps }) => {
  return (
    <div className='form-stepper'>
      {steps.map((step, key) => {
        const index = key + 1;

        const getClassName = (className: string) => {
          if (currentStep === index) return `${className} ${className}__active`;

          if (currentStep > index) return `${className} ${className}__completed`;

          return className;
        };
        return (
          <div className='status-indicator' key={key}>
            <div className='number-indicator'>
              <Typography component='h5' className={getClassName('index')}>
                0{index}
              </Typography>
              <div className={getClassName('status-track')}>
                {currentStep > index ? <CheckOutlined /> : ''}
              </div>
            </div>
            <div className={getClassName('text-indicator')}>
              <Typography variant='body8'>{step}</Typography>
              <div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
