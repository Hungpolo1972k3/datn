import React, { useState } from "react";
import styled from "styled-components";
import SVgs from "../components/ImageZoom";
import LogMIC from "../components/LogMIC";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 60px;
  color: #004080;
  margin: 50px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 20px;
  background-color: ${(props) => (props.active ? "#007BFF" : "#d3d3d3")};
  color: ${(props) => (props.active ? "white" : "#000000")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 50px;
  &:hover {
    background-color: ${(props) => (props.active ? "#0066cc" : "#a9a9a9")};
  }
`;

const ChartTitle = styled.h3`
  font-size: 30px;
  color: #004080;
  margin-bottom: 30px;
`;

const StatisticsView = () => {
  const { t } = useTranslation();
  const [activeChart, setActiveChart] = useState("histogram"); // Set default chart to "histogram"

  const toggleChart = (name) => {
    setActiveChart((prev) => (prev === name ? null : name));
  };

  return (
    <Container>
      <Title>{t("statistics_viewer.title")}</Title>
      <div>
        <Button
          active={activeChart === "histogram"}
          onClick={() => toggleChart("histogram")}
        >
          {t("statistics_viewer.histogram")}
        </Button>
        <Button
          active={activeChart === "amrplot"}
          onClick={() => toggleChart("amrplot")}
        >
          {t("statistics_viewer.amr_plot")}
        </Button>
        <Button
          active={activeChart === "vfactorsplot"}
          onClick={() => toggleChart("vfactorsplot")}
        >
          {t("statistics_viewer.vfactors_plot")}
        </Button>
      </div>

      {activeChart === "histogram" && (
        <>
          <ChartTitle>{t("statistics_viewer.histogram")}</ChartTitle>
          <LogMIC />
        </>
      )}
      {activeChart === "amrplot" && (
        <>
          <ChartTitle>{t("statistics_viewer.amr_plot")}</ChartTitle>
          <SVgs file_dist="amr.json" />
        </>
      )}
      {activeChart === "vfactorsplot" && (
        <>
          <ChartTitle>{t("statistics_viewer.vfactors_plot")}</ChartTitle>
          <SVgs file_dist="vfactor.json" />
        </>
      )}
    </Container>
  );
};

export default StatisticsView;
