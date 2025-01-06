import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
  userCode: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData.push(action.payload);
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
