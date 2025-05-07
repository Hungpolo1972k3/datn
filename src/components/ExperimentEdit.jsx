import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiEditExperiment } from '../service/experiment';
import { useNotice } from "../context/NoticeContext";
import { useTranslation } from "react-i18next";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.showModal ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  height: 50%;
  position: relative;
`;

const ModalHeader = styled.h3`
  margin: 0;
  font-size: 40px;
  text-align: center;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 0px 30px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  font-size: 16px;
  &:focus {
    outline: none;
    border: 1px solid #86b7fe;
    box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 25px;
  margin: 0px 30px;
  background-color: ${(props) => (props.primary ? '#007bff' : '#f8f9fa')};
  color: ${(props) => (props.primary ? 'white' : '#007bff')};
  border: 1px solid ${(props) => (props.primary ? '#007bff' : '#dee2e6')};
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#e2e6ea')};
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  margin-right: 30px;
  top: 10px;
  right: 10px;
  font-size: 35px;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #333;
  }
`;

const ExperimentEdit = ({ showModal, closeModal, experimentInfo }) => {
  const { showNotice } = useNotice();
  const { t } = useTranslation();

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [engineer, setEngineer] = useState('');
  const [createdTime, setCreatedTime] = useState('');

  useEffect(() => {
    if (experimentInfo) {
      setCode(experimentInfo.code || '');
      setName(experimentInfo.name || '');
      setEngineer(experimentInfo.engineer || '');
      setCreatedTime(experimentInfo.createdTime || '');
    }
  }, [experimentInfo]);

  const handleSave = async () => {
    try {
      await apiEditExperiment(experimentInfo._id, name, code, engineer, createdTime);
      showNotice(1, t('experimentEditComponent.success'));
      closeModal();
      window.location.reload();
    } catch (error) {
      showNotice(2, t('experimentEditComponent.fail'));
    }
  };

  return (
    <ModalOverlay showModal={showModal}>
      <ModalContainer>
        <CloseIcon onClick={closeModal}>×</CloseIcon>

        <ModalHeader>{t('experimentEditComponent.title')}</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t('experimentEditComponent.codePlaceholder')}
          />
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('experimentEditComponent.namePlaceholder')}
          />
          <Input
            type="text"
            value={engineer}
            onChange={(e) => setEngineer(e.target.value)}
            placeholder={t('experimentEditComponent.engineerPlaceholder')}
          />
          <Input
            type="text"
            value={createdTime}
            onChange={(e) => setCreatedTime(e.target.value)}
            placeholder={t('experimentEditComponent.timePlaceholder')}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeModal}>{t('experimentEditComponent.cancelBtn')}</Button>
          <Button primary onClick={handleSave}>{t('experimentEditComponent.saveBtn')}</Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ExperimentEdit;