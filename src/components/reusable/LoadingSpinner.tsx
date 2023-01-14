import { assets } from '@src/assets';

export const LoadingSpinner = ({ isLoadingMore = false, className = '' }) => {
  return (
    <div
      className={`center-loader ${className} ${isLoadingMore ? 'center-loader--more' : ''}`}>
      <img src={assets.LoadingSpinner.src} alt='Loading' />
    </div>
  );
};
