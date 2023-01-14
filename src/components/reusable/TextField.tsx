import clsx from 'classnames';
import Image from 'next/image';
import { assets } from '@src/assets';
import { ITextfield } from 'types';
import React, { ForwardRefRenderFunction } from 'react';

export const TextField: ForwardRefRenderFunction<HTMLInputElement, ITextfield> = ({
  type = 'text',
  name,
  id,
  label,
  placeholder,
  value,
  labelClassName,
  state,
  className,
  style,
  disabled,
  hasError,
  required = true,
  onChange,
  onBlur,
  endIcon,
  searchField,
  ...rest
}) => {
  const textFieldBaseClass = 'fa_textfield';

  const labelBaseClass = 'fa_textfield__label';
  const labelClasses = clsx(labelBaseClass, labelClassName);

  const textFieldClasses = clsx(
    textFieldBaseClass,
    state ? `${textFieldBaseClass}__${state}` : '',
    `${hasError ? `${textFieldBaseClass}__error` : ''}`,
    `${label ? `${textFieldBaseClass}__label_input` : ''}`,
    `${endIcon ? `${textFieldBaseClass}__end_icon_input` : ''}`,
    className
  );

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addedPlaceholder = e.target?.previousElementSibling;
    addedPlaceholder?.classList.add('no-placeholder');
  };

  const handleBlur = (e: any) => {
    onBlur?.(e);
    const addedPlaceholder = e.target.previousElementSibling;

    if (!e.target.value.length) addedPlaceholder?.classList?.remove('no-placeholder');
  };

  return (
    <div className={`fa_textfield_container ${label ? 'texfield_container_default' : ''}`}>
      {!label && placeholder && (
        <div className={`placeholder ${value ? 'no-placeholder' : ''}`}>
          {!value && searchField && (
            <Image
              src={assets.SearchIcon.src}
              alt={assets.SearchIcon.alt}
              width='20'
              height='20'
            />
          )}{' '}
          <label htmlFor={id || name} className={searchField ? 'searchfield-placeholder' : ''}>
            {placeholder}
          </label>{' '}
          {required && <span>*</span>}
        </div>
      )}

      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        style={style}
        className={textFieldClasses}
        onFocus={handleFocus}
        onBlur={handleBlur}
        id={id || name}
        autoComplete='off'
        required
        onChange={onChange}
        {...rest}
      />
      {label && (
        <label htmlFor={id || name} className={labelClasses}>
          {label} {required && <span className='font-danger'>*</span>}
        </label>
      )}

      {endIcon && (
        <div className='fa_textfield__endicon'>
          <span>{endIcon}</span>
        </div>
      )}
    </div>
  );
};
