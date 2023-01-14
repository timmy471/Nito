export type AssetStatus = 'draft' | 'published';

export interface ISPVAsset {
  name: string;
  address: string;
  country: string;
  industry: string;
  founded: string;
  website: string;
  about: string;
  logo: string;
  founders?: INewAssetFounder[] | any;
  founder?: INewAssetFounder;
}

export interface IAssetQueryParam {
  status?: string;
  searchFilter?: string;
  cursor?: string;
}

type publishAsset = {
  loading: boolean;
};

export interface IAssetInitialState {
  assets: ISPVAsset[] | null;
  count: number;
  queryParams: IAssetQueryParam;
  error: null | string;
  loading: boolean;
  currentAsset: ISPVAsset | null;
  publishAsset: publishAsset;
}

export interface IAssetTableProps {
  hasMore: boolean;
  data: ISPVAsset[];
  loading: boolean;
  getData: () => void;
  showDetail: (val: ISPVAsset) => void;
  getAssetIndustry: (industryToFind: string) => string;
}

export interface IAssetDetailProps {
  asset: ISPVAsset | null;
  getAssetIndustry: (industryToFind: string) => string;
  handleOpenModal: () => void;
}

export interface IAssetModalProps {
  isModalVisible: boolean;
  onCancel: () => void;
  handlePublishConfirm: () => void;
  loading: boolean;
  assetStatus?: AssetStatus;
}

export interface IPublishAssetPayload {
  mode: string;
  assetId?: string;
  cb: () => void;
}

export interface INewAssetFounder {
  name: string;
  jobTitle: string;
  image?: File | undefined;
  imageUrl: string;
}
