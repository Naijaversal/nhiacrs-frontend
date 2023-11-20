import React, { useEffect } from "react";
import "./ProductSummary.scss";
import {BsBagX, BsBagCheck } from "react-icons/bs";
import { AiOutlineFolderOpen } from "react-icons/ai";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  selectCategory,
  selectOutOfStock,
} from "../../../redux/features/product/productSlice";

// Icons
const productIcon = <BsBagCheck size={40} color="#fff" />;
const categoryIcon = <AiOutlineFolderOpen size={40} color="#fff" />;
const outOfStockIcon = <BsBagX size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Items"}
          count={products.length}
          bgColor="card1"
        />
        
        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default ProductSummary;
