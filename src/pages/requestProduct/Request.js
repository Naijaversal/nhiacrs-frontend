import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import RequestForm from "../../components/product/productForm/RequestForm";
import {
  requestProduct,
  selectIsLoadingRequest,
} from "../../redux/features/product/productSlice";
import { getProduct } from "../../redux/features/product/productSlice";

const initialState = {
    id: "",
    requestQuantity: "",
    requestReason: "",
  };
  
  const RequestProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [request, setRequest] = useState(initialState);
    const isLoading = useSelector(selectIsLoadingRequest,);
  
    const { id, requestQuantity, requestReason } = request;
    const { name, category, price, quantity } = product;
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRequest({ ...request, [name]: value });
    };
  
    const saveRequest = async (e) => {
      e.preventDefault();
      const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("price", price);
    formData.append("requestQuantity", requestQuantity); 
    formData.append("requestReason", requestReason);
   
    console.log(...formData);

      await dispatch(
        requestProduct({
          id,
          requestQuantity,
          requestReason,
        })
      );
  
      navigate("/all-request");
    };
  
    return (
      <div>
        {isLoading && <Loader />}
        <h3 className="--mt">Request Product</h3>
        <RequestForm
          request={request}
          handleInputChange={handleInputChange}
          saveRequest={saveRequest}
        />
      </div>
    );
  };
  
  export default RequestProduct;