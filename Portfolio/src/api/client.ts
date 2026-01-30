import axios from "axios";

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");
const ensureLeadingSlash = (value: string) =>
  value.startsWith("/") ? value : `/${value}`;

export const API_ORIGIN =
  import.meta.env.VITE_API_URL || "http://localhost:3000";
export const API_ROUTE = import.meta.env.VITE_API_ROUTE || "/api";

export const API_BASE_URL = `${stripTrailingSlash(API_ORIGIN)}${ensureLeadingSlash(API_ROUTE)}`;
export const ASSET_BASE_URL =
  import.meta.env.VITE_ASSET_URL || API_ORIGIN;

const normalizeUploadPath = (value: string) => {
  const normalized = value.replace(/\\/g, "/").replace(/^\/+/, "");
  return normalized.startsWith("uploads/")
    ? normalized.slice("uploads/".length)
    : normalized;
};

export const getUploadUrl = (value: string) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  const path = normalizeUploadPath(value);
  return `${stripTrailingSlash(ASSET_BASE_URL)}/uploads/${path}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.error("Resource not found:", error.config?.url);
    } else if (error.response?.status === 500) {
      console.error("Server error:", error.response?.data);
    } else if (!error.response) {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
