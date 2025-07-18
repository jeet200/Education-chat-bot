import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import './i18n';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import CurriculumBrowser from './components/CurriculumBrowser';
import ProgressTracker from './components/ProgressTracker';
import QuizInterface from './components/QuizInterface';
import TopicDetail from './components/TopicDetail';
import Settings from './components/Settings';
import LoadingSpinner from './components/common/LoadingSpinner';

// Styles
import GlobalStyles from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/theme';

// Context
import { AppProvider } from './context/AppContext';
import { UserProvider } from './context/UserContext';

// API
import { checkServerHealth } from './api/api';

function App() {
  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [serverOnline, setServerOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check server health on startup
    const checkServer = async () => {
      try {
        await checkServerHealth();
        setServerOnline(true);
      } catch (error) {
        console.error('Server health check failed:', error);
        setServerOnline(false);
      } finally {
        setLoading(false);
      }
    };

    checkServer();

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column'
        }}>
          <LoadingSpinner />
          <p style={{ marginTop: '1rem', color: '#666' }}>Loading AI Education Assistant...</p>
        </div>
      </ThemeProvider>
    );
  }

  if (!serverOnline) {
    return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          padding: '2rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#e74c3c', marginBottom: '1rem' }}>Server Offline</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              The AI Education Assistant server is currently unavailable. Please check if the server is running.
            </p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Retry Connection
            </button>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <AppProvider>
        <UserProvider>
          <Router>
            <GlobalStyles />
            <div className="app">
              <Header 
                toggleTheme={toggleTheme} 
                toggleSidebar={toggleSidebar}
                currentTheme={theme}
              />
              
              <div className="app-body">
                <Sidebar 
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                />
                
                <motion.main 
                  className="main-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    marginLeft: sidebarOpen ? '250px' : '0',
                    transition: 'margin-left 0.3s ease'
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/chat" element={<ChatInterface />} />
                    <Route path="/curriculum" element={<CurriculumBrowser />} />
                    <Route path="/curriculum/:subject/:grade/:topicId" element={<TopicDetail />} />
                    <Route path="/progress" element={<ProgressTracker />} />
                    <Route path="/quiz/:subject/:grade/:topicId" element={<QuizInterface />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </motion.main>
              </div>
            </div>
            
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: theme === 'light' ? '#fff' : '#333',
                  color: theme === 'light' ? '#333' : '#fff',
                },
              }}
            />
          </Router>
        </UserProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App; 