import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, Product } from "../redux/slices/productSlice";
import { AppDispatch, RootState } from "../redux/store";
import ProductCard from "./ProductCard";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [noOfProducts, setNoOfProducts] = useState(8);
  const products = useSelector(
    (state: RootState) => state.products.filteredItems
  ).slice(0, noOfProducts);
  const totalProducts = useSelector(
    (state: RootState) => state.products.filteredItems.length
  );

  const loadMore = useCallback(() => {
    setNoOfProducts((prev) => prev + 8);
  }, [totalProducts]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 250) {
      noOfProducts < totalProducts && loadMore();
    }
  }, [loadMore, noOfProducts, totalProducts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="bg-white" id="product-list-container">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-32 gap-y-20 sm:grid-cols-2 lg:grid-cols-4 ">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
