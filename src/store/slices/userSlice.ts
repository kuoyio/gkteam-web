import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileResponse } from "@/src/type";

interface UserState {
  userProfile: UserProfileResponse | null;
}

const initialState: UserState = {
  userProfile: null,
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
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
