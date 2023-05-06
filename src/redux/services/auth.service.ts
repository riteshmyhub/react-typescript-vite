import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import environment from "../../environment/environment";

export default class AuthService {
   constructor() {}

   _login = createAsyncThunk("auth/login", async (userObj: { email: string; password: string }) => {
      const response = axios
         .post(`${environment.baseUrl}/accounts:signInWithPassword`, userObj, {
            params: { key: environment.apiKey },
         })
         .then((res) => res.data);
      return response;
   });

   _register = createAsyncThunk("auth/register", async () => {
      const response = axios.get("").then((res) => res.data?.users);
      return response;
   });

   _user_on_load = createAsyncThunk("auth/auth_user", async () => {
      let token = { idToken: localStorage.getItem("token") };
      const response = axios
         .post(`${environment.baseUrl}/accounts:lookup`, token, {
            params: {
               key: environment.apiKey,
            },
         })
         .then((res) => res.data);
      return response;
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
         }, 3000);
      });
      const response = logout.then((res) => res);
      return response;
   });
}
