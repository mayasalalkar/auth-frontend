import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    // Signup
    signup: async (data) => {
        const response = await api.post('/auth/signup', data);
        return response.data;
    },

    // Verify OTP
    verifyOTP: async (data) => {
        const response = await api.post('/auth/verify-otp', data);
        return response.data;
    },

    // Resend OTP
    resendOTP: async (email) => {
        const response = await api.post('/auth/resend-otp', { email });
        return response.data;
    },

    // Login
    login: async (data) => {
        const response = await api.post('/auth/login', data);
        return response.data;
    },

    // Get Profile
    getProfile: async () => {
        const response = await api.get('/auth/me');
        return response.data.data.user;
    },
};

export default api;
