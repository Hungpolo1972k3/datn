import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ExperimentAddPopup from "../components/ExperimentAdd";
import ExperimentInfo from '../components/ExperimentInfo';
import { useDispatch, useSelector } from "react-redux";
import { apiGetExperimentsByUserId } from "../service/experiment";
import { apiGetSamplesByExperimentId } from '../service/sample';
import ExperimentEdit from '../components/ExperimentEdit';
import { useTranslation } from "react-i18next";
import ConfirmDeleteExperimentPopup from '../components/ConfirmDeleteExperiment';

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

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 18px;
  background-color: #00aaff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0088cc;
  }
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
  background-color: #007bff;
  border: 1px solid #ddd;
  color: #fff;
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

const EditWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #ffaa00;

  &:hover {
    color: #cc6600;
  }
`;

const DeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #ff4d4d;

  &:hover {
    color: #cc0000;
  }
`;

const ExperimentPage = () => {
  const { t } = useTranslation();
  const { userId } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [experiments, setExperiments] = useState([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [showModalInfo, setShowModalInfo] = useState(false);
  const [sampleInfo, setSampleInfo] = useState([]);
  const [experimentInfo, setExperimentInfo] = useState({});

  const handleViewDetails = async (id, experiment) => {
    setShowModalInfo(true);
    let samples = await apiGetSamplesByExperimentId(id);
    setSampleInfo(samples.data);
    setExperimentInfo(experiment);
  };

  const closeModalInfo = () => setShowModalInfo(false);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  const handleEditClick = (experiment) => {
    setSelectedExperiment(experiment);
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
    setSelectedExperiment(null);
  };

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [experimentToDelete, setExperimentToDelete] = useState(null);
  
    const handleDeleteClick = (experiment) => {
      setExperimentToDelete(experiment);
      setShowDeletePopup(true);
      console.log(experiment)
    };

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        if (userId) {
          const experiment = await apiGetExperimentsByUserId(userId);
          setExperiments(experiment.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchExperiments();
  }, [userId]);

  return (
    <Container>
      <Wrapper>
        <Title>{t('experimentPage.experimentList')}</Title>

        <ButtonWrapper>
          <Button onClick={openModal}>{t('experimentPage.addExperiment')}</Button>
        </ButtonWrapper>

        <Table>
          <thead>
            <tr>
              <TableHeader>{t('experimentPage.no')}</TableHeader>
              <TableHeader>{t('experimentPage.experimentName')}</TableHeader>
              <TableHeader>{t('experimentPage.experimentCode')}</TableHeader>
              <TableHeader>{t('experimentPage.createdTime')}</TableHeader>
              <TableHeader>{t('experimentPage.detail')}</TableHeader>
              <TableHeader>{t('experimentPage.edit')}</TableHeader>
              <TableHeader>{t('experimentPage.delete')}</TableHeader>
            </tr>
          </thead>
          <tbody>
            {experiments.map((experiment, index) => (
              <TableRow key={experiment.id}>
                <TableData>{index + 1}</TableData>
                <TableData>{experiment.name}</TableData>
                <TableData>{experiment.code}</TableData>
                <TableData>
                  {new Date(experiment.createdAt).toLocaleString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </TableData>
                <TableData>
                  <ViewDetailsWrapper onClick={() => handleViewDetails(experiment._id, experiment)}>
                    <span>🔍</span>
                    <span style={{ marginLeft: '8px' }}>{t('experimentPage.detail')}</span>
                  </ViewDetailsWrapper>
                </TableData>
                <TableData>
                  <EditWrapper onClick={() => handleEditClick(experiment)}>
                    <span>✏️</span>
                    <span style={{ marginLeft: '8px' }}>{t('experimentPage.edit')}</span>
                  </EditWrapper>
                </TableData>
                <TableData>
                  <DeleteWrapper onClick={() => handleDeleteClick(experiment)}>
                    <span>❌</span>
                    <span style={{ marginLeft: '8px' }}>{t('experimentPage.delete')}</span>
                  </DeleteWrapper>
                </TableData>
              </TableRow>   
            ))}
          </tbody>
        </Table>

        <ExperimentInfo showModal={showModalInfo} closeModal={closeModalInfo} experiments={sampleInfo} info={experimentInfo} />
        <ExperimentAddPopup showModal={showModal} closeModal={closeModal} />
        {showEditPopup && (
          <ExperimentEdit
            showModal={showEditPopup}
            closeModal={closeEditPopup}
            experimentInfo={selectedExperiment}
          />
        )}
        {showDeletePopup && (
          <ConfirmDeleteExperimentPopup
            closeModal={() => setShowDeletePopup(false)}
            id={experimentToDelete._id}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default ExperimentPage;
