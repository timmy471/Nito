export type UserTypes = {
  limitedPartner: string;
  fundManager: string;
};

export type InvestmentStatuses = {
  initiated: string;
  committed: string;
  paymentPending: string;
  paymentComplete: string;
};

export type SourceOfWealthOptions = {
  Personal: string;
  Business: string;
  Employment: string;
  Others: string;
};

export type TransactionTypeOptions = {
  Primary: string;
  Secondary: string;
};

export type ShareClassOptions = {
  Common: string;
  Preferred: string;
};

export type S3ConfigType = {
  bucketName: string | undefined;
  region: string | undefined;
  accessKeyId: string | undefined;
  secretAccessKey: string | undefined;
};

export type OnboardingRegistrationTypes = {
  individual: string;
  ventureCapital: string;
};
