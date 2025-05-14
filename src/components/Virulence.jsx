import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const TableContainer = styled.div`
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: auto;
`;

const Title = styled.h3`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: auto;
  min-width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #d6d6d6;
  color: black;
  padding: 10px;
  text-align: left;
  white-space: nowrap;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  white-space: nowrap;
`;

const EyeIcon = styled.span`
  cursor: pointer;
  font-size: 18px;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
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

const VirulenceTable = ({ data }) => {
  const { t } = useTranslation();
  const [selectedRow, setSelectedRow] = useState(null);
  const titleRef = useRef(null);

  const headers = [
    t("virulenceComponent.index"),
    t("virulenceComponent.sequence"),
    t("virulenceComponent.gene"),
    t("virulenceComponent.start"),
    t("virulenceComponent.stop"),
    t("virulenceComponent.strand"),
    t("virulenceComponent.identity"),
    t("virulenceComponent.coverage"),
    t("virulenceComponent.accession"),
    t("virulenceComponent.nucleic"),
  ];

  const toggleNucleic = (index) => {
    setSelectedRow((prev) => (prev === index ? null : index));
    setTimeout(() => {
      titleRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <TableContainer>
      <Title ref={titleRef}>{t("virulenceComponent.title")}</Title>

      {selectedRow !== null && (
        <NucleicContent>
          {headers.map((header, i) => {
            const key = [
              "index",
              "sequence",
              "gene",
              "start",
              "stop",
              "strand",
              "identity",
              "coverage",
              "accession",
              "nucleic",
            ][i];

            const value =
              key === "index"
                ? selectedRow + 1
                : data[selectedRow]?.[key] || "N/A";

            return (
              <div key={i}>
                <strong>{header}:</strong> {value}
              </div>
            );
          })}
        </NucleicContent>
      )}

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{item.sequence}</Td>
                <Td>
                  <a
                    href={`/dataset?search=${encodeURIComponent(item.gene)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    {item.gene}
                  </a>
                </Td>
                <Td>{item.start}</Td>
                <Td>{item.stop}</Td>
                <Td>{item.strand}</Td>
                <Td>{item.identity}</Td>
                <Td>{item.coverage}</Td>
                <Td>{item.accession}</Td>
                <Td>
                  <EyeIcon onClick={() => toggleNucleic(index)}>
                    {selectedRow === index ? "🙈" : "👁️"}
                  </EyeIcon>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};

export default VirulenceTable;
