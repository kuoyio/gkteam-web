import LocalStorageUtil from "./localstorage-util";
import { store } from "@/src/store";
import { clearUserProfile } from "@/src/store/slices/userSlice";

export const logout = () => {
  LocalStorageUtil.remove("token");
  store.dispatch(clearUserProfile());
};

