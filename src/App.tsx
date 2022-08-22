import React, { useEffect, useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { fetchProducts } from "./reducers/productReducer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/SingleProduct";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { Box, createTheme } from "@mui/material";
import { yellow, grey, blue, deepPurple, blueGrey } from "@mui/material/colors";
import ThemeContext from "./theme/ThemeContext";
import { ThemeProvider } from "@mui/private-theming";

function App() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productReducer);
  // useEffect(() => {
  //   dispatch(fetchProducts({ offset: 0, limit: 10 }));
  // }, []);
  // const [classname, setClassname] = useState("App");
  const [mode, setMode] = useState<"dark" | "light">("light");
  const themecontext = {
    changeTheme: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    },
  };
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: yellow,
            text: {
              primary: grey[900],
              secondary: grey[500],
            },
            background: {
              default: deepPurple[50],
            },
          }
        : {
            primary: blue,
            text: {
              primary: grey[50],
              secondary: grey[500],
            },
            background: {
              default: blueGrey[900],
            },
          }),
    },
  });
  return (
    <ThemeContext.Provider value={themecontext}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box
            sx={{
              bgcolor: "background.default",
              color: "text.primary",
            }}
          >
            <NavBar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="products">
                <Route path="" element={<Products />} />
                <Route path=":productId" element={<Product />} />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
