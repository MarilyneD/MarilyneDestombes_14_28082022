import { configureStore } from "@reduxjs/toolkit";
import signReducer from "../feature/signSlice";

export default configureStore({
  reducer: { sign: signReducer },
});
