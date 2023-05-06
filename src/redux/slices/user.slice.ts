import UserService from "../services/user.service";
import { UserType } from "../interfaces/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = {
   loading: boolean;
   users: UserType[] | [];
   user: UserType | null;
   error: string;
};

const initialState: UserState = {
   loading: true,
   users: [],
   user: null,
   error: "",
};

export const userSlice = createSlice({
   name: "user",
   initialState: initialState,
   reducers: {},
   extraReducers(builder) {
      let { _get_all_users, _get_user_info } = new UserService();

      // Todo:_get_all_users
      builder.addCase(_get_all_users.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(_get_all_users.fulfilled, (state, action: PayloadAction<UserType[]>) => {
         console.log(action.payload);
         state.loading = false;
         state.users = action.payload;
         state.error = "";
      });
      builder.addCase(_get_all_users.rejected, (state, action) => {
         state.loading = false;
         state.users = [];
         state.error = action.error.message || "something went wrong!";
      });

      // Todo:_get_users info
      builder.addCase(_get_user_info.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(_get_user_info.fulfilled, (state, action: PayloadAction<UserType>) => {
         state.loading = false;
         state.user = action.payload;
         state.error = "";
      });
      builder.addCase(_get_user_info.rejected, (state, action) => {
         state.loading = false;
         state.user = null;
         state.error = action.error.message || "something went wrong!";
      });

      // Todo:_get_users info
   },
});

export default userSlice.reducer;
