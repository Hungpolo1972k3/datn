import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
const BreadcrumbWrapper = styled.nav`
  font-size: 14px;
  margin-bottom: 15px;
  margin-top: 15px;
  margin-left: 25px;
  color: #555;
  user-select: none;
  text-align: left;
`;

const Crumb = styled.span`
  cursor: pointer;
  color: #1e3a8a;
  font-weight: bold;
  font-size: 22px;
  &:hover {
    text-decoration: underline;
  }
`;

const CrumbMain = styled.span`
  cursor: pointer;
  color: #1e3a8a;
  font-size: 24px;
  font-weight: bold;
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0 15px;
  font-size: 30px;
`;

const StatisticsView = () => {
  const { t } = useTranslation();
  const [activeChart, setActiveChart] = useState("histogram"); 
  const navigate = useNavigate();
  const toggleChart = (name) => {
    setActiveChart((prev) => (prev === name ? null : name));
  };

  return (
    <Container>
      <BreadcrumbWrapper>
          <Crumb onClick={() => navigate('/')}>{t("breadcrumb.ABDataset")}</Crumb>
          <Separator>›</Separator>
          <Crumb onClick={() => navigate('/dataset_statistics')}>{t("breadcrumb.statistic")}</Crumb>
          <Separator>›</Separator>
          {activeChart && (
            <>
              <CrumbMain onClick={() => navigate('/dataset_statistics')}>
                {activeChart === "histogram" && t("statistics_viewer.histogram")}
                {activeChart === "amrplot" && t("statistics_viewer.amr_plot")}
                {activeChart === "vfactorsplot" && t("statistics_viewer.vfactors_plot")}
              </CrumbMain>
              <Separator>›</Separator>
            </>
          )}
      </BreadcrumbWrapper>
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
