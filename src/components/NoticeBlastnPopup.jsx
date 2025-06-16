import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FiClipboard, FiDownload, FiX } from "react-icons/fi";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  width: 55%;
  background: #fff;
  border-radius: 16px;
  padding: 40px 30px 30px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 28px;
  color: #888;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #111;
  }
`;

const Message = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: #1d4ed8;
  text-align: center;
  margin: 0;
`;

const Message2 = styled.p`
  font-size: 16px;
  margin-top: 16px;
  text-align: center;
  color: #3b82f6;
`;

const IdRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  gap: 12px;
`;

const IdText = styled.span`
  font-size: 24px;
  background-color: #f3f4f6;
  color: #111827;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.05);
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 26px;
  color: #2563eb;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #1e3a8a;
  }
`;

const ResultLinkRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const ResultLink = styled.a`
  font-size: 18px;
  color: #0ea5e9;
  text-decoration: underline;

  &:hover {
    color: #0284c7;
  }
`;

const NoticeBlastnPopup = ({ id, onClose }) => {
  const { t } = useTranslation();
  const resultUrl = `http://103.159.50.207:3000/blastn-result/?search=${id}`;

  const handleCopy = () => navigator.clipboard.writeText(id);
  const handleCopyLink = () => navigator.clipboard.writeText(resultUrl);
  const handleDownload = () => {
    const csvContent = `${id}\n${resultUrl}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${id}.csv`;
    link.click();
  };

  return (
    <Overlay>
      <Popup>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>
        <Message>{t("noticeBlastn.line1")}</Message>
        <Message2>{t("noticeBlastn.line2")}</Message2>

        <IdRow>
          <IdText>{id}</IdText>
          <IconButton onClick={handleCopy}>
            <FiClipboard />
          </IconButton>
          <IconButton onClick={handleDownload}>
            <FiDownload />
          </IconButton>
        </IdRow>

        <ResultLinkRow>
          <ResultLink href={resultUrl} target="_blank" rel="noopener noreferrer">
            {t("noticeBlastn.resultLink")}
          </ResultLink>
          <IconButton onClick={handleCopyLink}>
            <FiClipboard />
          </IconButton>
        </ResultLinkRow>
      </Popup>
    </Overlay>
  );
};

export default NoticeBlastnPopup;
