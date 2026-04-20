import axios from "axios";

const Instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  }, 
});

console.log(import.meta.env.VITE_BASE_URL);

const getFreshToken = async () => {
  try {
    console.log("🔄 Fetching fresh token...");
    const baseURL = import.meta.env.VITE_BASE_URL;
    const response = await axios.post(
      `${baseURL}/api/auth`,
      {
        user_name: "dhaval",
      },
    );

    const newToken = response.data.token;

    if (newToken) {
      localStorage.removeItem("authToken");
      localStorage.setItem("authToken", newToken);
      console.log("✅ New token saved.");
      return newToken;
    }
  } catch (err) {
    console.error("❌ Auto-login failed:", err);
  }
  return null;
};

// --- REQUEST INTERCEPTOR ---
Instance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("authToken");

    // CRITICAL FIX: Your storage is mashed together.
    // If token is too long or contains other keys like "dataColor" or "unique_user_id", it's corrupt.
    const isCorrupt =
      token &&
      (token.includes("dataColor") ||
        token.includes("unique_user_id") ||
        token.includes("user_id"));

    if (!token || token === "undefined" || isCorrupt) {
      console.warn("🧹 Storage Corrupt or Missing. Cleaning and refreshing...");
      localStorage.removeItem("authToken");
      token = await getFreshToken();
    }

    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// --- RESPONSE INTERCEPTOR ---
Instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 OR the specific "Token not found" error message in the response
    const isAuthError =
      error.response?.status === 401 ||
      error.response?.data?.message ===
        "Token not found. Please generate a new token";

    if (isAuthError && !originalRequest._retry) {
      originalRequest._retry = true;
      console.warn("⚠️ Auth Error detected. Retrying with fresh token...");

      localStorage.removeItem("authToken");
      const newToken = await getFreshToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default Instance;
