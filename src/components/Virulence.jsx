import React, { useState } from "react";
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

const VirulenceTable = ({ data }) => {
  const { t } = useTranslation();
  const [visibleRows, setVisibleRows] = useState({});

  const toggleNucleic = (index) => {
    setVisibleRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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

  return (
    <TableContainer>
      <Title>{t("virulenceComponent.title")}</Title>
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
                <Td>{item.gene}</Td>
                <Td>{item.start}</Td>
                <Td>{item.stop}</Td>
                <Td>{item.strand}</Td>
                <Td>{item.identity}</Td>
                <Td>{item.coverage}</Td>
                <Td>{item.accession}</Td>
                <Td>
                  <EyeIcon onClick={() => toggleNucleic(index)}>
                    {visibleRows[index] ? "🙈" : "👁️"}
                  </EyeIcon>
                  {visibleRows[index] && (
                    <div style={{ marginTop: "8px", wordBreak: "break-word", maxWidth: "400px" }}>
                      {item.nucleic || "N/A"}
                    </div>
                  )}
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
