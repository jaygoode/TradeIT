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

  const decreaseHandler = (product: any) => {
    console.log(product.quantity);
    if (product.quantity > 1) {
      dispatch(decreaseProductAmount(product));
    } else {
      dispatch(deleteFromCart(product));
    }
  };

  const CartItemCards = (props: any) => {
    return (
      <>
        <Card key={props.id} className="product">
          <CardMedia
            onClick={() => navigate(`${props.id}`)}
            height="200"
            component="img"
            image={props.image}
            alt=""
          />
          <CardContent>
            <Typography>{props.title}</Typography>
            <Typography>${props.price}</Typography>
            <Typography>{props.category}</Typography>
          </CardContent>
          <CardActions>
            <Fab
              size="small"
              color="primary"
              aria-label="increase"
              onClick={() => increaseHandler(props.product)}
            >
              <AddIcon />
            </Fab>
            <Typography variant="h6" component="h2">
              {props.quantity}
            </Typography>
            <Fab
              size="small"
              color="secondary"
              aria-label="decrease"
              onClick={() => decreaseHandler(props.product)}
            >
              <RemoveIcon />
            </Fab>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(props.product)}
            >
              Remove
            </Button>
          </CardActions>
        </Card>
      </>
    );
  };

  return (
    <div className="cart-page">
      <div className="cart-card">
        <CardContent>
          <div className="product-section">
            {products && products.length > 1 ? (
              products.map((product) => (
                <CartItemCards
                  quantity={product.quantity}
                  price={product.price}
                  title={product.title}
                  category={product.category.name}
                  image={product.images}
                  product={product}
                />
              ))
            ) : (
              <Typography>Cart is empty.</Typography>
            )}
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
