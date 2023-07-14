import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";


const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <label>Item Name:</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Item Category:</label>
          <select
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
            type="text"
            placeholder="Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>Item Quantity:</label>
          <input
            type="text"
            placeholder="Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label>Item Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-success">
              Save Item
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
