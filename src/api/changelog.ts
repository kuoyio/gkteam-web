import ssgClient from "@/src/lib/ssg-client";
import { ChangelogResponse } from "@/src/type/changelog";

export const getChangelogs = async () => {
  return await ssgClient.get<ChangelogResponse[]>("/changelogs");
};
