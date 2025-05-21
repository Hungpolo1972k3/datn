import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ExperimentInfo from '../components/ExperimentInfo';
import { useDispatch, useSelector } from "react-redux";
import { apiGetExperimentsByUserId, apiGetAllExperiments } from "../service/experiment";
import { apiGetSamplesByExperimentId } from '../service/sample';
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  width: 90%;
  flex-direction: column;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  width: 35%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px;
  font-size: 18px;
  text-align: left;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  border: 1px solid #ddd;
`;

const TableData = styled.td`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
`;

const ViewDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #00aaff;

  &:hover {
    color: #0088cc;
  }
`;

const ExperimentPage = () => {
  const { t } = useTranslation();
  const { userId } = useSelector((state) => state.user);
  const [experiments, setExperiments] = useState([]);
  const [filteredExperiments, setFilteredExperiments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEngineer, setSelectedEngineer] = useState('');

  const [showModalInfo, setShowModalInfo] = useState(false);
  const [sampleInfo, setSampleInfo] = useState([]);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        if (userId) {
          const experiment = await apiGetAllExperiments();
          setExperiments(experiment.data);
          setFilteredExperiments(experiment.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchExperiments();
  }, [userId]);

  useEffect(() => {
    const filtered = experiments.filter((exp) => {
      const keyword = searchTerm.toLowerCase();
      const matchSearch =
        exp.name?.toLowerCase().includes(keyword) ||
        exp.code?.toLowerCase().includes(keyword) ||
        exp.engineer?.toLowerCase().includes(keyword);

      const matchEngineer = selectedEngineer
        ? exp.engineer === selectedEngineer
        : true;

      return matchSearch && matchEngineer;
    });
    setFilteredExperiments(filtered);
  }, [searchTerm, selectedEngineer, experiments]);

  const handleViewDetails = async (id) => {
    setShowModalInfo(true);
    let samples = await apiGetSamplesByExperimentId(id);
    setSampleInfo(samples.data);
  };

  const closeModalInfo = () => setShowModalInfo(false);

  const uniqueEngineers = [...new Set(experiments.map((exp) => exp.engineer))];

  return (
    <Container>
      <Wrapper>
        <Title>{t('experimentPage.experimentList')}</Title>

        <FilterContainer>
          <Input
            type="text"
            placeholder={t('experimentPage.searchPlaceholder') || "Tìm kiếm..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select
            value={selectedEngineer}
            onChange={(e) => setSelectedEngineer(e.target.value)}
          >
            <option value="">{t('experimentPage.allPerformers') || "Tất cả người thực hiện"}</option>
            {uniqueEngineers.map((eng, idx) => (
              <option key={idx} value={eng}>{eng}</option>
            ))}
          </Select>
        </FilterContainer>

        <Table>
          <thead>
            <tr>
              <TableHeader>{t('experimentPage.no')}</TableHeader>
              <TableHeader>{t('experimentPage.experimentName')}</TableHeader>
              <TableHeader>{t('experimentPage.experimentCode')}</TableHeader>
              <TableHeader>{t('experimentPage.performer')}</TableHeader>
              <TableHeader>{t('experimentPage.createdTime')}</TableHeader>
              <TableHeader>{t('experimentPage.detail')}</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredExperiments.map((experiment, index) => (
              <TableRow key={experiment._id}>
                <TableData>{index + 1}</TableData>
                <TableData>{experiment.name}</TableData>
                <TableData>{experiment.code}</TableData>
                <TableData>{experiment.engineer}</TableData>
                <TableData>
                  {experiment.createdTime || new Date(experiment.createdAt).toLocaleString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </TableData>
                <TableData>
                  <ViewDetailsWrapper onClick={() => handleViewDetails(experiment._id)}>
                    <span>🔍</span>
                    <span style={{ marginLeft: '8px' }}>{t('experimentPage.detail')}</span>
                  </ViewDetailsWrapper>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>

        <ExperimentInfo showModal={showModalInfo} closeModal={closeModalInfo} experiments={sampleInfo} />
      </Wrapper>
    </Container>
  );
};

export default ExperimentPage;
