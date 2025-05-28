import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import datasetFolder from "../utils/datasetFolder.json";
import { apiRunBlastnTwoFiles, apiGetFileInfo } from "../service/blastn";
import LoadingSpinner from "./LoadingSpinner";
import BlastnModal from "./Blastn";

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
  color: #1e293b;
`;

const Tr = styled.tr`
  transition: background-color 0.25s ease;
  cursor: default;

  &:hover {
    background-color: #dbeafe;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const PageControls = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  background-color: ${(props) => (props.active === "true" ? "#1e40af" : "#2563eb")};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }

  &:hover:not(:disabled):not([active="true"]) {
    background-color: #1e40af;
  }
`;

const Select = styled.select`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.95rem;
  border: 1px solid #cbd5e1;
  background-color: white;
  color: #1e293b;
`;

const formatDateVN = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
};

const ResultTable = ({ results, blastnInfo }) => {
  const { t } = useTranslation();
  const findInfoByName = (name) => datasetFolder.find(item => item.name === name);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [blastnData, setBlastnData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bacteriaInfo, setBacteriaInfo] = useState();
  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage, results]);

  const totalPages =
    rowsPerPage === "all" ? 1 : Math.ceil(results.length / rowsPerPage);
  const paginatedResults =
    rowsPerPage === "all"
      ? results
      : results.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        );

  const handleRowsChange = (e) => {
    const value = e.target.value;
    setRowsPerPage(value === "all" ? "all" : parseInt(value));
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const [modalInfo, setModalInfo] = useState(null);

  const handleViewDetails = async (url, name, info, bacteria) => {
    let url2 = `/app/FastA/${name}/Spades_output/contigs.fasta`;
    setIsLoading(true);
    try {
      const result = await apiRunBlastnTwoFiles(url, url2);
      setIsLoading(false);
      setBlastnData(result.data);
      setModalInfo(info);  
      setShowModal(true);
      setBacteriaInfo(bacteria);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {blastnInfo && Object.keys(blastnInfo).length > 0 && (
        <div
          style={{
            marginBottom: "12px",
            color: "#1e293b",
            fontSize: "0.95rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div><strong>{t("resultPage.filename")}:</strong> {blastnInfo.filename}</div>
            <div><strong>{t("resultPage.createdAt")}:</strong> {formatDateVN(blastnInfo.createdAt)}</div>
          </div>
        </div>
      )}
      <Table>
        <thead>
          <tr>
            <Th>{t("resultPage.tableHeaders.index")}</Th>
            <Th>{t("resultPage.tableHeaders.name")}</Th>
            <Th>{t("resultPage.tableHeaders.bacteria")}</Th>
            <Th>{t("resultPage.tableHeaders.avgIdentity")}</Th>
            <Th>{t("resultPage.tableHeaders.bitScore")}</Th>
            <Th>{t("resultPage.tableHeaders.alignmentLength")}</Th>
            <Th>{t("resultPage.tableHeaders.mismatches")}</Th>
            <Th>{t("resultPage.tableHeaders.gapOpens")}</Th>
            <Th>{t("resultPage.tableHeaders.coverage")}</Th>
            <Th>{t("resultPage.tableHeaders.detail")}</Th>
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
            paginatedResults.map((r, idx) => {
              const info = findInfoByName(r.name);
              const bacteria = info?.bacteria || "-";
              const ncbiUrl = info?.ncbiUrl;

              return (
                <Tr key={idx}>
                  <Td>{(currentPage - 1) * (rowsPerPage === "all" ? results.length : rowsPerPage) + idx + 1}</Td>
                  <Td>{r.name}</Td>
                  <Td>
                    {ncbiUrl ? (
                      <a
                        href={ncbiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
                  <Td>
                    <span
                      style={{ cursor: "pointer", fontSize: "1.8rem", userSelect: "none" }}
                      onClick={() => handleViewDetails(blastnInfo.url, r.name, r, bacteria)}
                      title={t("resultPage.viewDetails")}
                    >
                      👁️
                    </span>
                  </Td>
                </Tr>
              );
            })
          )}
        </tbody>
      </Table>
      {isLoading && (
        <div style={{ marginTop: "200px" }}>
          <LoadingSpinner />
        </div>
      )}
      {showModal && (
        <BlastnModal
          blastn={blastnData}
          onClose={() => setShowModal(false)}
          info={modalInfo}
          bacteria={bacteriaInfo}
        />
      )}
      {results.length > 0 && (
        <PaginationWrapper>
          <div>
            {t("resultPage.rowsPerPage")}:{" "}
            <Select value={rowsPerPage} onChange={handleRowsChange}>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="all">{t("resultPage.all")}</option>
            </Select>
          </div>
          
          {rowsPerPage !== "all" && (
            <PageControls>
              <PageButton onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                {t("resultPage.prev")}
              </PageButton>
              {[...Array(totalPages)].map((_, index) => (
                <PageButton
                  key={index}
                  onClick={() => goToPage(index + 1)}
                  active={(currentPage === index + 1).toString()}
                >
                  {index + 1}
                </PageButton>
              ))}
              <PageButton onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                {t("resultPage.next")}
              </PageButton>
            </PageControls>
          )}
        </PaginationWrapper>
      )}
    </>
  );
};

export default ResultTable;
