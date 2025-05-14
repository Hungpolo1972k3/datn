import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const TableWrapper = styled.div`
  overflow: auto; 
  margin-top: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  table-layout: auto; 
`;

const Thead = styled.thead`
  background-color: #e0e7ff;
`;

const Th = styled.th`
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
  white-space: nowrap;
  word-wrap: break-word; 
`;

const Tr = styled.tr`
  background-color: ${({ even }) => (even ? "#f1f5f9" : "#ffffff")};
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 6px;
  white-space: pre-wrap;
  word-break: break-word; 
`;

const JsonTable = ({ data }) => {
  const { t } = useTranslation();

  if (!Array.isArray(data) || data.length === 0) {
    return <p>{t("No structured data to display")}</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <TableWrapper>
      <StyledTable>
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <tbody>
          {data.map((row, idx) => (
            <Tr key={idx} even={idx % 2 === 1}>
              {headers.map((header) => (
                <Td key={header}>{row[header]}</Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default JsonTable;
