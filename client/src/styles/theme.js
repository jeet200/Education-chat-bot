export const lightTheme = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    warning: '#f39c12',
    info: '#9b59b6',
    
    // Educational subject colors
    math: '#e67e22',
    science: '#27ae60',
    technology: '#8e44ad',
    
    // UI colors
    background: '#ffffff',
    surface: '#f8f9fa',
    card: '#ffffff',
    border: '#e9ecef',
    text: '#2c3e50',
    textSecondary: '#6c757d',
    textLight: '#adb5bd',
    
    // Status colors
    success: '#28a745',
    error: '#dc3545',
    
    // Interactive colors
    hover: '#ecf0f1',
    active: '#bdc3c7',
    disabled: '#e9ecef',
    
    // Gradient colors
    gradientStart: '#3498db',
    gradientEnd: '#2ecc71',
    
    // Chat colors
    userMessage: '#3498db',
    aiMessage: '#2ecc71',
    systemMessage: '#95a5a6',
  },
  
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.15)',
    large: '0 8px 16px rgba(0, 0, 0, 0.2)',
    card: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50%',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    xxxl: '2rem',
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
  
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  
  zIndex: {
    modal: 1000,
    dropdown: 100,
    header: 50,
    sidebar: 40,
    overlay: 30,
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    
    // Main colors (keep brand colors)
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    warning: '#f39c12',
    info: '#9b59b6',
    
    // Educational subject colors (slightly adjusted for dark mode)
    math: '#e67e22',
    science: '#27ae60',
    technology: '#8e44ad',
    
    // UI colors (dark theme)
    background: '#1a1a1a',
    surface: '#2d2d2d',
    card: '#2d2d2d',
    border: '#404040',
    text: '#f8f9fa',
    textSecondary: '#adb5bd',
    textLight: '#6c757d',
    
    // Status colors (adjusted for dark mode)
    success: '#28a745',
    error: '#dc3545',
    
    // Interactive colors (dark theme)
    hover: '#3d3d3d',
    active: '#4d4d4d',
    disabled: '#2d2d2d',
    
    // Gradient colors (same as light)
    gradientStart: '#3498db',
    gradientEnd: '#2ecc71',
    
    // Chat colors (adjusted for dark mode)
    userMessage: '#3498db',
    aiMessage: '#2ecc71',
    systemMessage: '#95a5a6',
  },
  
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.4)',
    large: '0 8px 16px rgba(0, 0, 0, 0.5)',
    card: '0 2px 8px rgba(0, 0, 0, 0.3)',
  },
};

// Common styled-components mixins
export const mixins = {
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  
  flexBetween: `
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  
  flexColumn: `
    display: flex;
    flex-direction: column;
  `,
  
  cardStyle: `
    background: ${props => props.theme.colors.card};
    border-radius: ${props => props.theme.borderRadius.medium};
    box-shadow: ${props => props.theme.shadows.card};
    border: 1px solid ${props => props.theme.colors.border};
  `,
  
  buttonPrimary: `
    background: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.medium};
    font-size: ${props => props.theme.fontSize.md};
    font-weight: ${props => props.theme.fontWeight.medium};
    cursor: pointer;
    transition: ${props => props.theme.transitions.normal};
    
    &:hover {
      background: ${props => props.theme.colors.primary}dd;
    }
    
    &:disabled {
      background: ${props => props.theme.colors.disabled};
      cursor: not-allowed;
    }
  `,
  
  buttonSecondary: `
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.medium};
    font-size: ${props => props.theme.fontSize.md};
    font-weight: ${props => props.theme.fontWeight.medium};
    cursor: pointer;
    transition: ${props => props.theme.transitions.normal};
    
    &:hover {
      background: ${props => props.theme.colors.primary};
      color: white;
    }
    
    &:disabled {
      border-color: ${props => props.theme.colors.disabled};
      color: ${props => props.theme.colors.disabled};
      cursor: not-allowed;
    }
  `,
  
  inputStyle: `
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.medium};
    font-size: ${props => props.theme.fontSize.md};
    background: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
    transition: ${props => props.theme.transitions.normal};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
    }
    
    &::placeholder {
      color: ${props => props.theme.colors.textLight};
    }
  `,
  
  scrollbar: `
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: ${props => props.theme.colors.surface};
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.border};
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: ${props => props.theme.colors.textLight};
    }
  `,
  
  // Responsive breakpoints
  mobile: `@media (max-width: ${props => props.theme.breakpoints.mobile})`,
  tablet: `@media (max-width: ${props => props.theme.breakpoints.tablet})`,
  desktop: `@media (min-width: ${props => props.theme.breakpoints.desktop})`,
  wide: `@media (min-width: ${props => props.theme.breakpoints.wide})`,
}; 