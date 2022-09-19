import { createSlice } from "@reduxjs/toolkit";

export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employeesList: "",
    newEmployee: { state: "", city: "", department: "" },
  },
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

    addNewEmployeeState: (state, action) => {
      state.newEmployee.state = action.payload;
    },
    addNewEmployeeCity: (state, action) => {
      state.newEmployee.city = action.payload;
    },
    addNewEmployeeDepartment: (state, action) => {
      state.newEmployee.department = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addemployeesList,
  resetAll,
  addEmployeeToList,
  addNewEmployeeState,
  addNewEmployeeCity,
  addNewEmployeeDepartment,
} = employeesSlice.actions;

export default employeesSlice.reducer;
