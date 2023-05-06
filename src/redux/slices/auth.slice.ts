import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";

type AuthUser = {
   profile: {
      name: string;
      email: string;
      image: string;
   };
   allowRoles: string[];
};

type AuthStateType = {
   rootLoading: boolean;
   loading: boolean;
   isAuthenticate: boolean;
   user: AuthUser | null;
   error: string;
};

let initialState: AuthStateType = {
   rootLoading: true,
   loading: false,
   isAuthenticate: false,
   user: null,
   error: "",
};
const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {},
   extraReducers(builder) {
      const { _login, _logout, _user_on_load } = new AuthService();

      //***********************_login***********************
      builder.addCase(_login.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(_login.fulfilled, (state, action) => {
         localStorage.setItem("token", action.payload.idToken);
         state.loading = false;
         state.isAuthenticate = true;
         state.error = "";
      });
      builder.addCase(_login.rejected, (state, action) => {
         state.loading = false;
         state.isAuthenticate = false;
         state.error = action.error.message || "something went wrong!";
      });

      //***********************_user_on_load*************************
      builder.addCase(_user_on_load.pending, (state) => {
         state.rootLoading = true;
      });
      builder.addCase(_user_on_load.fulfilled, (state, action) => {
         let data = action.payload.users[0].providerUserInfo[0];

         let authUser = Object.freeze({
            profile: {
               name: data.displayName,
               email: data.email,
               image: data.photoUrl,
            },
            allowRoles: ["user", "admin"],
         });
         state.rootLoading = false;
         state.user = authUser;
         state.error = "";
      });
      builder.addCase(_user_on_load.rejected, (state, action) => {
         state.rootLoading = false;
         state.user = null;
         state.error = action.error.message || "something went wrong!";
      });

      //***********************logout***********************
      builder.addCase(_logout.pending, (state) => {
         state.rootLoading = true;
      });

      builder.addCase(_logout.fulfilled, (state) => {
         localStorage.clear();
         state.rootLoading = false;
         state.isAuthenticate = false;
         state.user = null;
         state.error = "";
      });

      builder.addCase(_logout.rejected, (state, action) => {
         state.rootLoading = false;
         state.error = action.error.message || "something went wrong!";
      });
   },
});
export default authSlice.reducer;
