import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { login } from "../reducers/userReducer";
import { fetchUsers } from "../reducers/userReducer";

import {
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Box,
  TextField,
} from "@mui/material";

const Profile = () => {
  const users = useAppSelector((state) => state.userReducer);
  const currentUser = useAppSelector((state) => state.userReducer.currentUser);
  console.log(users);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const loginHandler = () => {
    console.log(email + password);
    dispatch(login({ email, password }));

    const userList = () => {
      if (users) {
        return users.userList.map((user) => (
          <div key={user.id}>
            <img src={user.avatar} alt="user avatar"></img>
            <p>{user.name}</p>
            <p>{user.role}</p>
            <p>{user.email}</p>
          </div>
        ));
      }
    };
  };

  return (
    <div className="profile-page">
      {currentUser ? (
        <Container className="profie-page">
          <Typography>Profile Page</Typography>
          <FormControl className="login-form">
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button onClick={() => loginHandler()}>Login</Button>
          </FormControl>
        </Container>
      ) : (
        <div className="profile-page">
          {/* <Card className="profile-card">
            <CardContent>
              <div key={currentUser.id}>
                <img src={currentUser.avatar} alt="user avatar"></img>
                <p>{currentUser.name}</p>
                <p>{currentUser.role}</p>
                <p>{currentUser.email}</p>
              </div>
            </CardContent>
          </Card> */}

          <Typography>Profile Page</Typography>
          <Card className="profile-card">
            <CardContent className="profile-card"></CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Profile;
