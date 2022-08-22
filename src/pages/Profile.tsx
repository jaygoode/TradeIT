import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
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
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const users = useAppSelector((state) => state.userReducer.userList);
  console.log(users);
  const currentUser = useAppSelector((state) => state.userReducer.currentUser);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const loginHandler = () => {
    navigate("/login");

    const userList = () => {
      if (users) {
        return users.map((user) => (
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
      <>
        {!currentUser ? (
          <Container className="profile-page">
            <Typography>You are not logged in.</Typography>

            <Button onClick={loginHandler}>Go to login page.</Button>
          </Container>
        ) : (
          <div className="profile-page">
            <Card className="profile-card">
              <CardContent>
                <Typography>Profile Page</Typography>
                <div key={currentUser.id}>
                  <img src={currentUser.avatar} alt="user avatar"></img>
                  <p>{currentUser.name}</p>
                  <p>{currentUser.role}</p>
                  <p>{currentUser.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {currentUser &&
          currentUser.role === "customer" &&
          users.map((user) => {
            <div className="profile-page">
              <Card className="profile-card">
                <CardContent>
                  <div key={user.id}>
                    <img src={user.avatar} alt="user avatar"></img>
                    <p>{user.name}</p>
                    <p>{user.role}</p>
                    <p>{user.email}</p>
                  </div>
                </CardContent>
              </Card>
            </div>;
          })}
      </>
    </div>
  );
};

export default Profile;
