import { NoteTypeWithNotesResponse } from "@/src/type";
import ssgClient from "@/src/lib/ssg-client";

export const getAllNoteTypesWithNotes = async () => {
  return await ssgClient.get<NoteTypeWithNotesResponse[]>("/note-types");
};
