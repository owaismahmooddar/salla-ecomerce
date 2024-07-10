import {
  act,
  getByLabelText,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import ProductList from "../components/ProductList";
import { fetchProducts } from "../redux/slices/productSlice";

// Mock API call
jest.mock("../services/api", () => ({
  getProducts: jest.fn().mockResolvedValue([
    {
      id: 1,
      title: "Product 1",
      price: 29.99,
      description: "Description for product 1",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Product 2",
      price: 39.99,
      description: "Description for product 2",
      image: "https://via.placeholder.com/150",
    },
  ]),
}));

describe("ProductList Component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <ProductList />
        </Provider>
      );
      await store.dispatch(fetchProducts());
    });
  });

  it("should display product titles and prices", async () => {
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$ 29.99")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("$ 39.99")).toBeInTheDocument();
  });
});
