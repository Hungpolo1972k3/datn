import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { createExperiment } from '../service/experiment';
import { useNotice } from "../context/NoticeContext";

// Styled components for the page layout and form
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 80%;
  max-width: 600px;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  color: #333;
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Label = styled.label`
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #ff4d4d;
  }
`;
const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 4px;
`;

const ExperimentAddPopup = ({ showModal, closeModal }) => {
  const { userId } = useSelector((state) => state.user);
  const { showNotice } = useNotice();

  const [experimentName, setExperimentName] = useState('');
  const [experimenter, setExperimenter] = useState('');
  const [experimentCode, setExperimentCode] = useState('');
  const [creationTime, setCreationTime] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!experimentName.trim()) newErrors.experimentName = 'Tên thí nghiệm không được để trống';
    if (!experimenter.trim()) newErrors.experimenter = 'Người thêm không được để trống';
    if (!experimentCode.trim()) newErrors.experimentCode = 'Mã thí nghiệm không được để trống';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      await createExperiment({
        user_id: userId,
        name: experimentName,
        code: experimentCode,
        engineer: experimenter,
        createdTime: creationTime,
      });
      showNotice(1, "Thêm thí nghiệm thành công");

      setExperimentName('');
      setExperimenter('');
      setExperimentCode('');
      setCreationTime('');
      setErrors({});
      closeModal();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      showNotice(0, "Thêm thí nghiệm thất bại");
    }
  };

  return (
    <ModalBackground show={showModal}>
      <ModalContainer>
        <CloseButton onClick={closeModal}>×</CloseButton>
        <Title>Thêm Thí Nghiệm</Title>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="experimentName">Tên thí nghiệm</Label>
            <Input
              type="text"
              id="experimentName"
              value={experimentName}
              onChange={(e) => setExperimentName(e.target.value)}
              placeholder="Nhập tên thí nghiệm"
            />
            {errors.experimentName && <ErrorText>{errors.experimentName}</ErrorText>}
          </div>

          <div>
            <Label htmlFor="experimenter">Người thêm</Label>
            <Input
              type="text"
              id="experimenter"
              value={experimenter}
              onChange={(e) => setExperimenter(e.target.value)}
              placeholder="Nhập tên người thêm"
            />
            {errors.experimenter && <ErrorText>{errors.experimenter}</ErrorText>}
          </div>

          <div>
            <Label htmlFor="experimentCode">Mã thí nghiệm</Label>
            <Input
              type="text"
              id="experimentCode"
              value={experimentCode}
              onChange={(e) => setExperimentCode(e.target.value)}
              placeholder="Nhập mã thí nghiệm"
            />
            {errors.experimentCode && <ErrorText>{errors.experimentCode}</ErrorText>}
          </div>

          <div>
            <Label htmlFor="creationTime">Thời gian tạo</Label>
            <Input
              type="text"
              id="creationTime"
              value={creationTime}
              onChange={(e) => setCreationTime(e.target.value)}
              placeholder="Nhập thời gian tạo (ví dụ: 2025-04-05 10:00)"
            />
          </div>

          <Button type="submit">Thêm thí nghiệm</Button>
        </Form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ExperimentAddPopup;