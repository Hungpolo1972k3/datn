import styled from "styled-components";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Submit from "./pages/Submit";
import Footer from "./components/Footer";
import Engineer from "./pages/Engineer";
import Login from "./pages/Login";
import ExperimentPage from "./pages/Experiment";
import Statistic from "./pages/Statistic";
const Container = styled.div`
  display: flex;
  flex-direction: column;
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
                <Route index element={<Home />}></Route>
                <Route path="experiment" element={<ExperimentPage />}></Route>
                <Route path="engineer" element={<Engineer />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="statistic" element={<Statistic/>}></Route>
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
