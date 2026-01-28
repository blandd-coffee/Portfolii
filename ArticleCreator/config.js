/**
 * Configuration for Article Creator
 * Change API_URL to match your backend server
 */

// Development: http://localhost:3000/api
// Production: Update to your production server URL
const API_URL = localStorage.getItem("apiUrl") || "http://localhost:3000/api";

// Optional: Set API URL at runtime
function setApiUrl(url) {
  localStorage.setItem("apiUrl", url);
  location.reload();
}

export { API_URL, setApiUrl };
