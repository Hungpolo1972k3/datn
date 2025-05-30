import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Download, X } from "lucide-react";
import { apiDownloadFile, apiGetFileInfo } from "../service/blastn";
import { ChevronDown, ChevronRight } from "lucide-react";
import ShowFileContent from "./ShowFileContent";
import LoadingSpinner from "./LoadingSpinner";
import { useTranslation } from "react-i18next";
import JsonTable from "./JsonTable"

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
  width: 95%;
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
  gap: 16px;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const folderLabelMap = {
  contigs_summary: "Genomad",
  MLST_output: "MLST",
  PlasmidTyping_output: "PlasmidTyping",
  chromosome: "Platon - Chromosome",
  plasmid: "Platon - Plasmid",
  Quast_output: "Quast",
  Spades_output: "Spades",
};

const groupByFolderName = (genome) => {
  const groups = {};

  genome.forEach((file) => {
    const label = folderLabelMap[file.folderName];
    if (!label) return; 

    if (!groups[label]) {
      groups[label] = [];
    }

    groups[label].push(file);
  });

  return groups;
};

const DatasetPopup = ({ dataset, genome, onClose }) => {
  const { t } = useTranslation();
  const handleDownload = async (filePath) => {
    await apiDownloadFile(filePath); 
  };

  const grouped = groupByFolderName(genome);
  const [expandedSections, setExpandedSections] = useState({});
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const [fileContent, setFileContent] = useState(null);
  const [viewedFilePath, setViewedFilePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileContentRef = useRef(null);
  const [jsonFileContent, setJsonFileContent] = useState([])
  const handleViewContent = async (filePath, fileName) => {
    setLoading(true);
    try {
      const result = await apiGetFileInfo(filePath);
      if (result.data.parsed && Array.isArray(result.data.parsed)) {
      setJsonFileContent(result.data.parsed);
      } else {
        setJsonFileContent([]);
      }
      setFileContent(result.data.content);
      setViewedFilePath(filePath); 
      setTimeout(() => {
        fileContentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (error) {
      setFileContent("Không thể tải nội dung file.");
    } finally {
      setLoading(false);
    }
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            marginBottom: "1rem",
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              textAlign: "center",
              color: "#1e3a8a",
              margin: 0,
            }}
          >
            {dataset.name}
          </h2>
          <a
            href={`https://www.ncbi.nlm.nih.gov/search/all/?term=${encodeURIComponent(dataset.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "2rem",
              color: "#0369a1",
              padding: "4px 10px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            🔗
          </a>
        </div>
        <div
          style={{
            textAlign: "left",
            color: "#1e40af",
            margin: 30,
          }}
        >
          <div style={{ marginBottom: "10px", marginLeft:"10px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2>
              <a
                href="https://www.ncbi.nlm.nih.gov/sra/SRR1945422"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1e40af", textDecoration: "underline" }}
              >
                {dataset.title}
              </a>
            </h2>
            <h3>{dataset.description}</h3>
            <h3>{dataset.sequencingSystem}</h3>
          </div>
        </div>
        <div>
          {Object.entries(grouped).map(([section, files]) => {
            const isOpen = expandedSections[section] ?? true;

            return (
              <div key={section}>
                <h2
                  style={{
                    margin: "16px 40px 8px",
                    color: "#1e40af",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                  onClick={() => toggleSection(section)}
                >
                  {section}
                  <span>{isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}</span>
                </h2>

                {isOpen &&
                  files.map((file) => (
                    <SectionRow key={file.path}>
                      <Label>
                        <span style={{ flex: 1 }}>{file.fileName}</span>
                        <span style={{ minWidth: "80px", textAlign: "right", color: "#555" }}>{file.size}</span>
                      </Label>
                      <ActionButtons>
                        <span
                          onClick={() => handleViewContent(file.path, file.fileName)}
                          style={{ cursor: "pointer", fontSize: "1.5rem" }}
                        >
                          {viewedFilePath === file.path ? "🧐" : "🔍"}
                        </span>
                        <Download onClick={() => handleDownload(file.path)} />
                      </ActionButtons>
                    </SectionRow>
                  ))}
              </div>
            );
          })}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          fileContent && (
            <>
              <div ref={fileContentRef}>
                <ShowFileContent fileContent={fileContent} viewedFile={viewedFilePath} />
              </div>
              {jsonFileContent && jsonFileContent.length > 0 && (
                <JsonTable data={jsonFileContent} />
              )}
            </>
          )
        )}
      </PopupOverlay>
    </>
  );
};

export default DatasetPopup;
