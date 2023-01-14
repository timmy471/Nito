import React from 'react';
import clsx from 'classnames';
import { ITypography } from 'types';

const elementVariants = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
};

export const Typography: React.FC<ITypography> = ({
  component,
  variant,
  style,
  className,
  state,
  children,
  onClick,
  ...props
}) => {
  const Component: any = component ? elementVariants[component] : 'p';
  const baseClass = `typography_default fa_typography`;
  const variantClass = variant ? `${baseClass}__${variant}` : '';
  const stateClass = `${baseClass}__${state}`;

  const typographyClassName = clsx(variantClass, stateClass, className);
  return (
    <Component className={typographyClassName} style={style} onClick={onClick} {...props}>
      {children}
    </Component>
  );
};

Typography.defaultProps = {
  component: 'p',
  state: 'default',
};
