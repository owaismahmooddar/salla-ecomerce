import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import Layout from "@/Layout/Layout";
import { useSelector } from "react-redux";
import { RootState, wrapper } from "@/redux/store";
import { GetServerSideProps } from "next";
import axios from "axios";
import { Product, fetchProductById } from "@/redux/slices/productSlice";
import { addItemToCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface HomeProps {
  initialProduct: Product;
}

const ProductDetails: React.FC<HomeProps> = ({ initialProduct }) => {
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) => state.products.item);
  const breadcrumbs = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: product.category, href: "" },
  ];

  useEffect(() => {
    if (initialProduct) {
      dispatch(fetchProductById.fulfilled(initialProduct, "", ""));
    }
  }, [dispatch, initialProduct]);

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
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={""}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.title}
              </a>
            </li>
          </ol>
        </nav>

        <div className="mx-auto my-20 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-16 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              alt={product.title}
              src={product.image}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center mx-5 md:m-0">
            <div className="pb-10 lg:border-b lg:border-gray-200 lg:pb-16 lg:pr-8 ">
              <div>
                <div className="lg:col-span-2 mb-2 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-cyan-900 sm:text-3xl">
                    {product.title}
                  </h1>
                </div>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-2xl pr-4 pb-16 pt-10 sm:pr-6  lg:gap-x-8 lg:pr-8 lg:pb-24 lg:pt-16">
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <p className="text-3xl tracking-tight text-gray-900">
                  $ {product.price}
                </p>

                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={classNames(
                            product?.rating?.rate > rating
                              ? "text-cyan-900"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                        />
                      ))}
                    </div>
                    <a
                      href={"#"}
                      className="ml-3 text-sm font-medium text-cyan-800 hover:text-cyan-950"
                    >
                      {product?.rating?.count} reviews
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-800 px-8 py-3 text-base font-medium text-white hover:bg-cyan-950 focus:outline-none focus:ring-2 focus:ring-cyan-950 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const id = context.query.productId;
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const initialProduct: Product = response.data;
    store.dispatch(fetchProductById.fulfilled(initialProduct, "", ""));
    return {
      props: {
        initialProduct,
      },
    };
  });

export default Layout(ProductDetails);
