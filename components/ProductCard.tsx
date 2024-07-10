import React from "react";
import { Product } from "../redux/slices/productSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/slices/cartSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        imageUrl: product.image,
      })
    );
  };

  return (
    <div className="product-card group">
      <Link
        href={`/product/${product.id}`}
        className="h-80 flex flex-col items-center justify-between"
      >
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            alt={product.title}
            src={product.image}
            className="h-64 w-full object-fill object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      </Link>
      <div className="flex items-center justify-between mt-2">
        <p className=" text-lg font-medium text-gray-900">$ {product.price}</p>
        <button
          onClick={handleAddToCart}
          className=" btn-primary rounded-full bg-cyan-900 px-4 py-1 text-sm text-cyan-50 hover:bg-cyan-700"
        >
          {/* Add to Cart */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
