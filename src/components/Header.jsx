import React from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next"; // ⬅ import hook

// Tạo hiệu ứng chuyển động cho background của Header
const gradientAnimation = keyframes`
  0% {
    background: linear-gradient(135deg, #a7c7e7 0%, #3b7b9e 100%);
  }
  50% {
    background: linear-gradient(135deg, #70a1d7 0%, #3e8ac7 100%);
  }
  100% {
    background: linear-gradient(135deg, #a7c7e7 0%, #3b7b9e 100%);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  animation: ${gradientAnimation} 8s ease infinite;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 90%;
  gap: 16px;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
`;

const Name = styled.h1`
  font-size: 45px;
  font-weight: bold;
  margin-left: 30px;
  color: white;
`;

const Title = styled.p`
  font-size: 20px;
  color: #f0f0f0;
  margin-left: 30px;
  margin-top: 15px;
`;

const Header = () => {
  const { t } = useTranslation(); 

  return (
    <Container>
      <Wrapper>
        <Image src="/logo.png" alt="Bakta Logo" />
        <div>
          <Name>{t("headerComponent.organism_name")}</Name>
          <Title>{t("headerComponent.organism_description")}</Title>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Header;
