import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../feature/employeesSlice";

export default configureStore({
  reducer: { employees: employeesReducer },
});
