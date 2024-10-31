import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  name: string;
  email: string;
  id: string;
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
    addUser: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((ele) => {
        if (ele.id!==action.payload) {
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

export const { addUser, deleteUser, setError, setLoading } =ManageUserSlice.actions;
export default ManageUserSlice.reducer;
