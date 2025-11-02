import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileResponse } from "@/src/type/user";

interface UserState {
  userProfile: UserProfileResponse | null;
  loading: boolean;
}

const initialState: UserState = {
  userProfile: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfileResponse>) => {
      state.userProfile = action.payload;
    },
    clearUserProfile: (state) => {
      state.userProfile = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUserProfile, clearUserProfile, setLoading } = userSlice.actions;
export default userSlice.reducer;
