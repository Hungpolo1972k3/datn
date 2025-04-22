import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { apiDeleteExperiment } from "../service/experiment";
import { useNotice } from "../context/NoticeContext";
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 500px;
  text-align: center;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  position: relative; 
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  padding: 0 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  transition: background-color 0.3s;

  &:first-child {
    background-color: #f44336;
    color: white;

    &:hover {
      background-color: #d32f2f;
    }
  }

  &:last-child {
    background-color: #4caf50;
    color: white;

    &:hover {
      background-color: #388e3c;
    }
  }
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 40px;
  cursor: pointer;
  color: #333;
`;

const ConfirmDeleteExperiment = ({ closeModal, id }) => {
  const { t } = useTranslation();
  const {showNotice} = useNotice();
  const handleConfirmDeleteExperiment = async(id) => {
    try {
        await apiDeleteExperiment(id);
        closeModal();
        showNotice(1, t('deleteExperimentPopup.success'));
        window.location.reload();
    } catch (error) {
        showNotice(0, t('deleteExperimentPopup.fail'))
    }
  }
  return (
    <Overlay>
      <PopupContainer>
      <CloseIcon onClick={closeModal}>&times;</CloseIcon>
        <Title>{t("deleteExperimentPopup.confirmDelete")}</Title>
        <ButtonWrapper>
          <Button onClick={closeModal}>{t("deleteExperimentPopup.cancel")}</Button>
          <Button onClick={() => handleConfirmDeleteExperiment(id)}>{t("deleteExperimentPopup.delete")}</Button>
        </ButtonWrapper>
      </PopupContainer>
    </Overlay>
  );
};

export default ConfirmDeleteExperiment;
