import { useParams } from "react-router-dom";
import useProduct from "../hooks/hooks";

const SingleProduct = () => {
  const { productId } = useParams();
  // const products = useAppSelector((state) => state.productReducer);
  const product = useProduct(productId);

  return (
    <div>
      {product ? (
        <div className="single-product-container">
          <img
            className="products__container__img"
            src={product.images[0]}
            alt={product.title}
          />
          <p>{product.id}</p>
          <p>${product.price}</p>
          <p>{product.title}</p>
        </div>
      ) : (
        <div>product does not exist</div>
      )}
    </div>
  );
};

export default SingleProduct;
