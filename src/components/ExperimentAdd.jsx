import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { createExperiment } from '../service/experiment';
import { useNotice } from "../context/NoticeContext";
import { useTranslation } from "react-i18next";

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
  width: 90%;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 45px;
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
  margin-right: 20px;
  background-color: transparent;
  border: none;
  font-size: 40px;
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
  const { t } = useTranslation();
  const { userId } = useSelector((state) => state.user);
  const { showNotice } = useNotice();

  const [experimentName, setExperimentName] = useState('');
  const [experimentCode, setExperimentCode] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!experimentName.trim()) newErrors.experimentName = t('experimentAddComponent.nameError');
    if (!experimentCode.trim()) newErrors.experimentCode = t('experimentAddComponent.codeError');
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
        code: experimentCode
      });
      showNotice(1, t("experimentAddComponent.success"));

      setExperimentName('');
      setExperimentCode('');
      setErrors({});
      closeModal();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      showNotice(0, t("experimentAddComponent.fail"));
    }
  };

  return (
    <ModalBackground show={showModal}>
      <ModalContainer>
        <CloseButton onClick={closeModal}>×</CloseButton>
        <Title>{t('experimentAddComponent.title')}</Title>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="experimentName">{t('experimentAddComponent.nameLabel')}</Label>
            <Input
              type="text"
              id="experimentName"
              value={experimentName}
              onChange={(e) => setExperimentName(e.target.value)}
              placeholder={t('experimentAddComponent.namePlaceholder')}
            />
            {errors.experimentName && <ErrorText>{errors.experimentName}</ErrorText>}
          </div>
          <div>
            <Label htmlFor="experimentCode">{t('experimentAddComponent.codeLabel')}</Label>
            <Input
              type="text"
              id="experimentCode"
              value={experimentCode}
              onChange={(e) => setExperimentCode(e.target.value)}
              placeholder={t('experimentAddComponent.codePlaceholder')}
            />
            {errors.experimentCode && <ErrorText>{errors.experimentCode}</ErrorText>}
          </div>
          <Button type="submit">{t('experimentAddComponent.submitBtn')}</Button>
        </Form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ExperimentAddPopup;
