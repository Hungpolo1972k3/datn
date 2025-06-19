import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import AmrCompare from "./AmrCompare";
import VirulenceCompare from "./VirulenceCommpare";

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 3rem;
  color: #334155;
  cursor: pointer;

  &:hover {
    color: #1e293b;
  }
`;

const TabBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? "#2563eb" : "#e2e8f0")};
  color: ${(props) => (props.active ? "white" : "#1e293b")};
  border: none;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#1e40af" : "#cbd5e1")};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 40px;
  box-shadow: 0 2px 8px rgb(37 99 235 / 0.15);
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  background-color: #2563eb;
  color: white;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
  user-select: none;
  border-bottom: 2px solid #1e40af;
`;

const Td = styled.td`
  background-color: #f9fafb;
  padding: 12px 16px;
  border-bottom: 1px solid #cbd5e1;
  font-size: 0.95rem;
  color: #1e293b;
  word-break: break-word;
`;

const Tr = styled.tr`
  transition: background-color 0.25s ease;

  &:hover {
    background-color: #dbeafe;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: #0f172a;

  &:hover {
    color: #1e40af;
  }
`;

const DetailBox = styled.div`
  background-color: #eef6ff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgb(37 99 235 / 0.15);
`;

const NucleicContent = styled.div`
  margin-bottom: 16px;
  word-break: break-word;
  max-width: 100%;
  background-color: #f9f9f9;
  padding: 10px;
  border-left: 4px solid #007bff;
  transition: all 0.3s ease;
`;

const InfoBox = styled(DetailBox)`
  margin-bottom: 24px;
`;

const InfoName = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 12px;
  color: #1e40af;
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const InfoTh = styled.th`
  text-align: left;
  padding: 8px 12px;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  border-radius: 6px 0 0 6px;
`;

const InfoTd = styled.td`
  padding: 8px 12px;
  background-color: #f9fafb;
  border-bottom: 1px solid #cbd5e1;
  color: #1e293b;
`;

const InfoTr = styled.tr`
  &:last-child td {
    border-bottom: none;
    border-radius: 0 0 6px 6px;
  }
`;

const InfoHeader = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const GeneName = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #0f172a;
`;

const BacteriaName = styled.div`
  font-size: 2rem;
  color: #475569;
  font-style: italic;
`;
const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const BreadcrumbWrapper = styled.nav`
  font-size: 14px;
  margin-bottom: 15px;
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

const BlastnModal = ({ blastn, onClose, info, bacteria, virulence, virulenceDataset, amr, amrDataset }) => {
  const { t } = useTranslation();
  const modalRef = useRef();
  const [selectedRow, setSelectedRow] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  if (!Array.isArray(blastn)) return null;

  const keyToLabel = {
    avgIdentity: t("blastn.avgIdentity"),
    avgBitScore: t("blastn.avgBitScore"),
    avgAlignmentLength: t("blastn.avgAlignmentLength"),
    avgMismatch: t("blastn.avgMismatch"),
    avgGapOpens: t("blastn.avgGapOpens"),
    avgEValue: t("blastn.avgEValue"),
    avgCoverage: t("blastn.avgCoverage"),
  };

  const headers = [
    t("blastn.index"),
    t("blastn.query"),
    t("blastn.subject"),
    t("blastn.identity"),
    t("blastn.bitScore"),
    t("blastn.evalue"),
    t("blastn.alignmentLength"),
    t("blastn.mismatches"),
    t("blastn.gapOpens"),
    t("blastn.qStart"),
    t("blastn.qEnd"),
    t("blastn.sStart"),
    t("blastn.sEnd"),
  ];

  const keys = [
    "index",
    "query",
    "subject",
    "identity",
    "bitScore",
    "evalue",
    "alignmentLength",
    "mismatches",
    "gapOpens",
    "qStart",
    "qEnd",
    "sStart",
    "sEnd",
  ];

  const toggleRow = (item, idx) => {
    if (selectedRow?.index === idx) {
      setSelectedRow(null);
    } else {
      setSelectedRow({ data: item, index: idx });
      setTimeout(() => {
        modalRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <BreadcrumbWrapper>
         <Crumb onClick={() => onClose()}>{t("breadcrumb.overview")}</Crumb>
          <Separator>›</Separator>
          <CrumbMain>{info.name}</CrumbMain>
      </BreadcrumbWrapper>
      <Overlay>
      <Modal ref={modalRef}>
        <h2 style={{ fontSize: "3rem", fontWeight: "bold", color: "#1e40af", marginTop: "32px", textAlign: "center", marginBottom: "40px" }}>
          {t("blastn.detailedResults")}
        </h2>
        <TabWrapper>
          <TabButton active={activeTab === "info"} onClick={() => setActiveTab("info")}>
            🔬 {t("blastn.info")}
          </TabButton>
          <TabButton active={activeTab === "virulence"} onClick={() => setActiveTab("virulence")}>
            🧫 {t("blastn.virulenceFactor")}
          </TabButton>
          <TabButton active={activeTab === "amr"} onClick={() => setActiveTab("amr")}>
            💊 {t("blastn.amrFactor")}
          </TabButton>
        </TabWrapper>
        <InfoHeader>
          <GeneName><a
              href={`/dataset?search=${encodeURIComponent(info.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
              >
              {info.name}
              </a></GeneName>
        <BacteriaName>{bacteria}</BacteriaName>
        </InfoHeader>
          

        {activeTab === "info" && info && (
          <InfoBox>
            <InfoTable>
          <tbody>
            {info.result && Object.entries(info.result).map(([key, value]) => (
              <InfoTr key={key}>
              <InfoTh>{keyToLabel[key] || key}</InfoTh>
              <InfoTd>{typeof value === "number" ? value.toFixed(2) : value}</InfoTd>
              </InfoTr>
            ))}
          </tbody>
          </InfoTable>
            {selectedRow && (
              <DetailBox>
                <NucleicContent>
                  {headers.map((header, i) => {
                    const key = keys[i];
                    let value = key === "index" ? selectedRow.index + 1 : selectedRow.data[key] ?? "N/A";
                    return (
                      <div key={i}>
                        <strong>{header}:</strong> {value}
                      </div>
                    );
                  })}
                </NucleicContent>
              </DetailBox>
            )}
            <Table>
              <thead>
                <tr>
                  <Th>{t("blastn.index")}</Th>
                  <Th>{t("blastn.query")}</Th>
                  <Th>{t("blastn.subject")}</Th>
                  <Th>{t("blastn.identity")}</Th>
                  <Th>{t("blastn.bitScore")}</Th>
                  <Th>{t("blastn.evalue")}</Th>
                  <Th>{t("blastn.alignmentLength")}</Th>
                  <Th>{t("blastn.mismatches")}</Th>
                  <Th>{t("blastn.gapOpens")}</Th>
                  <Th>{t("blastn.detail")}</Th>
                </tr>
              </thead>
              <tbody>
                {blastn.length === 0 ? (
                  <Tr>
                    <Td colSpan={12} style={{ textAlign: "center" }}>{t("blastn.noData")}</Td>
                  </Tr>
                ) : (
                  blastn.map((item, idx) => (
                    <Tr key={idx}>
                      <Td>{idx + 1}</Td>
                      <Td>{item.query}</Td>
                      <Td>{item.subject}</Td>
                      <Td>{item.identity}</Td>
                      <Td>{item.bitScore}</Td>
                      <Td>{item.evalue}</Td>
                      <Td>{item.alignmentLength}</Td>
                      <Td>{item.mismatches}</Td>
                      <Td>{item.gapOpens}</Td>
                      <Td>
                        <IconButton onClick={() => toggleRow(item, idx)}>
                          {selectedRow?.index === idx ? "🙈" : "👁️"}
                        </IconButton>
                      </Td>
                    </Tr>
                  ))
                )}
              </tbody>
            </Table>
          </InfoBox>
        )}

        {activeTab === "virulence" && (
          <VirulenceCompare virulence={virulence} virulenceDataset={virulenceDataset} />
        )}

        {activeTab === "amr" && (
          <AmrCompare amr={amr} amrDataset={amrDataset} />
        )}
      </Modal>
    </Overlay>
    </>
  );
};

export default BlastnModal;
