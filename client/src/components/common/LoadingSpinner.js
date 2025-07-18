import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${props => props.theme?.spacing?.sm || '0.5rem'};
`;

const Spinner = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border: ${props => props.thickness || '4px'} solid ${props => props.theme?.colors?.border || '#e9ecef'};
  border-top: ${props => props.thickness || '4px'} solid ${props => props.theme?.colors?.primary || '#3498db'};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  font-size: ${props => props.theme?.fontSize?.sm || '0.875rem'};
  color: ${props => props.theme?.colors?.textSecondary || '#6c757d'};
  margin: 0;
  text-align: center;
`;

const LoadingSpinner = ({ 
  size = '40px', 
  thickness = '4px', 
  text = 'Loading...', 
  showText = true 
}) => {
  return (
    <SpinnerContainer>
      <Spinner size={size} thickness={thickness} />
      {showText && <LoadingText>{text}</LoadingText>}
    </SpinnerContainer>
  );
};

export default LoadingSpinner; 