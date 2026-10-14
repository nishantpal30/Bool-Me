import axios from "axios";

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://bool-me.onrender.com/api",
    withCredentials: true,           
});
// http://localhost:8080/
// (Optional) CSRF header for non-GET requests, if backend requires it
client.interceptors.request.use((config) => {
    // Regex-based extraction — handles "=" in the value
    const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
    const csrf = match?.[1];

    if (csrf) {
        try {
            config.headers["X-CSRF-TOKEN"] = decodeURIComponent(csrf);
        } catch {
            config.headers["X-CSRF-TOKEN"] = csrf;
        }
    }

    return config;
});

// Handle expired/invalid sessions
const AUTH_ENDPOINTS = ["/login", "/register", "/refresh"];
let redirecting = false;

client.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url ?? "";
        const isAuthCall = AUTH_ENDPOINTS.some((p) => url.includes(p));
        const onLoginPage = window.location.pathname === "/login";

        if (status === 401 && !isAuthCall && !onLoginPage && !redirecting) {
            redirecting = true;
            window.location.assign("/login");
        }

        return Promise.reject(error);
    }
);
export default client;