import styled from "styled-components";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Submit from "./pages/Submit";
import PostDetail from "./components/PostDetail";
import Footer from "./components/Footer";
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Main = styled.div``;
const Wrapper = styled.div``;
function App() {
  return (
    <Container>
      <BrowserRouter>
        <Main>
          <Navbar />
          <Header />
          <Wrapper>
            <Routes>
              <Route path="/">
                <Route index element={<Home />}></Route>
                <Route path="submit" element={<Submit />}></Route>
                <Route path="post/view" element={<PostDetail />}></Route>
              </Route>
            </Routes>
          </Wrapper>
        </Main>
      </BrowserRouter>
      <Footer />
    </Container>
  );
}
export default App;
