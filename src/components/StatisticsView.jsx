import React, { useState } from "react";
import styled from "styled-components";
import SVgs from "../components/ImageZoom";
import LogMIC from "./LogMIC";

// Styled-components for UI elements
const Container = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  background-color: ${(props) => (props.active ? "#4caf50" : "#d3d3d3")};
  color: ${(props) => (props.active ? "white" : "#666")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#45a049" : "#a9a9a9")};
  }
`;

const ChartTitle = styled.h3`
  font-size: 20px;
  color: #333;
`;

const StatisticsView = () => {
  const [visibleCharts, setVisibleCharts] = useState({
    histogram: false,
    amrplot: false,
    vfactorsplot: false,
  });

  const toggleChart = (name) => {
    const newVisibleCharts = { ...visibleCharts };
    newVisibleCharts[name] = !visibleCharts[name];
    setVisibleCharts(newVisibleCharts);
  };

  return (
    <Container>
      <h1>Statistics Viewer</h1>
      <div>
        <Button
          active={visibleCharts.histogram}
          onClick={() => toggleChart("histogram")}
        >
          Histogram
        </Button>
        <Button
          active={visibleCharts.amrplot}
          onClick={() => toggleChart("amrplot")}
        >
          AMR Plot
        </Button>
        <Button
          active={visibleCharts.vfactorsplot}
          onClick={() => toggleChart("vfactorsplot")}
        >
          VFactors Plot
        </Button>
      </div>
      {visibleCharts.histogram && (
        <>
          <ChartTitle>Histogram</ChartTitle>
          <LogMIC />
        </>
      )}
      {visibleCharts.amrplot && (
        <>
          <ChartTitle>AMR Plot</ChartTitle>
          <SVgs file_dist="amr.json" />
        </>
      )}
      {visibleCharts.vfactorsplot && (
        <>
          <ChartTitle>VFactors Plot</ChartTitle>
          <SVgs file_dist="vfactor.json" />
        </>
      )}
    </Container>
  );
};

export default StatisticsView;
