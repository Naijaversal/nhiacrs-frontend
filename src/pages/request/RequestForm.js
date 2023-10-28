import React from "react";
import Card from "../../components/card/Card.js";
import { Link } from "react-router-dom";
import "./RequestForm.scss";


const RequestForm = ({
  request,
  product,
  handleInputChange,
  saveRequest,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveRequest}>
          <label>Item Name:</label>
          <input disabled
            type="text"
            placeholder="Name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Item Category:</label>
          <input disabled
            type="text"
            placeholder="Category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />

          <label>Item Price:</label>
          <input disabled
            type="text"
            placeholder="Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>Item Quantity:</label>
          <input disabled
            type="text"
            placeholder="Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label><h3>Request Quantity:</h3></label>
          <input
            type="text"
            placeholder="Quantity"
            name="requestQuantity"
            value={request?.requestQuantity}
            onChange={handleInputChange}
          />

          <label><h3>Request Description:</h3></label>
          <input
            type="text"
            placeholder="Description"
            name="requestDescription"
            value={request?.requestDescription}
            onChange={handleInputChange}
          />

          <div className="requestForm">
            <button type="submit" className="--btn --btn-success">
              Send Request
            </button>
            <Link to="/Dashboard">
              <button className="--btn --btn-primary">Back</button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RequestForm;
