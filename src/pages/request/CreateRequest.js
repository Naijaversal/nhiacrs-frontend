import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import RequestForm from "./RequestForm";
import {
  createRequest,
  selectIsLoading,
} from "../../redux/features/request/requestSlice";
import { 
  getProduct,
  getProducts,
  selectProduct,
 } from "../../redux/features/product/productSlice";
import {toast} from "react-toastify";


const CreateRequests = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = dispatch(getProduct(id));

  const initialState = {
    name: product?.name,
    category: product?.category,
    quantity: product?.quantity,
    price: product?.price,
    requestQuantity: "",
    requestDescription: "",
  };

  const [request, setRequest] = useState(initialState);
  const isLoading = useSelector(selectIsLoading);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const saveRequest = async (id, e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", request.name);
    formData.append("category", request.category);
    formData.append("price", request.price);
    formData.append("quantity", request.quantity);
    formData.append("requestQuantity", request.requestQuantity);
    formData.append("requestDescription", request.requestDescription);

    await dispatch(createRequest(formData));
    toast.success("Request created successfully!");
    navigate("/Dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Make Request</h3>
      <RequestForm
        product={product}
        request={request}
        handleInputChange={handleInputChange}
        saveRequest={saveRequest}
      />
    </div>
  );
};

export default CreateRequests;