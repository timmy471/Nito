export interface IUser {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
  lastLogin?: string;
}

export interface ILoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface ILoginFormProps {
  onSubmitForm: (values: ILoginFormData) => void;
  passwordVisibility: boolean;
  setPasswordVisibility: (value: boolean) => void;
}

export interface IForgotPasswordFormData {
  email: string;
}

export interface IForgotPasswordActionType {
  payload?: IForgotPasswordFormData;
  cb?: () => void;
}

export interface IVerifyOTPFormData {
  otp: string;
}

export interface IVerifyOTPProps {
  onSubmitForm: (values: IVerifyOTPFormData) => void;
}

export interface INewPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface INewPasswordFormProps {
  onSubmitForm: (values: INewPasswordFormData) => void;
}

export interface INewPasswordActionType {
  payload?: INewPasswordFormData;
  cb?: () => void;
}

export interface IAuthInitialState {
  user: IUser;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}
