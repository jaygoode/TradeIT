import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import {
  increaseProductAmount,
  deleteFromCart,
  decreaseProductAmount,
} from "../reducers/cartReducer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Fab,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../types/product";
import { ProductsInCart } from "../types/cart";

const Cart = () => {
  const products = useAppSelector((state) => state.cartReducer.products);
  const productsTotal = useAppSelector((state) => state.cartReducer.total);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onDelete = (product: Product) => {
    dispatch(deleteFromCart(product));
  };

  const increaseHandler = (product: ProductsInCart) => {
    dispatch(increaseProductAmount(product));
  };

  const decreaseHandler = (product: ProductsInCart) => {
    console.log(product.quantity);
    if (product.quantity > 1) {
      dispatch(decreaseProductAmount(product));
    } else {
      dispatch(deleteFromCart(product));
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-card">
        <CardContent>
          <div className="product-section">
            {/* {products.length > 0 ? ({
              products.map((product) => (
                <Card key={product.id} className="product">
                  <CardMedia
                    onClick={() => navigate(`${product.id}`)}
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
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="increase"
                      onClick={() => increaseHandler(product)}
                    >
                      <AddIcon />
                    </Fab>
                    <Typography variant="h6" component="h2">
                      {product.quantity}
                    </Typography>
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="decrease"
                      onClick={() => decreaseHandler(product)}
                    >
                      <RemoveIcon />
                    </Fab>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => onDelete(product)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              ))
            })
              :
              (
                <div>Nothing here</div>
              )
            } */}
          </div>
        </CardContent>
        <CardActions>
          <Typography>TOTAL: ${productsTotal}</Typography>
          <Button variant="contained">Checkout</Button>
          <Button className="cancel-btn" variant="outlined" color="error">
            Cancel
          </Button>
        </CardActions>
      </div>
    </div>
  );
};

export default Cart;
