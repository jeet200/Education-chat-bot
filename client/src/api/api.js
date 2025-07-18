import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Health check
export const checkServerHealth = () => api.get('/health');

// Chat API
export const chatAPI = {
  sendMessage: (data) => api.post('/chat/message', data),
  explainConcept: (data) => api.post('/chat/explain', data),
  generateQuiz: (data) => api.post('/chat/quiz', data),
};

// Translation API
export const translationAPI = {
  detectLanguage: (text) => api.post('/translate/detect', { text }),
  translateText: (data) => api.post('/translate/translate', data),
  getContentInLanguage: (data) => api.post('/translate/content', data),
  getSupportedLanguages: () => api.get('/translate/languages'),
};

// Curriculum API
export const curriculumAPI = {
  getOverview: () => api.get('/curriculum/overview'),
  getTopics: (subject, grade) => api.get(`/curriculum/${subject}/${grade}/topics`),
  getTopicDetail: (subject, grade, topicId) => api.get(`/curriculum/${subject}/${grade}/topics/${topicId}`),
  searchTopics: (params) => api.get('/curriculum/search', { params }),
  getLearningPath: (subject, grade) => api.get(`/curriculum/learning-path/${subject}/${grade}`),
};

// Progress API
export const progressAPI = {
  getUserProgress: (userId) => api.get(`/progress/user/${userId}`),
  updateTopicProgress: (userId, data) => api.post(`/progress/user/${userId}/topic`, data),
  recordQuizResult: (userId, data) => api.post(`/progress/user/${userId}/quiz`, data),
  getSubjectProgress: (userId, subject) => api.get(`/progress/user/${userId}/subject/${subject}`),
  getAnalytics: (userId) => api.get(`/progress/user/${userId}/analytics`),
};

// Users API
export const usersAPI = {
  createOrUpdateProfile: (data) => api.post('/users/profile', data),
  getUserProfile: (userId) => api.get(`/users/profile/${userId}`),
  updateUserPreferences: (userId, data) => api.put(`/users/profile/${userId}`, data),
};

// Utility functions
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'An error occurred',
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error - please check your connection',
      status: 0,
      data: null,
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1,
      data: null,
    };
  }
};

// Helper function to create a user session
export const createUserSession = (userId) => {
  const sessionData = {
    userId,
    timestamp: new Date().toISOString(),
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
  
  localStorage.setItem('userSession', JSON.stringify(sessionData));
  return sessionData;
};

// Helper function to get current user session
export const getCurrentUserSession = () => {
  const sessionData = localStorage.getItem('userSession');
  return sessionData ? JSON.parse(sessionData) : null;
};

// Helper function to clear user session
export const clearUserSession = () => {
  localStorage.removeItem('userSession');
  localStorage.removeItem('authToken');
};

// Default export for convenience
export default api; 