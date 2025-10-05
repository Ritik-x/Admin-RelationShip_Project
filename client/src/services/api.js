import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Auth API
export const authAPI = {
  login: (email, password) => api.post("/user/login", { email, password }),
  register: (userData) => api.post("/user/register", userData),
  me: () => api.get("/user/me"),
};

// Agent API
export const agentAPI = {
  getAgents: () => api.get("/agent"),
  createAgent: (agentData) => api.post("/agent", agentData),
};

// Upload API
export const uploadAPI = {
  uploadFile: (formData) => api.post("/uploadfile", formData),
};

// Task API
export const taskAPI = {
  getTasksByAgent: (agentId) => api.get(`/api/agent/${agentId}/contacts`),
};

export default api;
