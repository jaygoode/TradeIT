import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { deleteProductAsync, fetchProducts } from "../reducers/productReducer";
import { addToCart, increaseProductAmount } from "../reducers/cartReducer";
import { ProductsInCart } from "../types/cart";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

const Products = () => {
  const products = useAppSelector((state) => state.productReducer.productList);
  const cartItems = useAppSelector((state) => state.cartReducer);
  const [perPage, setPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState("price");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onDelete = (id: string) => {
    dispatch(deleteProductAsync(id));
  };
  const onChange = (input: "left" | "right") => {
    if (page > 0 && input === "left") {
      setPage(page - 1);
    } else {
      setPage(page + 1);
    }
    dispatch(fetchProducts({ offset: page, limit: perPage }));
  };

  const sortingSelect: void = useEffect(() => {
    dispatch(fetchProducts({ offset: page, limit: perPage, sorting: sorting }));
  }, [sorting, perPage]);

  const addToCartHandler = (product: ProductsInCart) => {
    if (cartItems.products.length > 0) {
      console.log(cartItems.products[0].id);
    }

    dispatch(increaseProductAmount(product));
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <>
      <div className="products-container">
        <div className="sorting-container">
          <FormControl className="sorting-form">
            <InputLabel id="sorting-label">Sort by</InputLabel>
            <Select
              labelId="sorting-label"
              id="sorting-select"
              value={sorting}
              label="Age"
              onChange={(e) => setSorting(e.target.value)}
            >
              <MenuItem value="category">Category</MenuItem>
              <MenuItem value="price">Price</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={() => onChange("left")}>
            <ChevronLeftIcon />
          </IconButton>
          <FormControl className="perPage-form">
            <InputLabel id="perPage-label">items</InputLabel>
            <Select
              labelId="perPage-label"
              id="perPage-select"
              value={sorting}
              label="items"
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              <MenuItem value={20}>20 </MenuItem>
              <MenuItem value={60}>60 </MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={() => onChange("right")}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <div className="product-section">
          {products.map((product) => (
            <Card key={product.id} className="product">
              <CardMedia
                onClick={() => navigate(`${product.id}`)}
                // className="products__container__img"
                height="200"
                component="img"
                image={product.images[0]}
                alt=""
              />
              <CardContent>
                <Typography>{product.title}</Typography>
                <Typography>${product.price}</Typography>
                <Typography>{product.category.name}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => addToCartHandler({ ...product, quantity: 1 })}
                >
                  Add to cart
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(product.id)}
                >
                  delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>

        <div className="bottom-buttons">
          <IconButton onClick={() => onChange("left")}>
            <ChevronLeftIcon />
          </IconButton>
          <FormControl className="perPage-form">
            <InputLabel id="perPage-label">items</InputLabel>
            <Select
              labelId="perPage-label"
              id="perPage-select"
              value={sorting}
              label="items"
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              <MenuItem value={20}>20 </MenuItem>
              <MenuItem value={60}>60 </MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={() => onChange("right")}>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Products;
