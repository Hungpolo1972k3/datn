import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Post from "../components/Post";
const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  margin-top: 20px;
  width: 90%;
  flex-direction: column;
`;
const Home = () => {
  return (
    <Container>
      <Wrapper>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </Wrapper>
    </Container>
  );
};

export default Home;
