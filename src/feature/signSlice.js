import { createSlice } from "@reduxjs/toolkit";

export const signSlice = createSlice({
  name: "sign",
  initialState: { responseLogin: "", responseProfile: "" },
  reducers: {
    addSignInResponse: (state, action) => {
      state.responseLogin = action.payload;
    },

    addProfileResponse: (state, action) => {
      state.responseProfile = action.payload;
    },

    resetAll: (state) => {
      state.responseLogin = "";
      state.responseProfile = "";
    },

    changeFirstName: (state, action) => {
      state.responseProfile.body.firstName = action.payload;
    },

    changeLastName: (state, action) => {
      state.responseProfile.body.lastName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addSignInResponse,
  addProfileResponse,
  resetAll,
  changeFirstName,
  changeLastName,
} = signSlice.actions;

export default signSlice.reducer;
