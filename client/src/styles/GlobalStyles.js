import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Base Styles */
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    transition: background-color ${props => props.theme.transitions.normal}, 
                color ${props => props.theme.transitions.normal};
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${props => props.theme.fontWeight.semibold};
    line-height: 1.2;
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text};
  }

  h1 {
    font-size: ${props => props.theme.fontSize.xxxl};
  }

  h2 {
    font-size: ${props => props.theme.fontSize.xxl};
  }

  h3 {
    font-size: ${props => props.theme.fontSize.xl};
  }

  h4 {
    font-size: ${props => props.theme.fontSize.lg};
  }

  h5 {
    font-size: ${props => props.theme.fontSize.md};
  }

  h6 {
    font-size: ${props => props.theme.fontSize.sm};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text};
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color ${props => props.theme.transitions.fast};

    &:hover {
      color: ${props => props.theme.colors.primary}cc;
      text-decoration: underline;
    }
  }

  /* Lists */
  ul, ol {
    padding-left: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  li {
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  /* Code */
  code {
    background-color: ${props => props.theme.colors.surface};
    padding: 2px 4px;
    border-radius: ${props => props.theme.borderRadius.small};
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.9em;
  }

  pre {
    background-color: ${props => props.theme.colors.surface};
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.medium};
    overflow-x: auto;
    margin-bottom: ${props => props.theme.spacing.md};
    
    code {
      background: none;
      padding: 0;
    }
  }

  /* Blockquotes */
  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: ${props => props.theme.spacing.md};
    margin: ${props => props.theme.spacing.md} 0;
    font-style: italic;
    color: ${props => props.theme.colors.textSecondary};
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${props => props.theme.spacing.md};
  }

  th, td {
    padding: ${props => props.theme.spacing.sm};
    text-align: left;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  th {
    background-color: ${props => props.theme.colors.surface};
    font-weight: ${props => props.theme.fontWeight.semibold};
  }

  /* Form Elements */
  input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  input:focus, textarea:focus, select:focus {
    outline: none;
  }

  /* Buttons */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-size: inherit;
    transition: all ${props => props.theme.transitions.fast};

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.textLight};
  }

  /* Selection */
  ::selection {
    background: ${props => props.theme.colors.primary}30;
    color: ${props => props.theme.colors.text};
  }

  /* App Layout */
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .app-body {
    flex: 1;
    display: flex;
    position: relative;
  }

  .main-content {
    flex: 1;
    padding: ${props => props.theme.spacing.lg};
    min-height: calc(100vh - 70px); /* Assuming header height is 70px */
    transition: margin-left ${props => props.theme.transitions.normal};
  }

  /* Responsive Design */
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    .main-content {
      padding: ${props => props.theme.spacing.md};
      margin-left: 0 !important;
    }

    h1 {
      font-size: ${props => props.theme.fontSize.xxl};
    }

    h2 {
      font-size: ${props => props.theme.fontSize.xl};
    }

    h3 {
      font-size: ${props => props.theme.fontSize.lg};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    .main-content {
      padding: ${props => props.theme.spacing.sm};
    }

    h1 {
      font-size: ${props => props.theme.fontSize.xl};
    }

    h2 {
      font-size: ${props => props.theme.fontSize.lg};
    }
  }

  /* Utility Classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .flex {
    display: flex;
  }

  .flex-column {
    flex-direction: column;
  }

  .flex-center {
    justify-content: center;
    align-items: center;
  }

  .flex-between {
    justify-content: space-between;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .w-full {
    width: 100%;
  }

  .h-full {
    height: 100%;
  }

  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
  }

  .fixed {
    position: fixed;
  }

  .z-10 {
    z-index: 10;
  }

  .z-20 {
    z-index: 20;
  }

  .z-30 {
    z-index: 30;
  }

  /* Animation Classes */
  .fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  .slide-in-left {
    animation: slideInLeft 0.3s ease-in-out;
  }

  .slide-in-right {
    animation: slideInRight 0.3s ease-in-out;
  }

  .scale-in {
    animation: scaleIn 0.3s ease-in-out;
  }

  /* Keyframes */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Toast Notifications */
  .toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }

  /* Loading States */
  .loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid ${props => props.theme.colors.border};
    border-radius: 50%;
    border-top-color: ${props => props.theme.colors.primary};
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Focus Styles for Accessibility */
  *:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  /* High Contrast Mode Support */
  @media (prefers-contrast: high) {
    body {
      background: ${props => props.theme.colors.background};
      color: ${props => props.theme.colors.text};
    }
  }

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Print Styles */
  @media print {
    * {
      background: white !important;
      color: black !important;
      box-shadow: none !important;
    }

    .no-print {
      display: none !important;
    }

    body {
      font-size: 12pt;
      line-height: 1.4;
    }

    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid;
    }

    pre, blockquote {
      page-break-inside: avoid;
    }

    img {
      max-width: 100% !important;
    }

    a {
      text-decoration: underline;
    }
  }
`;

export default GlobalStyles; 