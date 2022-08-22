import { useParams } from "react-router-dom";
import useProduct from "../hooks/hooks";
import { ProductsInCart } from "../types/cart";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { addToCart, increaseProductAmount } from "../reducers/cartReducer";
import { deleteProductAsync, fetchProducts } from "../reducers/productReducer";
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

const SingleProduct = () => {
  const { productId } = useParams();
  // const products = useAppSelector((state) => state.productReducer);
  const product = useProduct(productId);
  const cartItems = useAppSelector((state) => state.cartReducer.products);
  const dispatch = useAppDispatch();

  const addToCartHandler = (product: ProductsInCart) => {
    let check = cartItems.includes(product, 0);
    if (check) {
      dispatch(increaseProductAmount(product));
    } else dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const onDelete = (id: string) => {
    dispatch(deleteProductAsync(id));
  };

  return (
    <div className="single-product-container">
      {product ? (
        <Card key={product.id} className="product">
          <CardMedia
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
      ) : (
        <div>product does not exist</div>
      )}
    </div>
  );
};

export default SingleProduct;
