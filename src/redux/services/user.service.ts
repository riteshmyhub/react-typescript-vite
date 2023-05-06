import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export default class UserService {
   constructor() {}
   // _get_all_users
   _get_all_users = createAsyncThunk("user/all_users", async () => {
      const response = axios.get("https://dummyjson.com/users").then((res) => res.data?.users);
      return response;
   });

   // _get_user_info
   _get_user_info = createAsyncThunk("user/user_info", async (id: number) => {
      const response = axios.get(`https://dummyjson.com/users/${id}`).then((res) => res.data);
      return response;
   });
}
