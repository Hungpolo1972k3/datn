import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ResultComponent from './ResultComponent';
import { apiGetVirulencesBySampleId } from '../service/virulence';
import { apiGetAmrsBySampleId } from '../service/amr';
import { useTranslation } from 'react-i18next';
import { FiDownload } from 'react-icons/fi';
import { apiDownloadFile } from '../service/blastn';
import { useNotice } from "../context/NoticeContext";
import { apiDeleteSampleById } from '../service/sample';

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
  font-size: 40px;
  margin-bottom: 20px;
  color: #1e3a8a;
`;

const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  margin: 0 auto;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  color: #fff;
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
  color: ${(props) => props.color || '#007bff'};
  font-size: 30px;

  &:hover {
    color: ${(props) => props.color ? props.color : '#0056b3'};
  }
`;

const InfoText = styled.p`
  text-align: center;
  font-size: 18px;
  color: #1e3a8a;
  margin-bottom: 15px;
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipText = styled.div`
  background-color: #e53935;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 6px 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
`;
const ExperimentInfo = ({ showModal, closeModal, experiments, info }) => {
  const { t } = useTranslation();
  const [virulenceInfo, setVirulenceInfo] = useState([]);
  const [amrInfo, setAmrInfo] = useState([]);
  const [showResultAll, setShowResultAll] = useState(false);
  const [showResult, setShowResult] = useState({});
  const [fastaInfo, setFastaInfo] = useState({})
  const { showNotice } = useNotice();
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
    setFastaInfo((prev) => ({
      ...prev,
      virulence: virulence.data.length,
      amr: amr.data.length,
    }));
  };
  const handleDownloadFile = async(inputUrl) => {
    console.log(inputUrl)
    try {
      await apiDownloadFile(inputUrl);
    } catch (error) {
      showNotice(0,t("resultPage.error.download"))
    }
  }
  if (!showModal) return null;
  const handleDeleteSample = async (index) => {
    const sample = experiments[index];
    try {
      await apiDeleteSampleById(sample._id);
      showNotice(1, t("experimentInfoComponent.deleteSuccess", { name: sample.name }));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      showNotice(0, t("experimentInfoComponent.deleteFailed"));
    }
  };

  return (
    <PopUpContainer>
      <PopUpForm>
        <CloseButton onClick={closeModal}>×</CloseButton>
        <Title>{t('experimentInfoComponent.title')}</Title>
        <InfoText>
          🧪 <strong>{t("experimentInfoComponent.experimentName")}:</strong> {info.name} |  
          🧬 <strong>{t("experimentInfoComponent.code")}:</strong> {info.code} |  
          🕒 <strong>{t("experimentInfoComponent.createdTime")}:</strong> {new Date(info.createdAt).toLocaleString('vi-VN')}
        </InfoText>
        <Table>
          <thead>
            <tr>
              <TableHeader>{t('experimentInfoComponent.index')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.sampleName')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.header')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.length')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.fileName')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.createdTime')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.details')}</TableHeader>
              <TableHeader>{t('experimentInfoComponent.delete')}</TableHeader>
            </tr>
          </thead>
          <tbody>
          {experiments.length === 0 ? (
            <TableRow>
              <TableData colSpan="8" style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                {t('experimentInfoComponent.noData')}
              </TableData>
            </TableRow>
          ) : (
            experiments.map((experiment, index) => (
              <TableRow key={index}>
                <TableData>{index + 1}</TableData>
                <TableData>{experiment.name}</TableData>
                <TableData>{experiment.header}</TableData>
                <TableData>{experiment.length}</TableData>
                <TableData>
                  {experiment.file_name}
                  <Icon onClick={() => handleDownloadFile(experiment.fastaFilePath)}>
                    <FiDownload />
                  </Icon>
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
                <TableData>
                  <TooltipWrapper>
                    <Icon color="#e53935" onDoubleClick={() => handleDeleteSample(index)}>
                      ❌
                    </Icon>
                    <TooltipText className="tooltip-text">
                      {t('experimentInfoComponent.deletecontent')}
                    </TooltipText>
                  </TooltipWrapper>
                </TableData>
              </TableRow>
            ))
          )}
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