import styled from "styled-components";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Submit from "./pages/Submit";
import PostDetail from "./components/PostDetail";
import Footer from "./components/Footer";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Viewer from "./pages/Viewer";
import Login from "./pages/Login";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;
const Main = styled.div`
  min-height: calc(100vh - 240px);
`;
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
                <Route index path="submit" element={<Submit />}></Route>
                {/* <Route index element={<Home />}></Route> */}
                <Route path="jobs" element={<Jobs />}></Route>
                <Route path="view" element={<Viewer />}></Route>

                <Route path="jobs/:id" element={<JobDetail />}></Route>
                <Route path="png" element={<w />}></Route>
                <Route path="login" element={<Login />}></Route>

                {/* <Route path="post/view" element={<PostDetail />}></Route> */}
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
