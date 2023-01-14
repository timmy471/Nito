import qs from 'qs';
import moment from 'moment';
import { notification } from 'antd';
import { parseCookies } from 'nookies';
import { countries } from './datasets';
import { IAlert, IUnknowndObjectKeys } from 'types';

export const capitalizeFirstLetter = (word?: string) => {
  return word ? word.charAt(0).toUpperCase() + word.toLocaleLowerCase().slice(1) : '';
};

export const getTableAlternatingBg = (index: number) =>
  index % 2 === 0 ? 'table-row-light' : 'table-row-dark';

export const getNationalitiesForForm = () =>
  countries.map((country) => ({ label: country.nationality, value: country.nationality }));

export const getCountries = () =>
  countries.map((country) => ({ label: country.name, value: country.name }));

export const isArray = (item: []) => Array.isArray(item);

export const isEvenNumber = (number: number) => number % 2 === 0;

// replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
export const moneyFormat = (amount: number | string) => {
  return amount?.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
};

export const formatDate = (value: string | number | Date, includeYear?: boolean) => {
  /* Takes the date and returns it in this format 'Mar 21' */
  return includeYear ? moment(value).format('MMM Do, YYYY') : moment(value).format('MMM Do');
};

export const formatNumber = (number: string | number) => {
  if (typeof number === 'number') number = number.toString();
  // format number 1000000 to 1,234,567
  return number?.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const moneyToNumber = (amount: string) => {
  if (!amount) return '';

  return Number(amount.replace(/,/g, ''));
};

export const formatCurrency = (amount: any, currency = '$') => {
  // appends currency to value, validates decimal side

  if (!amount) return '';

  amount = amount?.toString();

  // check for decimal
  if (amount?.indexOf('.') >= 0) {
    // get position of first decimal
    // this prevents multiple decimals from being entered
    var decimalPos = amount.indexOf('.');

    // split number by decimal point
    let leftSide = amount.substring(0, decimalPos);
    let rightSide = amount.substring(decimalPos);

    // add commas to left side of number
    leftSide = formatNumber(leftSide);

    // validate right side
    rightSide = formatNumber(rightSide);

    rightSide = rightSide.substring(0, 2);

    // join number by .
    amount = currency + leftSide + '.' + rightSide;
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    amount = formatNumber(amount);
    amount = currency + ' ' + amount;
  }
  return amount;
};

//Function to format currencies back to numberTypes
//Useful for api calls
export const formatCurrencyToNumber = (amount: string | number) => {
  amount = amount?.toString().replace(/\s+/g, '').slice(1);
  return moneyToNumber(amount);
};

//Function to set currency textfields
//Ensuring to remove the currency when the field is empty
export const handleCurrencyFieldChange = (
  fieldSetter: (fieldName: string, value: string | number) => void,
  fieldName: string,
  value: string | number
) => {
  return fieldSetter(
    fieldName,
    formatCurrency(value).trim() === '$' ? '' : formatCurrency(value)
  );
};

export const saveLocalStorageItem = (itemName: string, itemValue: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(itemName, JSON.stringify(itemValue));
  }
};

export const getLocalStorageItem = (itemName: string) => {
  if (!itemName) return;

  if (typeof window !== 'undefined') {
    let localStorageItem = localStorage.getItem(itemName);
    if (typeof localStorageItem === 'string') {
      return JSON.parse(localStorageItem);
    }
  }
};

export const displayAlert = (args: IAlert) => {
  const { msg, variant, header, placement, className, style } = args;

  const notificationVariant = variant || 'error';

  notification.open({
    message: header || capitalizeFirstLetter(notificationVariant),
    description: msg,
    placement: placement || 'topRight',
    className: `fa-alert fa-alert__${notificationVariant || 'error'} ${className}`,
    style: {
      ...style,
    },
  });
};

export const getRememberEmail = () => {
  const cookies = parseCookies();
  return cookies.email;
};

export const getMinutes = (amount: number) => {
  let minutes: any = new Date();
  minutes.setTime(minutes.getTime() + amount * 60 * 1000);
  return minutes;
};

export const convertToIsoString = (dateToConvert: string, format: string = 'DD-MM-YYYY') => {
  if (!dateToConvert) return '';

  const date = moment(dateToConvert, format);
  const newDate = new Date(date.format('YYYY-MM-DD'));

  const formattedDate = new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000);
  return formattedDate.toISOString();
};

export const getSelectOptions = (options: object) =>
  Object.entries(options).map(([key, value]) => ({ label: key, value }));

//Format camel case words to user friendle words
//e.g pendingPayment to Pending Payment
export const formatCamelCaseWord = (text: string) => {
  const result = text?.replace(/([A-Z])/g, ' $1');
  return capitalizeFirstLetter(result);
};

export const escapeUnderScore = (word: string) => {
  if (!word) return '';
  return word?.replace(/_/gi, ' ');
};

export const truncateString = (string: string, length = 20) => {
  if (!string) return '';

  return string?.length > length ? `${string?.substring(0, length)}...` : string;
};

//Returns a new object containing only truthy values
export const removeObjEmptyValues = (obj: IUnknowndObjectKeys) => {
  const newObj: IUnknowndObjectKeys = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value) {
      newObj[key] = value;
    }
  });
  return newObj;
};

//formats object to querystring
export const formatUrlQuery = (data: IUnknowndObjectKeys) =>
  qs.stringify(removeObjEmptyValues(data));

//Returns formatted URL containing only defined query values in the queryParams object passed
export const formatUrl = (url: string, queryParams: IUnknowndObjectKeys) => {
  const queryString = formatUrlQuery(queryParams);

  return queryString ? `${url}?${queryString}` : url;
};

export const getDocName = (template: string) => {
  const docName = template.toLowerCase().replace('template_id', '').replace(/_/g, ' ');
  return capitalizeFirstLetter(docName);
};
