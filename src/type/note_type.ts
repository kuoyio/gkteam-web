export interface NoteTypeWithNotesResponse {
  id: string;
  name: string;
  code: string;
  notes: SimpleNote[];
}

export interface SimpleNote {
  id: string;
  title: string;
  content: string;
  updatedTime: string;
}
