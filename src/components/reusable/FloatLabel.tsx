import { IFloatLabel } from 'types';
import React, { useState } from 'react';

export const FloatLabel = (props: IFloatLabel) => {
  const [focus, setFocus] = useState(false);
  const { children, label, value, className, required } = props;

  const labelClass =
    focus || (value && value.length !== 0) ? 'fa-label fa-label-float' : 'fa-label';

  return (
    <div
      className='fa-float-label'
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}>
      {children}
      <label className={`${labelClass} ${className}`}>
        {label}
        {required && <span>*</span>}
      </label>
    </div>
  );
};
