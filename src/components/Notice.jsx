import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";

const slideIn = keyframes`
  from {
    transform: translateY(-30%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const NoticeContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  width: 320px;
  background-color: #ffffff;
  color: ${(props) => (props.success ? "#2e7d32" : "#c62828")};
  border-left: 6px solid ${(props) => (props.success ? "#2e7d32" : "#c62828")};
  padding: 16px 20px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.4s ease-out;
  z-index: 9999;
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
`;

const Icon = styled.span`
  font-size: 22px;
  margin-right: 10px;
`;

const Content = styled.div`
  font-size: 15px;
  margin-top: 6px;
`;

const ProgressBar = styled.div`
  height: 4px;
  width: 100%;
  margin-top: 12px;
  background-color: #eee;
  border-radius: 2px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${(props) => (props.success ? "#66bb6a" : "#ef5350")};
  animation: progressBar 5s linear forwards;

  @keyframes progressBar {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;

const Notice = ({ label, content }) => {
  const [visible, setVisible] = useState(true);
  const { t } = useTranslation();

  const success = label === 1;
  const icon = success ? "✔️" : "❌";

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <NoticeContainer success={success}>
      <IconRow>
        <Icon>{icon}</Icon>
        <span>{success ? t("noticeComponent.success") : t("noticeComponent.error")}</span>
      </IconRow>
      <Content>{content}</Content>
      <ProgressBar>
        <Progress success={success} />
      </ProgressBar>
    </NoticeContainer>
  );
};

export default Notice;
