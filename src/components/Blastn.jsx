import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  height: 90%;
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
const BlastnModal = ({ blastn, onClose, info, bacteria }) => {
  const { t } = useTranslation();
  const modalRef = useRef();
  if (!Array.isArray(blastn)) return null;
  const [selectedRow, setSelectedRow] = useState(null);
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
    <Overlay>
      <Modal ref={modalRef}>
        <CloseButton onClick={onClose} aria-label="Close">×</CloseButton>
        {info && (
          <InfoBox>
            <InfoHeader>
                <GeneName>{info.name}</GeneName>
                <BacteriaName>{bacteria}</BacteriaName>
            </InfoHeader>
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
          </InfoBox>
        )}
        {selectedRow && (
          <DetailBox>
            <NucleicContent>
              {headers.map((header, i) => {
                const key = keys[i];
                let value;

                if (key === "index") {
                  value = selectedRow.index + 1;
                } else {
                  value = selectedRow.data[key] ?? "N/A";
                }

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
      </Modal>
    </Overlay>
  );
};

export default BlastnModal;
