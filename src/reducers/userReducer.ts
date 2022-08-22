import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginType, UserReducerState, User } from "../types/user";
import axios from "axios";

const initialState: UserReducerState = {
  userList: [],
  currentUser: undefined,
};

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  try {
    const data = await fetch(`https://api.escuelajs.co/api/v1/users`);
    let result = await data.json();
    return result;
  } catch (error: any) {
    console.log("could not fetch users");
  }
});

export const login = createAsyncThunk(
  "login",
  async ({ email, password }: LoginType) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const data = await response.json();
      if (data.access_token) {
        console.log(data.access_token);
        localStorage.setItem("token", JSON.stringify(data.access_token));
        const user = await axios.get(
          `https://api.escuelajs.co/api/v1/auth/profile`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        );
        console.log(data.access_token);
        return user.data;
      }
      return undefined;
    } catch (e: any) {
      console.log(e.message);
    }
  }
);

export const loginByToken = createAsyncThunk(
  "loginByToken",
  async (token: string) => {
    try {
      const data = await fetch(`https://api.escuelajs.co/api/v1/auth/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const user = await data.json();
      if (data.ok) {
        return user;
      } else {
        return undefined;
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }
);

export const createNewUser = createAsyncThunk(
  "createNewUser",
  async (user: User) => {
    const { name, email, password, avatar } = user;
    try {
      const data = await fetch(`https://api.escuelajs.co/api/v1/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          avatar: avatar,
        }),
      });
      const result = await data.json();
      return result;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    logout: (state, action: any) => {
      console.log("test");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.userList = action.payload;
        return state;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
        return state;
      })
      .addCase(loginByToken.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
        return state;
      })
      .addCase(
        createNewUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.currentUser = action.payload;
          return state;
        }
      );
  },
});

export const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
