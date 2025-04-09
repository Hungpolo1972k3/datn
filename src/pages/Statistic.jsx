import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { apiExperimentStatistic } from "../service/experiment";

const Container = styled.div`
  padding: 20px;
  background-color: #f1f9ff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
`;

const StatCard = styled.div`
  width: 48%;
  padding: 20px;
  margin: 30px;
  background-color: ${(props) => (props.primary ? "#e0f2ff" : "#f1f9ff")}; /* Different background colors */
  border: 1px solid #e0f2ff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  color: #1e3a8a;
  margin-bottom: 10px;
  font-size: 40px; 
  text-align: center
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Label = styled.p`
  font-size: 24px;
  color: #1e3a8a;
  font-weight: bold;
  margin-top: 10px; 
`;

const Value = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #1e40af;
  margin: 0;
`;

const Statistic = () => {
  const { userId } = useSelector((state) => state.user);

  const [countExperimentAll, setCountExperimentAll] = useState(null);
  const [countSampleAll, setCountSampleAll] = useState(null);
  const [countExperiment, setCountExperiment] = useState(null);
  const [countSample, setCountSample] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const dataAll = await apiExperimentStatistic('');
        setCountExperimentAll(dataAll.data.countExperiment);
        setCountSampleAll(dataAll.data.countSample);
        const dataUser = await apiExperimentStatistic(userId);
        setCountExperiment(dataUser.data.countExperiment);
        setCountSample(dataUser.data.countSample);
      } catch (err) {
        console.error("Error fetching statistics", err);
      }
    };

    fetchStatistics();
  }, [userId]);

  return (
    <Container>
      <StatCard primary>
        <Title>Tất cả</Title>
        <StatItem>
          <Label>Thí nghiệm</Label>
          <Value>{countExperimentAll}</Value>
        </StatItem>
        <StatItem>
          <Label>Mẫu thí nghiệm</Label>
          <Value>{countSampleAll}</Value>
        </StatItem>
      </StatCard>

      <StatCard>
        <Title>Tài khoản</Title>
        <StatItem>
          <Label>Thí nghiệm</Label>
          <Value>{countExperiment}</Value>
        </StatItem>
        <StatItem>
          <Label>Mẫu thí nghiệm</Label>
          <Value>{countSample}</Value>
        </StatItem>
      </StatCard>
    </Container>
  );
};

export default Statistic;
