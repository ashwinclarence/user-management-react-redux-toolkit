import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  username: string;
  password: string;
};

type InitialStateType = {
  users: UserType[];
  loading: boolean;
  error: string;
};

const initialState: InitialStateType = {
  users: [],
  error: "",
  loading: false,
};

const ManageUserSlice = createSlice({
  name: "ManageUser",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<UserType>) => {
      state.users = state.users.filter((ele) => {
        if (
          ele.username !== action.payload.username &&
          ele.password !== action.payload.password
        ) {
          return ele;
        }
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { addUser, deleteUser, setError, setLoading } =
  ManageUserSlice.actions;
export default ManageUserSlice.reducer;
