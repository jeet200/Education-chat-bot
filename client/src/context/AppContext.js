import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  loading: false,
  error: null,
  currentLanguage: 'en',
  theme: 'light',
  sidebarOpen: false,
  notifications: [],
  apiStatus: 'idle', // idle, loading, success, error
};

// Action types
export const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_THEME: 'SET_THEME',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_SIDEBAR: 'SET_SIDEBAR',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_API_STATUS: 'SET_API_STATUS',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    
    case actionTypes.SET_LANGUAGE:
      return { ...state, currentLanguage: action.payload };
    
    case actionTypes.SET_THEME:
      return { ...state, theme: action.payload };
    
    case actionTypes.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };
    
    case actionTypes.SET_SIDEBAR:
      return { ...state, sidebarOpen: action.payload };
    
    case actionTypes.ADD_NOTIFICATION:
      return { 
        ...state, 
        notifications: [...state.notifications, action.payload] 
      };
    
    case actionTypes.REMOVE_NOTIFICATION:
      return { 
        ...state, 
        notifications: state.notifications.filter(n => n.id !== action.payload) 
      };
    
    case actionTypes.SET_API_STATUS:
      return { ...state, apiStatus: action.payload };
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const setLoading = (loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading });
  const setError = (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error });
  const clearError = () => dispatch({ type: actionTypes.CLEAR_ERROR });
  const setLanguage = (language) => dispatch({ type: actionTypes.SET_LANGUAGE, payload: language });
  const setTheme = (theme) => dispatch({ type: actionTypes.SET_THEME, payload: theme });
  const toggleSidebar = () => dispatch({ type: actionTypes.TOGGLE_SIDEBAR });
  const setSidebar = (open) => dispatch({ type: actionTypes.SET_SIDEBAR, payload: open });
  const setApiStatus = (status) => dispatch({ type: actionTypes.SET_API_STATUS, payload: status });

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    dispatch({ 
      type: actionTypes.ADD_NOTIFICATION, 
      payload: { ...notification, id } 
    });
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: id });
    }, 5000);
  };

  const removeNotification = (id) => {
    dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: id });
  };

  const value = {
    ...state,
    setLoading,
    setError,
    clearError,
    setLanguage,
    setTheme,
    toggleSidebar,
    setSidebar,
    addNotification,
    removeNotification,
    setApiStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext; 