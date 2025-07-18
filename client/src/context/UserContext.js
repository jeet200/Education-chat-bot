import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { usersAPI, progressAPI, getCurrentUserSession, createUserSession } from '../api/api';

// Initial state
const initialState = {
  user: null,
  progress: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  currentSession: null,
  preferences: {
    language: 'en',
    grade: 6,
    subjects: ['math', 'science', 'technology'],
    theme: 'light',
    notifications: true,
  },
};

// Action types
export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_PROGRESS: 'SET_PROGRESS',
  UPDATE_PROGRESS: 'UPDATE_PROGRESS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_PREFERENCES: 'SET_PREFERENCES',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  SET_SESSION: 'SET_SESSION',
  LOGOUT: 'LOGOUT',
};

// Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload,
        loading: false 
      };
    
    case actionTypes.SET_PROGRESS:
      return { ...state, progress: action.payload };
    
    case actionTypes.UPDATE_PROGRESS:
      return { 
        ...state, 
        progress: { ...state.progress, ...action.payload } 
      };
    
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    
    case actionTypes.SET_PREFERENCES:
      return { ...state, preferences: action.payload };
    
    case actionTypes.UPDATE_PREFERENCES:
      return { 
        ...state, 
        preferences: { ...state.preferences, ...action.payload } 
      };
    
    case actionTypes.SET_SESSION:
      return { ...state, currentSession: action.payload };
    
    case actionTypes.LOGOUT:
      return { 
        ...initialState, 
        preferences: state.preferences 
      };
    
    default:
      return state;
  }
};

// Context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Initialize user session on mount
  useEffect(() => {
    const initializeUser = async () => {
      try {
        let session = getCurrentUserSession();
        
        if (!session) {
          // Create a guest user session
          const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          session = createUserSession(guestId);
        }
        
        dispatch({ type: actionTypes.SET_SESSION, payload: session });
        
        // Try to load user profile
        try {
          const response = await usersAPI.getUserProfile(session.userId);
          dispatch({ type: actionTypes.SET_USER, payload: response.data.user });
        } catch (error) {
          // User doesn't exist, create a default profile
          const defaultUser = {
            userId: session.userId,
            name: `Student ${session.userId.split('_')[1]}`,
            grade: 6,
            preferredLanguage: 'en',
            subjects: ['math', 'science', 'technology'],
          };
          
          const response = await usersAPI.createOrUpdateProfile(defaultUser);
          dispatch({ type: actionTypes.SET_USER, payload: response.data.user });
        }
        
        // Load user progress
        try {
          const progressResponse = await progressAPI.getUserProgress(session.userId);
          dispatch({ type: actionTypes.SET_PROGRESS, payload: progressResponse.data.progress });
        } catch (error) {
          console.log('No progress data found, starting fresh');
        }
        
      } catch (error) {
        console.error('Error initializing user:', error);
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      }
    };

    initializeUser();
  }, []);

  // Actions
  const setUser = (user) => dispatch({ type: actionTypes.SET_USER, payload: user });
  const setProgress = (progress) => dispatch({ type: actionTypes.SET_PROGRESS, payload: progress });
  const updateProgress = (progressUpdate) => dispatch({ type: actionTypes.UPDATE_PROGRESS, payload: progressUpdate });
  const setLoading = (loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading });
  const setError = (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error });
  const clearError = () => dispatch({ type: actionTypes.CLEAR_ERROR });
  const setPreferences = (preferences) => dispatch({ type: actionTypes.SET_PREFERENCES, payload: preferences });
  const updatePreferences = (preferences) => dispatch({ type: actionTypes.UPDATE_PREFERENCES, payload: preferences });

  const updateUserProfile = async (updates) => {
    try {
      setLoading(true);
      const response = await usersAPI.updateUserPreferences(state.user.userId, updates);
      dispatch({ type: actionTypes.SET_USER, payload: response.data.user });
      return response.data.user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const recordTopicCompletion = async (topicData) => {
    try {
      const response = await progressAPI.updateTopicProgress(state.user.userId, topicData);
      dispatch({ type: actionTypes.SET_PROGRESS, payload: response.data.progress });
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const recordQuizResult = async (quizData) => {
    try {
      const response = await progressAPI.recordQuizResult(state.user.userId, quizData);
      dispatch({ type: actionTypes.SET_PROGRESS, payload: response.data.progress });
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const refreshProgress = async () => {
    try {
      const response = await progressAPI.getUserProgress(state.user.userId);
      dispatch({ type: actionTypes.SET_PROGRESS, payload: response.data.progress });
      return response.data.progress;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
    // Clear session storage
    localStorage.removeItem('userSession');
  };

  const value = {
    ...state,
    setUser,
    setProgress,
    updateProgress,
    setLoading,
    setError,
    clearError,
    setPreferences,
    updatePreferences,
    updateUserProfile,
    recordTopicCompletion,
    recordQuizResult,
    refreshProgress,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext; 