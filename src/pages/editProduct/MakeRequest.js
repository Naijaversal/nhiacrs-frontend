import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import RequestForm from "../../components/product/productForm/RequestForm";
import {
  getProduct,
  selectIsLoading,
  selectProduct,
  updateProduct
} from "../../redux/features/product/productSlice";

import {
  createRequest
} from "../../redux/features/product/requestSlice";


const MakeRequest = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

 const [product, setProduct] = useState(productEdit);
  const [description, setDescription] = useState("");
  const [requestedQuantity, setRequestedQuantity] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);
    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("description", description);
     formData.append("requestedQuantity", requestedQuantity);

    await dispatch(createRequest(formData));
    // await dispatch(getProducts());
    console.log(...formData);

    await dispatch(updateProduct({ id, formData }));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Request Item</h3>
      <RequestForm
        product={product}
        description={description}
        setDescription={setDescription}
       requestedQuantity={requestedQuantity} setRequestedQuantity={setRequestedQuantity}
        handleInputChange={handleInputChange}
        createRequest={sendRequest}
      />
    </div>
  );
};

export default MakeRequest;
