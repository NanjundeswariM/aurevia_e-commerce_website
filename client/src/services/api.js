import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("aureviaToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export const getAllProducts = async (category) => {
    const response = await API.get("/products", {
        params: category ? { category } : {}
    });
    return response.data.products || [];
};
export const getProductsBySection = async (section) => {
    const response = await API.get("/products", {
        params: { section }
    });
    console.log("Section products:", response.data);
    return response.data.products || [];
};
export const getProductById = async (id) => {
    const response = await API.get(`/products/${id}`);
    return response.data.product;
};
export const createOrder = async (orderData) => {
    const response = await API.post("/orders", orderData);
    return response.data;
};
export const getMyOrders = async () => {
    const response = await API.get("/orders/my-orders");
    return response.data;
};
export const getAllOrders = async () => {
    const response = await API.get("/orders/all");
    return response.data;
};
export const updateOrderStatus = async (orderId, orderStatus) => {
    const response = await API.put(
        `/orders/${orderId}/status`,
        { orderStatus }
    );
    return response.data;
};
export const createProduct = async (productData) => {
    const response = await API.post("/products", productData);
    return response.data;
};
export const updateProduct = async (id, productData) => {
    const response = await API.put(`/products/${id}`, productData);
    return response.data;
};
export const deleteProduct = async (id) => {
    const response = await API.delete(`/products/${id}`);
    return response.data;
};
export const getTotalCustomers = async () => {
    const response = await API.get("/auth/customers/count");
    return response.data;
};
export default API;
export const getTotalRevenue = async () => {
  const response = await API.get("/orders/revenue");
  return response.data;
};