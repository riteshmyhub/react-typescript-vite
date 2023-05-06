import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import authReducer from "./slices/auth.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// ...
const store = configureStore({
   reducer: {
      userReducer: userReducer,
      authReducer: authReducer,
   },
});
export default store;

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
