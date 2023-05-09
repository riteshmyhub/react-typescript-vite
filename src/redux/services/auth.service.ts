import { createAsyncThunk } from "@reduxjs/toolkit";
import environment from "../../environment/environment";

export default class AuthService {
   constructor() {}

   _login = createAsyncThunk("auth/login", async (userObj: { email: string; password: string; returnSecureToken: boolean }, thunkAPI) => {
      try {
         const { data } = await environment.firebase_auth_api.post(`/accounts:signInWithPassword`, userObj);
         return data;
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error?.response?.data?.error);
      }
   });

   _register = createAsyncThunk("auth/register", async (userObj: { email: string; password: string; returnSecureToken: boolean }, thunkAPI) => {
      try {
         const { data } = await environment.firebase_auth_api.post(`/accounts:signUp`, userObj);
         return data;
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error?.response?.data?.error);
      }
   });

   _logout = createAsyncThunk("auth/logout", () => {
      const logout = new Promise((resolve, reject) => {
         let isError = false;
         setTimeout(() => {
            if (isError) {
               reject({ message: "logout error" });
            } else {
               resolve("logout successfully");
            }
         }, 1000);
      });
      const response = logout.then((res) => res);
      return response;
   });

   _user_on_load = createAsyncThunk("auth/auth_user", async (_, thunkAPI) => {
      try {
         let token = { idToken: localStorage.getItem("token") };
         const { data } = await environment.firebase_auth_api.post(`/accounts:lookup`, token);
         return data.users[0].providerUserInfo[0];
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error?.response?.data?.error);
      }
   });
}
