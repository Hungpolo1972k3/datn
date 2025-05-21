import styled from "styled-components";
import { useTranslation } from "react-i18next";
import datasetFolder from '../utils/datasetFolder.json';

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
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
  color: #1e293b; /* xám đen */
  
  &:last-child {
    border-right: none;
  }
`;

const Tr = styled.tr`
  transition: background-color 0.25s ease;
  cursor: default;

  &:hover {
    background-color: #dbeafe;
  }
`;


const ResultTable = ({ results }) => {
  const { t } = useTranslation();
  const findInfoByName = (name) => {
    return datasetFolder.find(item => item.name === name);
  };

  return (
    <Table>
      <thead>
        <tr>
          <Th>{t("resultPage.tableHeaders.name")}</Th>
          <Th>{t("resultPage.tableHeaders.bacteria")}</Th>
          <Th>{t("resultPage.tableHeaders.avgIdentity")}</Th>
          <Th>{t("resultPage.tableHeaders.bitScore")}</Th>
          <Th>{t("resultPage.tableHeaders.alignmentLength")}</Th>
          <Th>{t("resultPage.tableHeaders.mismatches")}</Th>
          <Th>{t("resultPage.tableHeaders.gapOpens")}</Th>
          <Th>{t("resultPage.tableHeaders.coverage")}</Th>
        </tr>
      </thead>
      <tbody>
        {results.length === 0 ? (
          <tr>
            <Td colSpan={9} style={{ textAlign: "center" }}>
              {t("resultPage.noData")}
            </Td>
          </tr>
        ) : (
          results.map((r, idx) => {
            const info = findInfoByName(r.name);
            const bacteria = info?.bacteria || "-";
            const ncbiUrl = info?.ncbiUrl;

            return (
              <tr key={idx}>
                <Td>{r.name}</Td>
                <Td>
                  {ncbiUrl ? (
                    <a href={ncbiUrl} target="_blank" rel="noopener noreferrer">
                      {bacteria}
                    </a>
                  ) : (
                    bacteria
                  )}
                </Td>
                <Td>{r.result.avgIdentity}</Td>
                <Td>{r.result.avgBitScore}</Td>
                <Td>{r.result.avgAlignmentLength}</Td>
                <Td>{r.result.avgMismatch}</Td>
                <Td>{r.result.avgGapOpens}</Td>
                <Td>{r.result.avgCoverage}</Td>
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
};

export default ResultTable;
