import { capitalizeFirstLetter, formatCamelCaseWord } from '.';
import { fundStatuses, investmentStatuses } from './constants';

export const API = `${process.env.NEXT_PUBLIC_API_VARIABLE}`;

export const onKeyDown = (keyEvent: any) => {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
};

export const determineFundStatus = (text: string) => {
  const { draft, inReview, raising, wired } = fundStatuses;
  if (text === wired) {
    return <div className='spv_wired'>Wired</div>;
  } else if (text === raising) {
    return <div className='spv_raising'>Raising</div>;
  } else if (text === draft) {
    return <div className='spv_draft'>Draft</div>;
  } else if (text === inReview) {
    return <div className='spv_review'>In Review</div>;
  } else {
    return <span className='spv_closing'>{capitalizeFirstLetter(text)}</span>;
  }
};

export const truncateWord = (str: string, maxLength: number) => {
  if (str?.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};

export const determineStage = (text: string) => {
  if (text === 'preSeed') {
    return 'Pre Seed';
  } else if (text === 'seriesA') {
    return 'Series A';
  } else if (text === 'seriesB') {
    return 'Series B';
  } else if (text === 'seriesC') {
    return 'Series C';
  } else {
    return capitalizeFirstLetter(text);
  }
};

export const determineUserStatus = (isEnabled?: boolean) => {
  if (isEnabled) return <div className='user_active'>Active</div>;

  return <div className='user_inactive'>Inactive</div>;
};

const { paymentComplete, paymentPending } = investmentStatuses;
export const determineInvestmentStatus = (text: string) => {
  let statusClass = text;
  if (text === paymentComplete) {
    statusClass = 'payment_complete';
  } else if (text === paymentPending) {
    statusClass = 'payment_pending';
  }
  return (
    <div className={`investment-status-pill investment-status-pill__${statusClass}`}>
      {formatCamelCaseWord(text)}
    </div>
  );
};
