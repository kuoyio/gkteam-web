import { cache } from "react";
import { NoteTreeResponse } from "@/src/type";
import ssgClient from "@/src/lib/ssg-client";

export const getNoteTree = cache(async () => {
  return await ssgClient.get<NoteTreeResponse[]>("/notes");
});
