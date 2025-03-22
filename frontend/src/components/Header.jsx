import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
  gap: 10px;
`;
const Name = styled.h1`
  font-size: 40px;
`;
const Title = styled.p`
  font-size: 20px;
  color: #808080;
`;
const Header = () => {
  return (
    <Container>
      <Wrapper>
        <Name>Bakta Web</Name>
        <Title>
          Rapid & standardized annotation of bacterial genomes, MAGs & plasmids
        </Title>
      </Wrapper>
    </Container>
  );
};

export default Header;
