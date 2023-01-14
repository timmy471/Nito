export interface IRole {
  id: string;
  name: string;
  permissions: IPermission[];
}

export interface IPermission {
  id: string;
  name: string;
  group: string;
}

export interface IRoleInitialState {
  roles: IRole[];
  loading: boolean;
  isSubmitting: boolean;
  permissions: any;
  currentRole: null | IRole;
}
