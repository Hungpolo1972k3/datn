import React from "react";
import styled from "styled-components";
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Wrapper = styled.div`
  width: 90%;
`;
const Viewer = () => {
  return (
    <Container>
      <Wrapper>
        <input type="file" name="" id="" />
      </Wrapper>
    </Container>
  );
};

export default Viewer;
