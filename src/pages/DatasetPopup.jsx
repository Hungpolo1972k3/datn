import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { apiDownloadFile, apiGetFileInfo, apiGetFolderInfo } from "../service/dataset";
import { FiDownload, FiChevronDown, FiChevronRight } from "react-icons/fi";
import ShowFileContent from "../components/ShowFileContent";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import JsonTable from "../components/JsonTable";
import datasetFolder from "../utils/datasetFolder.json";

const PopupOverlay = styled.div`
  background: white;
  z-index: 1000;
  padding: 24px;
  overflow-y: auto;
  border-radius: 12px;
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
const BreadcrumbWrapper = styled.nav`
  font-size: 14px;
  margin-bottom: 15px;
  margin-left: 35px;
  margin-top: 15px;
  color: #555;
  user-select: none;
`;

const Crumb = styled.span`
  cursor: pointer;
  color: #1e3a8a;
  font-weight: bold;
  font-size: 22px;
  &:hover {
    text-decoration: underline;
  }
`;

const CrumbMain = styled.span`
  cursor: pointer;
  color: #1e3a8a;
  font-size: 24px;
  font-weight: bold;
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0 15px;
  font-size: 30px;
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

const DatasetPopup = () => {
  const navigate = useNavigate();
  const [genome, setGenome]= useState([]);
  const { name } = useParams(); 
  const dataset = datasetFolder.find(item => item.name === name);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const folderinfo = await apiGetFolderInfo(dataset.downloadUrl);
        setGenome(folderinfo);
      } catch (error) {
        console.error("Không thể tải dữ liệu dataset:", error);
      }
    };
    fetchData();
  }, [name]);

  const { t } = useTranslation();

  const handleDownload = async (filePath) => {
    try {
      await apiDownloadFile(filePath); 
    } catch (error) {
      console.log(error.message);
    }
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

  const grouped = genome ? groupByFolderName(genome) : {};
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

  const handleViewContent = async (filePath) => {
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
      setFileContent(t("breadcrumb.viewFile"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PopupOverlay>
        <BreadcrumbWrapper>
          <Crumb onClick={() => navigate('/dataset')}>{t("breadcrumb.ABDataset")}</Crumb>
          <Separator>›</Separator>
          <Crumb onClick={() => navigate('/dataset')}>{t("breadcrumb.dataset")}</Crumb>
          <Separator>›</Separator>
          <CrumbMain onClick={() => navigate(`/dataset-popup/${dataset.name}`)}>
            {dataset.name}
          </CrumbMain>
      </BreadcrumbWrapper>
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
                href={`https://www.ncbi.nlm.nih.gov/sra/${encodeURIComponent(dataset.name)}`}
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
                  <span>{isOpen ? <FiChevronDown size={20} /> : <FiChevronRight size={20} />}</span>
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
                          onClick={() => handleViewContent(file.path)}
                          style={{ cursor: "pointer", fontSize: "1.5rem" }}
                        >
                          {viewedFilePath === file.path ? "🧐" : "🔍"}
                        </span>
                        <FiDownload onClick={() => handleDownload(file.path)} />
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
