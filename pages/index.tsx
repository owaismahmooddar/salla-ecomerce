import { GetServerSideProps } from "next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchProducts, Product } from "../redux/slices/productSlice";
import ProductList from "../components/ProductList";
import { wrapper } from "../redux/store";
import axios from "axios";
import { useEffect } from "react";
import Layout from "@/Layout/Layout";
import { fetchCartItems } from "@/redux/slices/cartSlice";
import { loadUserFromLocalStorage } from "@/redux/slices/authSlice";

interface HomeProps {
  initialProducts: Product[];
}

const Home: React.FC<HomeProps> = ({ initialProducts }) => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.products.filteredItems
  );
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
    if (initialProducts.length) {
      dispatch(fetchProducts.fulfilled(initialProducts, ""));
    }
  }, [dispatch, initialProducts]);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(fetchCartItems());
  //   }
  // }, [token]);

  return (
    <div className="container mx-auto px-4 py-8">
      {products.length ? (
        <ProductList />
      ) : (
        <div className="h-screen flex justify-center items-center text-lg font-bold text-cyan-700">
          No Products to Show
        </div>
      )}
    </div>
  );
};

// Fetch products on the server
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    const initialProducts: Product[] = response.data;

    store.dispatch(fetchProducts.fulfilled(initialProducts, ""));

    return {
      props: {
        initialProducts,
      },
    };
  });

export default Layout(Home);
