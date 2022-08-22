import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { login } from "../reducers/userReducer";

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
} from "@mui/material";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const loggedInUser = useAppSelector((state) => state.userReducer.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/profile");
    }
  }, [loggedInUser]);

  const checkUserExist = () => {
    dispatch(login(user));
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container className="login__container">
      <Card className="form-container">
        <div className="form-container">
          <h4>Sign In</h4>
          <form onSubmit={checkUserExist}>
            <h2>Email address</h2>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </form>
          <form>
            <h2>Password</h2>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </form>
          <Button onClick={checkUserExist}>Sign In</Button>
          <p>
            <a href="/signup">Create a new user?</a>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
