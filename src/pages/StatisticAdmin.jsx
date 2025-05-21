import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { useTranslation } from "react-i18next";
import { apiGetExperimentStatisticAdmin } from "../service/experiment";

const Container = styled.div`
  padding: 30px;
`;

const Title = styled.h2`
  font-size: 36px;
  color: #1e3a8a;
  text-align: center;
  margin-bottom: 20px;
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

const COLORS = ["#1e3a8a", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe", "#eff6ff", "#c084fc"];

const StatisticAdmin = () => {
  const { t } = useTranslation();
  const [dataChart, setDataChart] = useState([]);

  const fetchStatisticAdmin = async () => {
    try {
      const response = await apiGetExperimentStatisticAdmin();
      const rawData = response.data;
      const formattedData = rawData.map(item => ({
        name: item.user.username,
        total: item.total
      }));
      setDataChart(formattedData);
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
