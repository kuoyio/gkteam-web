export interface ChangeItem {
  text: string;
  link?: string;
}

export interface Changes {
  updated: ChangeItem[];
  enhanced: ChangeItem[];
  fixed: ChangeItem[];
  deleted: ChangeItem[];
}

export interface ChangelogResponse {
  id: string;
  version: string;
  releaseDate: string;
  changes: Changes;
}
