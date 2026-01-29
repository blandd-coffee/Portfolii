import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.error("Resource not found:", error.config.url);
    } else if (error.response?.status === 500) {
      console.error("Server error:", error.response.data);
    } else if (!error.response) {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  },
);

// API route functions
export const getArticles = () => axiosInstance.get("/article");
export const getArticle = (slug: string) =>
  axiosInstance.get(`/article/${slug}`);
export const getCategories = () => axiosInstance.get("/catagories");
export const getArticlesByCategory = (name: string) =>
  axiosInstance.get(`/catagories/${name}/articles`);
export const getPages = () => axiosInstance.get("/pages");
export const getPage = (slug: string) => axiosInstance.get(`/pages/${slug}`);

export default axiosInstance;
export { API_BASE_URL };
