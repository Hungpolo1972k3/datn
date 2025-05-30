import styled from "styled-components";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Submit from "./pages/Submit";
import Footer from "./components/Footer";
import Engineer from "./pages/Engineer";
import Login from "./pages/Login";
import ExperimentPage from "./pages/Experiment";
import Statistic from "./pages/Statistic";
import ProtectedRoute from "./utils/ProtectedRoute";
import ExperimentManagement from "./pages/ExperimentManagement";
import Dataset from "./pages/Dataset";
import Tool from "./pages/Tool";
import DatasetStatistic from "./pages/StatisticsView";
import StatisticAdmin from "./pages/StatisticAdmin";
import ResultPage from "./pages/ResultPage";

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
              <Route path="/" element={<Home />} />
              <Route path="/dataset" element={<Dataset />}/>
              <Route path="/login" element={<Login />} />
              <Route path="/tool" element={<Tool />} />
              <Route path="/dataset_statistics" element={<DatasetStatistic/>} />
              <Route path="/blastn-result" element={<ResultPage/>}/>
              <Route
                path="/submit"
                element={
                  <ProtectedRoute>
                    <Submit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/experiment"
                element={
                  <ProtectedRoute>
                    <ExperimentPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/statistic"
                element={
                  <ProtectedRoute>
                    <Statistic />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/engineer"
                element={
                  <ProtectedRoute requireAdmin>
                    <Engineer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/experiment-management"
                element={
                  <ProtectedRoute requireAdmin>
                    <ExperimentManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/statistic-admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <StatisticAdmin/>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Wrapper>
        </Main>
      </BrowserRouter>
      <Footer />
    </Container>
  );
}

export default App;
