import React from "react";
import styled, { keyframes } from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
   background: linear-gradient(
    rgba(173, 216, 230, 0.6), 
    rgba(135, 206, 250, 0.6) 
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LogoWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding: 10px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotate} 4s linear infinite;
`;

const Logo = styled.img`
  width: 300%;
  height: auto;
  object-fit: contain;
`;

const LoadingSpinner = () => {
  return (
    <Overlay>
      <LogoWrapper>
        <Logo src="/logo.png" alt="Loading logo" />
      </LogoWrapper>
    </Overlay>
  );
};

export default LoadingSpinner;
