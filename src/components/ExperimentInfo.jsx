import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ResultComponent from './ResultComponent';
import { apiGetVirulencesBySampleId } from '../service/virulence';
import { apiGetAmrsBySampleId } from '../service/amr';
import { useTranslation } from 'react-i18next';

const PopUpContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopUpForm = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 95%;
  height: 90%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #888;

  &:hover {
    color: #000;
  }
`;

const Title = styled.h3`
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  margin: 0 auto;
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  padding: 10px;
  text-align: left;
  font-weight: bold;
`;

const TableData = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Icon = styled.span`
  cursor: pointer;
  margin-left: 20px;
  color: ${(props) => props.color || '#007bff'};
  font-size: 30px;

  &:hover {
    color: ${(props) => props.color ? props.color : '#0056b3'};
  }
`;

const ExperimentInfo = ({ showModal, closeModal, experiments }) => {
  const { t } = useTranslation();
  const [virulenceInfo, setVirulenceInfo] = useState([]);
  const [amrInfo, setAmrInfo] = useState([]);
  const [showResultAll, setShowResultAll] = useState(false);
  const [showResult, setShowResult] = useState({});
  const [fastaInfo, setFastaInfo] = useState({})

  const handleGetResult = async(index) => {
    setShowResultAll(!showResultAll);
    setShowResult((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    setFastaInfo(experiments[index]);
    const virulence = await apiGetVirulencesBySampleId(experiments[index]._id);
    const amr = await apiGetAmrsBySampleId(experiments[index]._id);
    setVirulenceInfo(virulence.data);
    setAmrInfo(amr.data);
  };

  if (!showModal) return null;

  return (
    <PopUpContainer>
      <PopUpForm>
        <CloseButton onClick={closeModal}>×</CloseButton>
        <Title>{t('experimentInfoComponent.title')}</Title>
        <Table>
          <thead>
            <tr>
              <TableHeader>{t('experimentInfoComponent.index')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.sampleName')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.sampleCode')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.header')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.length')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.fileName')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.createdTime')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.details')}</TableHeader>
            </tr>
          </thead>
          <tbody>
            {experiments.map((experiment, index) => (
              <TableRow key={index}>
                <TableData>{index + 1}</TableData>
                <TableData>{experiment.name}</TableData>
                <TableData>{experiment.code}</TableData>
                <TableData>{experiment.header}</TableData>
                <TableData>{experiment.length}</TableData>
                <TableData>
                  {experiment.file_name}
                  <Icon onClick={() => alert(t('experimentInfoComponent.downloadFile'))}>⤓</Icon>
                </TableData>
                <TableData>
                  {new Date(experiment.createdAt).toLocaleString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </TableData>
                <TableData>
                  <Icon onClick={() => handleGetResult(index)}>
                    {showResult[index] ? '🧐' : '🔍'}
                  </Icon>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
        {showResultAll && (
          <ResultComponent
            fastaInfo={fastaInfo}
            virulenceInfo={virulenceInfo}
            amrInfo={amrInfo}
          />
        )}
      </PopUpForm>
    </PopUpContainer>
  );
};

export default ExperimentInfo;