import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Item Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
            
            <h4>Item Availability: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            
            <hr />
            <div 
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr className="description-set"/>
            <code className="--color-success">
              Created on: {product.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-success">
              Last Updated: {product.updatedAt.toLocaleString("en-US")}
            </code>
             <Link to={`/dashboard`}>
                           <button className="--btn --btn-primary">Back</button>
                           </Link>
          </div>
          
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
