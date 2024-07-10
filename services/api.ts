import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const getProducts = async () => {
  const response = await apiClient.get(`/products`);
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const saveCartItem = async () => {
  const response = await apiClient.get(`/carts`);
  return response.data;
};

export const getUserCart = async (userId: number) => {
  const response = await apiClient.get(`carts/user/${userId}`);
  return response.data;
};

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await apiClient.post(`/auth/login`, credentials);
  return response.data;
};
