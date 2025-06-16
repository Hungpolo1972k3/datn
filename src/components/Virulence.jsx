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
  width: auto;
  min-width: 100%;
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
      background-color: #dbeafe;
    `}
  &:hover {
    background-color: #f1f5f9;
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
  ];

  const toggleRow = (index) => {
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
          {[
            { label: t("virulenceComponent.index"), value: selectedRow + 1 },
            { label: t("virulenceComponent.sequence"), value: data[selectedRow]?.sequence },
            { label: t("virulenceComponent.gene"), value: data[selectedRow]?.gene },
            { label: t("virulenceComponent.start"), value: data[selectedRow]?.start },
            { label: t("virulenceComponent.stop"), value: data[selectedRow]?.stop },
            { label: t("virulenceComponent.strand"), value: data[selectedRow]?.strand },
            { label: t("virulenceComponent.identity"), value: data[selectedRow]?.identity },
            { label: t("virulenceComponent.coverage"), value: data[selectedRow]?.coverage },
            { label: t("virulenceComponent.accession"), value: data[selectedRow]?.accession },
            { label: t("virulenceComponent.nucleic"), value: data[selectedRow]?.nucleic },
          ].map((item, i) => (
            <div key={i}>
              <strong>{item.label}:</strong> {item.value || "N/A"}
            </div>
          ))}
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
              <TableRow
                key={index}
                selected={selectedRow === index}
                onClick={() => toggleRow(index)}
              >
                <Td>{index + 1}</Td>
                <Td>{item.sequence}</Td>
                <Td>
                  <a
                    href={`/dataset?search=${encodeURIComponent(item.gene)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#007bff",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
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
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};

export default VirulenceTable;
