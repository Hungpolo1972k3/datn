import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
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
  color: #1e3a8a;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #007bff;
  color: #ffffff;
  padding: 10px;
  text-align: left;
  white-space: nowrap;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  white-space: nowrap;
`;

const TableRow = styled.tr`
  cursor: pointer;
  ${(props) =>
    props.selected &&
    css`
      background-color: #dbeafe; /* Màu nền khi được chọn */
    `}

  &:hover {
    background-color: #f1f5f9; /* Màu hover */
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
    "accession",
    "gene_symbol",
    "length",   
    "start",
    "stop",
    "strand",
    "class",
    "subclass",
    "reference_length",
    "coverage",
    "identity",
    "method",
    "scope",
    "element_name",
  ];

  const toggleRow = (index) => {
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
          {["Index", ...headers.slice(1), "nucleic"].map((header, i) => {
            const value =
              header === "Index"
                ? selectedRow + 1
                : data[selectedRow]?.[header] || t("amrComponent.notAvailable");

            return (
              <div key={i}>
                <strong>{t(`amrComponent.columns.${header}`)}:</strong> {value}
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
              <TableRow
                key={rowIndex}
                selected={selectedRow === rowIndex}
                onClick={() => toggleRow(rowIndex)}
              >
                {headers.map((key, cellIndex) => (
                  <Td key={cellIndex}>
                    {key === "Index"
                      ? rowIndex + 1
                      : key === "accession"
                      ? (
                          <a
                            href={`https://www.ncbi.nlm.nih.gov/search/all/?term=${row[key]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#2563eb", textDecoration: "underline" }}
                          >
                            {row[key]}
                          </a>
                        )
                      : row[key] || t("amrComponent.notAvailable")}
                  </Td>
                ))}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};

export default AmrTable;
