import React from "react";
import styled from "styled-components";
import Thumb from "../img/posts/post1_thumb.png";
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const Wrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 0.5px solid #898989;
  border-radius: 5px;
`;

const ImgContainer = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  height: 96%;
  width: 96%;
  object-fit: cover;
`;
const Info = styled.div`
  height: 200px;
  width: calc(100% - 250px);
`;
const Title = styled.h2`
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Desc = styled.div``;
const Post = () => {
  return (
    <Link to="/post/view" style={{ textDecoration: "none", color: "black" }}>
      <Container>
        <Wrapper>
          <ImgContainer>
            <Img src={Thumb} />
          </ImgContainer>
          <Info>
            <Title>Nhiễm vi khuẩn acinetobacter baumannii</Title>
            <Desc>
              Vi khuẩn acinetobacter baumannii được biết đến là một loại vi
              khuẩn có khả năng đề kháng với kháng sinh rất mạnh, là một trong
              những nguyên nhân gây nhiễm khuẩn bệnh viện đáng báo động trên
              toàn cầu.
            </Desc>
          </Info>
        </Wrapper>
      </Container>
    </Link>
  );
};

export default Post;
