import { InputHTMLAttributes } from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { ISPVTAbleDataType, IFundManager, ILP } from 'types';
export interface IDashboradLayoutProps {
  children: JSX.Element[] | JSX.Element;
  contentClassName?: string;
}

export interface ITextfield extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  ref?: string;
  labelClassName?: string;
  state?: 'success' | 'warning' | 'error';
  rows?: string | number;
  hasError?: boolean | string;
  endIcon?: React.ReactNode;
  searchField?: boolean;
  topLabel?: string;
}

export interface IFormStepper {
  currentStep?: number;
  steps: string[];
}

export interface ISelectFieldOptions {
  value: string;
  label: string;
}

export interface IButton {
  label: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: React.CSSProperties;
  onClick?: (values?: any) => void;
  size?: 'sm' | 'md' | 'lg';
  rest?: String[];
}

export interface IModal {
  header: string;
  btnText: string;
  imageSrc?: string;
  subheader: string;
  className?: string;
  footerText?: string;
  visibility: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  footerTextClick?: () => void;
}

export interface ISelectField {
  placeholder?: React.ReactNode;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  isSearchable?: boolean;
  options: { value: string; label: string }[];
  className?: string;
  hasError?: boolean | string;
  defaultValue?: string;
  topLabel?: string;
  style?: object;
  onSelect?: (value: string | number) => void;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
}

export interface ITextArea {
  label?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  maxLength?: number;
  value: string;
  id?: string;
  placeholder?: string;
  variant?: string;
  rows?: number;
  bordered?: boolean;
  hasError?: boolean | string;
}

export interface IBackCTA {
  className?: string;
}

export interface ISocialLogin {
  header: string;
}

export interface IFloatLabel {
  children: JSX.Element[] | JSX.Element;
  label: string;
  value: string | [];
  className?: string;
  required?: boolean;
}

export interface IFormError {
  children?: any;
  msg?: string;
}

export interface IDrawer {
  visible: boolean;
  height?: string | number;
  children: JSX.Element[] | JSX.Element;
  handleClose: () => void;
}

export interface IPill {
  value?: boolean;
  trueText?: string;
  falseText?: string;
  label?: string;
  selected?: boolean;
  className?: string;
  isTag?: boolean;
  onClick?: () => void;
}

type elements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';

type bodyVariants =
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'body5'
  | 'body6'
  | 'body7'
  | 'body8'
  | 'body9'
  | 'body10';

type typographyStates = 'default' | 'primary' | 'secondary' | 'tetiary' | 'error';

export interface ITypography {
  component?: elements;
  variant?: bodyVariants;
  style?: React.CSSProperties;
  className?: string;
  state?: typographyStates;
  children: React.ReactNode;
  onClick?: () => void;
  props?: String[];
}

export interface IFileUploadProps {
  acceptedFormats?: any;
  uploadedFile: any;
  required?: boolean;
  label?: string;
  maxSize?: number;
  onChange: (file: any) => void;
  className?: string;
  size?: 'sm' | 'lg';
  uploadedFileUrl?: string;
  nameOfFile?: string;
  hasError?: boolean | string;
  displayProfileImage?: boolean;
}

export interface ICongratulationsPageProps {
  headerText?: string;
  bodyText: string;
  buttonLabel: string;
  redirectLink: string;
  containerClass?: string;
  fullHeight?: boolean | undefined;
}

export interface IAlert {
  msg: string;
  variant?: 'error' | 'warning' | 'success';
  header?: string;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  className?: string;
  style?: React.CSSProperties;
}

export interface IFilter {
  q: string;
  provider: string;
  status: string;
  date: string | object;
}

export interface ITableProps {
  columns: object[];
  dataSource: object[];
  tableClassName?: string;
  containerClassName?: string;
  pagination?: object;
  loading?: boolean;
  locale?: any;
  onRowClick?: (record?: object | any, index?: number) => void;
}

export interface IDetailDrawer {
  visible: boolean;
  height?: string | number;
  width?: string | number;
  smWidth?: string;
  className?: string;
  children: JSX.Element[] | JSX.Element;
  handleClose: () => void;
}

export interface ILPTable {
  handleMenuClick: () => void;
  isOpenMobileFilter: boolean;
  setisOpenMobileFilter: (isOpenMobileFilter: boolean) => void;
  columns: ColumnsType<ISPVTAbleDataType>;
  getData: () => void;
  handleInvestmentClick: (investmentId: string) => void;
  getSyndicateCarry: (amount: string | number) => string;
}

export interface IFMTable {
  columns: ColumnsType<IFundManager>;
  showDetail: (val: any) => void;
  isMini?: boolean;
}

export interface IGeneralLPTable {
  columns: ColumnsType<ILP>;
  showDetail: (val: any) => void;
  isMini?: boolean;
}

export interface IPaginateRequestPayload {
  take?: string;
  cursor?: string;
  lastItemId?: string;
}
