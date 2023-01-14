import React from 'react';
import clsx from 'classnames';
import { IButton } from 'types';
import { Button as AntButton } from 'antd';

export const Button: React.FC<IButton> = ({
  label,
  disabled,
  variant,
  size,
  fullWidth,
  loading,
  type,
  className,
  style,
  onClick,
  ...rest
}) => {
  const baseClass = 'fa_btn';

  const fullContainerWidth = fullWidth ? 'full-width' : '';

  const btnDisabled = disabled ? '--btn-disabled' : '';

  const btnLoading = loading ? '--btn-loading' : '';

  const buttonClasses = clsx(
    className,
    `${baseClass}`,
    `${baseClass}__${size}`,
    `${baseClass}__${variant}${btnDisabled}${btnLoading}`,
    `${baseClass}__${fullContainerWidth}`
  );

  const handleClick = () => {
    if (onClick) return onClick();
    return {};
  };

  return (
    <AntButton
      htmlType={loading ? 'button' : type}
      onClick={handleClick}
      className={buttonClasses}
      disabled={disabled}
      loading={loading}
      style={style}
      {...rest}>
      {label}
    </AntButton>
  );
};

Button.defaultProps = {
  label: 'Button',
  variant: 'primary',
  size: 'sm',
  type: 'button',
  disabled: false,
};
