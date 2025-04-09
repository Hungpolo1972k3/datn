import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; 
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;  
  border-top: 4px solid #3498db; 
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;  /* Áp dụng animation */
`;

const LoadingText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-top: 20px;
`;

const PopupLoading = () => {
  return (
    <LoadingOverlay>
      <LoadingSpinner />
      <LoadingText />
    </LoadingOverlay>
  );
};

export default PopupLoading;
