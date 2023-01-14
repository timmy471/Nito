import { Typography } from '@src/components';
import { useState } from 'react';
import { IPill } from 'types';

export const Pill: React.FC<IPill> = ({
  value,
  label,
  selected,
  className = '',
  isTag,
  onClick,
}) => {
  const [itemValue, setItemValue] = useState<boolean | undefined>(value);
  const handleClick = () => {
    setItemValue(!itemValue);
    onClick?.();
  };

  return (
    <div
      className={`${className} ${isTag ? 'fa_detail_tag' : ''} fa_filter_pill cursor-pointer ${
        selected ? 'fa_filter_pill__selected' : ''
      }`}
      onClick={handleClick}>
      <Typography>{label}</Typography>
    </div>
  );
};
