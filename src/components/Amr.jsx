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
  color: #007bff;
  font-size: 18px;
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

const AmrTable = ({ data = [] }) => {
  const { t } = useTranslation();
  const [selectedRow, setSelectedRow] = useState(null);
  const titleRef = useRef(null);

  const headers = [
    "Index",
    "contig_id",
    "start",
    "stop",
    "strand",
    "gene_symbol",
    "element_name",
    "nucleic",
  ];

  const toggleNucleic = (index) => {
    setSelectedRow((prev) => (prev === index ? null : index));

    setTimeout(() => {
      titleRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <TableContainer>
      <Title ref={titleRef}>{t("amrComponent.title")}</Title>

      {selectedRow !== null && (
        <NucleicContent>
          {headers.map((header, i) => {
            const key = headers[i] === "Index" ? null : headers[i];
            const value =
              headers[i] === "Index"
                ? selectedRow + 1
                : data[selectedRow]?.[key] || t("amrComponent.notAvailable");

            return (
              <div key={i}>
                <strong>{t(`amrComponent.columns.${headers[i]}`)}:</strong> {value}
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
                <Th key={index}>{t(`amrComponent.columns.${header}`)}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <Td>{rowIndex + 1}</Td>
                {headers.slice(1).map((key, cellIndex) => (
                  <Td key={cellIndex}>
                    {key === "nucleic" ? (
                      <EyeIcon onClick={() => toggleNucleic(rowIndex)}>
                        {selectedRow === rowIndex ? "🙈" : "👁️"}
                      </EyeIcon>
                    ) : (
                      row[key] || t("amrComponent.notAvailable")
                    )}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};

export default AmrTable;
