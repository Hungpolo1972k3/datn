import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { apiDeleteUser } from "../service/admin";
import { useNotice } from "../context/NoticeContext";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  background: rgba(200, 200, 200, 0.3); 
`;

const ConfirmBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 500px;
  position: relative; // Để đặt icon X vào vị trí chính xác
`;

const ConfirmText = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 25px;
`;

const ConfirmActions = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 40px;
  cursor: pointer;
  color: #333;
`;

const ConfirmDeleteUser = ({onCancel, id }) => {
  const { showNotice } = useNotice();
  const { t } = useTranslation();
  const handleConfirmDeleteUser = async(id) => {
      try {
        await apiDeleteUser(id);
        onCancel();
        showNotice(1, t("ConfirmDeleteUserComponent.delete_user_success"));
        window.location.reload();
      } catch (error) {
        showNotice(0, t("ConfirmDeleteUserComponent.delete_user_fail"))
      } 
  }
  return (
    <Overlay>
      <ConfirmBox>
        <CloseIcon onClick={onCancel}>&times;</CloseIcon> 
        <ConfirmText>{t("ConfirmDeleteUserComponent.title")}</ConfirmText>
        <ConfirmActions>
          <ConfirmButton style={{ backgroundColor: "#007bff", color: "white" }} onClick={() => handleConfirmDeleteUser(id)}>
            {t("ConfirmDeleteUserComponent.confirm")}
          </ConfirmButton>
          <ConfirmButton style={{ backgroundColor: "#ddd" }} onClick={onCancel}>
            {t("ConfirmDeleteUserComponent.cancel")}
          </ConfirmButton>
        </ConfirmActions>
      </ConfirmBox>
    </Overlay>
  );
};

export default ConfirmDeleteUser;
