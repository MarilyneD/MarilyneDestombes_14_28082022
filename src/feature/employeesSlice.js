import { createSlice } from "@reduxjs/toolkit";

export const employeesSlice = createSlice({
  name: "employees",
  initialState: { employeesList: "" },
  reducers: {
    addemployeesList: (state, action) => {
      state.employeesList = action.payload;
    },

    resetAll: (state) => {
      state.employeesList = "";
    },

    addEmployeeToList: (state, action) => {
      state.employeesList.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addemployeesList, resetAll, addEmployeeToList } =
  employeesSlice.actions;

export default employeesSlice.reducer;
