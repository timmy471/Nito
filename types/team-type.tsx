export interface IAdminUser {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isEnabled?: boolean;
  roleId?: string;
  createdAt?: string;
}

export interface IAdminUserQueryParam {
  searchFilter?: string;
  cursor?: string;
}

export interface ITeamInitialState {
  users: IAdminUser[] | null;
  loading: boolean;
  currentUser: IAdminUser | null;
  count: number;
  queryParams: IAdminUserQueryParam;
}
