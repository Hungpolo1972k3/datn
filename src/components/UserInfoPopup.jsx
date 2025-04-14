import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  z-index: 998;  
  pointer-events: all; 
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 3px solid rgb(162, 166, 171); 
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 999;  // Đặt popup lên trên overlay
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  font-size: 30px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 40px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #f00;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  width: 150px;
  text-align: left;
`;

const ValueText = styled.span`
  width: 60%;
  text-align: left;
  padding: 10px;
`;

const UserInfoComponentPopup = ({ closePopup, userInfo }) => {
  const { t } = useTranslation();

  // Lọc bỏ các khóa không cần thiết
  const filteredUserInfo = Object.entries(userInfo).filter(
    ([key]) => !['status', '_id', 'createdAt', 'updatedAt', "__v"].includes(key)
  );

  return (
    <>
      <Overlay onClick={closePopup} />
      <PopupContainer>
        <Title>{t("userInfoComponent.title")}</Title>
        <CloseButton onClick={closePopup}>×</CloseButton>
        <InfoWrapper>
          {filteredUserInfo.map(([key, value]) => (
            <InfoRow key={key}>
              <Label>{t(`userInfoComponent.${key}`)}</Label>
              <ValueText>
                {key === "birthday" && value
                  ? new Date(value).toISOString().split("T")[0]
                  : value || ""}
              </ValueText>
            </InfoRow>
          ))}
        </InfoWrapper>
      </PopupContainer>
    </>
  );
};

export default UserInfoComponentPopup;
