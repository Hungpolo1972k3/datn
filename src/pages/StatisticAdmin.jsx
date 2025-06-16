import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { useTranslation } from "react-i18next";
import { apiGetExperimentStatisticAdmin } from "../service/experiment";
import { apiGetSampleStatisticAdmin } from "../service/sample";

const Container = styled.div`
  padding: 30px;
`;

const Title = styled.h2`
  font-size: 36px;
  color: #1e3a8a;
  text-align: center;
  margin-bottom: 30px;
`;

const SubTitle = styled.h3`
  font-size: 24px;
  color: #1e40af;
  margin: 10px 0;
  text-align: center;
`;

const ChartsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ChartBox = styled.div`
  width: 100%;
  max-width: 600px;
  height: 500px;
  margin: 20px;
`;

const EXPERIMENT_COLORS = ["#1e3a8a", "#3b82f6", "#60a5fa", "#93c5fd"];
const SAMPLE_COLORS = ["#047857", "#10b981", "#34d399", "#6ee7b7"];

const StatisticAdmin = () => {
  const { t } = useTranslation();
  const [dataChart, setDataChart] = useState([]);
  const [dataChart2, setDataChart2] = useState([]);

  const fetchStatisticAdmin = async () => {
    try {
      const response = await apiGetExperimentStatisticAdmin();
      const response2 = await apiGetSampleStatisticAdmin();
      const rawData = response.data;
      const rawData2 = response2.data;
      const formattedData = rawData.map(item => ({
        name: item.user.username,
        total: item.total
      }));
      const formattedData2 = rawData2.map(item => ({
        name: item.user.username,
        total: item.total
      }));
      setDataChart(formattedData);
      setDataChart2(formattedData2);
    } catch (error) {
      console.error("Error fetching admin experiment statistics:", error);
    }
  };

  useEffect(() => {
    fetchStatisticAdmin();
  }, []);

  return (
    <Container>
      <Title>{t("statisticPage.user_statistics")}</Title>

      <SubTitle>{t("statisticPage.experiment_statistics")}</SubTitle>
      <ChartsWrapper>
        <ChartBox>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataChart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 14 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="total" fill="#1e3a8a" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataChart}
                dataKey="total"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {dataChart.map((entry, index) => (
                  <Cell key={`cell-exp-${index}`} fill={EXPERIMENT_COLORS[index % EXPERIMENT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
      </ChartsWrapper>

      <SubTitle>{t("statisticPage.sample_statistics")}</SubTitle>
      <ChartsWrapper>
        <ChartBox>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataChart2} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 14 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="total" fill="#047857" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataChart2}
                dataKey="total"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {dataChart2.map((entry, index) => (
                  <Cell key={`cell-sample-${index}`} fill={SAMPLE_COLORS[index % SAMPLE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
      </ChartsWrapper>
    </Container>
  );
};

export default StatisticAdmin;
