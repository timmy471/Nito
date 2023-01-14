import { Select } from 'antd';
import { ISelectField } from 'types';
import { CaretDownOutlined } from '@ant-design/icons';

const { Option } = Select;
export const SelectField: React.FC<ISelectField> = ({
  placeholder,
  value,
  required = true,
  options,
  onSelect,
  onBlur,
  onChange,
  isSearchable,
  defaultValue,
  hasError,
  className = '',
  topLabel,
  style,
}) => {
  return (
    <div
      className={`select-field-container ${className} ${
        hasError ? 'fa_selectfield__error' : ''
      }`}>
      {topLabel && (
        <label className={`top-label`}>
          {topLabel} {required && <span>*</span>}
        </label>
      )}
      <Select
        placeholder={
          placeholder && (
            <span className='select-placeholder'>
              {placeholder} {required && !topLabel && <span className='font-danger'>*</span>}
            </span>
          )
        }
        value={value}
        showSearch={isSearchable}
        style={{ width: '100%', paddingLeft: '.4rem', ...style }}
        className={`fa_selectfield`}
        defaultValue={defaultValue}
        onSelect={onSelect}
        onChange={onChange}
        onBlur={onBlur}
        suffixIcon={<CaretDownOutlined />}
        bordered={false}
        filterOption={(input, option: any) => {
          return option!.children?.toLowerCase().includes(input.toLowerCase());
        }}>
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};
