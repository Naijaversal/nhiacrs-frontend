import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import "./ProductForm.scss";
import { Link } from "react-router-dom";

const RequestForm = ({
  product,
  description,
  setDescription,
  handleInputChange,
  sendRequest,
  setRequestedQuantity,
  requestedQuantity
}) => {
  const modules = {
    toolbar: false, // Disable the toolbar
  };
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={sendRequest}>
         
          <label>Item Name:</label>
          <input
          disabled
            type="text"
            placeholder="name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Item Category:</label>
          <input
            type="text"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
            required
            disabled
          />

          <label>Quantity Available:</label>
          <input
          disabled
            type="text"
            name="Quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label>Quantity Needed:</label>
          <input
            type="text"
            placeholder="Quantity"
            name="requestedQuantity"
            value={requestedQuantity}
            onChange={setRequestedQuantity}
             
          />

          <label>Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={modules}
            readOnly
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-success">
              Submit Request
            </button>
          </div>
        <div>
          <Link to="/dashboard">
                  <button className="--btn --btn-secondary">Back</button>
                </Link>
        </div>

        </form>
      </Card>
    </div>
  );
};


export default RequestForm;
