export enum NoteType {
  FOLDER = "FOLDER",
  ARTICLE = "ARTICLE",
}

export interface NoteTreeResponse {
  id: string;
  parentId: string | null;
  type: NoteType;
  title: string;
  content: string | null;
  icon: string | null;
  updatedTime: string;
  children: NoteTreeResponse[];
}
