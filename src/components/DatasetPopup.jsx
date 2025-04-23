import React, { useState } from "react";
import styled from "styled-components";
import { useNotice } from "../context/NoticeContext";
import { Download, X } from "lucide-react";
import { apiDownloadFile } from "../service/blastn";

const DimBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-height: 90vh;
  background: white;
  z-index: 1000;
  padding: 24px;
  overflow-y: auto;
  border-radius: 12px;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const SectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  padding: 12px 24px;
  width: 90%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  gap: 8px;
  border: 1px solid #dbe6f5;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  &:nth-child(even) {
    background-color: #e6f0ff;
  }

  &:nth-child(odd) {
    background-color: #ffffff;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DatasetPopup = ({ title, genome, onClose }) => {
  const handleDownload = async(filePath) => {
    await apiDownloadFile(filePath); 
  };
  return (
    <>
      <DimBackground onClick={onClose} />
      <PopupOverlay>
        <PopupHeader>
          <CloseButton onClick={onClose}>
            <X />
          </CloseButton>
        </PopupHeader>
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textAlign: "center",
            color: "#1e3a8a"
          }}
        >
          {title}
        </h2>

        <div>
          {genome.map((file) => (
            <SectionRow key={file.name} onClick={() => handleDownload(file.path)}>
              <Label>{file.name}</Label>
                <ActionButtons>
                    <Download/>
                </ActionButtons>
            </SectionRow>
          ))}
        </div>
      </PopupOverlay>
    </>
  );
};

export default DatasetPopup;
