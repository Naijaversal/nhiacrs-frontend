import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";


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
          <select disabled
            name="category"
            value={product?.category}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="ICT">ICT</option>
            <option value="Furniture">Furniture</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Stationery">Stationery</option>
            <option value="Others">Others</option>
          </select>

          <label>Item Price:</label>
          <input
           disabled
            type="text"
            placeholder="Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>Quantity Available:</label>
          <input disabled
            type="text"
            placeholder="Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

            <label className="--center-all"><h2>Quantity Needed:</h2></label>
          <input
            type="text"
            placeholder="Quantity"
            name="requestQuantity"
            value={request?.requestQuantity}
            onChange={handleInputChange}
          />

          <label>Reason for request:</label>
          <input
            type="text"
            placeholder="reason"
            name="requestReason"
            value={request?.requestReason}
            onChange={handleInputChange}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-success">
              Send Request
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};



export default RequestForm;
