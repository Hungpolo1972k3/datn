import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiEditExperiment } from '../service/experiment';
import { useNotice } from "../context/NoticeContext";

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
  width: 400px;
  max-width: 90%;
  position: relative;
`;

const ModalHeader = styled.h3`
  margin: 0;
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
  padding: 10px 15px;
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
  top: 10px;
  right: 10px;
  font-size: 30px;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #333;
  }
`;

const ExperimentEdit = ({ showModal, closeModal, experimentInfo }) => {
  const { showNotice } = useNotice();

  // Define state for the fields
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
      showNotice(1, "Chỉnh sửa thí nghiệm thành công");
      closeModal();
      window.location.reload();
    } catch (error) {
      showNotice(2, "Chỉnh sửa thí nghiệm thất bại"); 
    }
  };

  return (
    <ModalOverlay showModal={showModal}>
      <ModalContainer>
        <CloseIcon onClick={closeModal}>×</CloseIcon>

        <ModalHeader>Chỉnh sửa Thí nghiệm</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            placeholder="Mã thí nghiệm"
          />
          <Input
            type="text"
            value={name}  
            onChange={(e) => setName(e.target.value)}  
            placeholder="Tên thí nghiệm"
          />
          <Input
            type="text"
            value={engineer} 
            onChange={(e) => setEngineer(e.target.value)} 
            placeholder="Kỹ sư thực hiện"
          />
          <Input
            type="text"
            value={createdTime}  
            onChange={(e) => setCreatedTime(e.target.value)} 
            placeholder="Thời gian tạo"
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeModal}>Hủy</Button>
          <Button primary onClick={handleSave}>Lưu</Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ExperimentEdit;
