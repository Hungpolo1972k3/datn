import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.1);
  background: #ffffff;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  table-layout: auto;
  color: #1e3a8a;
`;

const Thead = styled.thead`
  background-color: #1e3a8a;
  color: white;
`;

const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #dbeafe;
  white-space: nowrap;
`;

const Tr = styled.tr`
  background-color: ${({ selected, even }) =>
    selected ? "#dbeafe" : "#ffffff"};

  &:hover {
    background-color: #e0ecff;
  }

  transition: background-color 0.2s ease;
`;

const Td = styled.td`
  padding: 10px 14px;
  border-bottom: 1px solid #e2e8f0;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ExpandedJsonBox = styled.div`
  margin-bottom: 16px;
  word-break: break-word;
  max-width: 100%;
  background-color: #f9f9f9;
  padding: 10px;
  border-left: 4px solid #007bff;
  transition: all 0.3s ease;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #1e3a8a;
  white-space: pre-wrap;
`;

const JsonTable = ({ data }) => {
  const { t } = useTranslation();
  const [expandedRow, setExpandedRow] = useState(null);
  const expandedRef = useRef(null);

  if (!Array.isArray(data) || data.length === 0) {
    return <p style={{ color: "#1e3a8a", fontWeight: 600 }}>{t("breadcrumb.viewFile")}</p>;
  }

  useEffect(() => {
    if (expandedRef.current) {
      expandedRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [expandedRow]);

  const handleRowClick = (index) => {
    setExpandedRow(prev => prev === index ? null : index);
  };

  const excludedHeaders = [
    "#FILE",
    "HMM accession",
    "HMM description",
    "Type",
    "Subtype",
    "COVERAGE_MAP",
    "GAPS",
    "RESISTANCE",
    "Protein id",
    "Reference sequence length"
  ];

  const allHeaders = Object.keys(data[0]);
  const headers = allHeaders.filter((header) => !excludedHeaders.includes(header));

  return (
    <>
      {expandedRow !== null && (
        <ExpandedJsonBox ref={expandedRef}>
          <h1>{t('virulenceCompare.detailFor')}</h1>
          <br />
            {Object.entries(data[expandedRow]).map(([key, value]) => (
              <div key={key}><strong>{key}</strong>: {String(value)}</div>
            ))}
        </ExpandedJsonBox>
      )}

      <TableWrapper>
        <StyledTable>
          <Thead>
            <tr>
              <Th>{t('experimentInfoComponent.index')}</Th>
              {headers.map((header) => (
                <Th key={header}>{header}</Th>
              ))}
            </tr>
          </Thead>
          <tbody>
            {data.map((row, idx) => (
              <React.Fragment key={idx}>
                <Tr
                  selected={expandedRow === idx}
                  onClick={() => handleRowClick(idx)}
                  style={{ cursor: "pointer" }}
                >
                  <Td>{idx + 1}</Td>
                  {headers.map((header) => (
                    <Td key={header}>{row[header]}</Td>
                  ))}
                </Tr>
              </React.Fragment>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </>
  );
};

export default JsonTable;
