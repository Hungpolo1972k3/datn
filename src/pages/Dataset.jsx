import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Search, Download} from "lucide-react";
import DatasetPopup from "../components/DatasetPopup";
import { apiDownloadFolder, apiGetFolderInfo } from "../service/blastn";
import datasetFolder from '../utils/datasetFolder.json';
import LoadingSpinner from "../components/LoadingSpinner";
import { useNotice } from "../context/NoticeContext";

const TableWrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1e3a8a;
  text-align: center
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f0f0f0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #e0f7fa; /* Xanh nhạt */
  }

  &:nth-child(odd) {
    background-color: white;
  }

`;

const TableHeaderCell = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 20px
`;

const TableCell = styled.td`
  padding: 15px;
  border: 1px solid #ddd;
  cursor: pointer;
  text-align: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px 15px;
  border: 1px solid #ccc;
  background-color: ${({ active }) => (active ? "#007bff" : "white")};
  color: ${({ active }) => (active ? "white" : "black")};
  cursor: pointer;

  &:disabled {
    background-color: #fafafa;
    cursor: not-allowed;
  }
`;
const Tool = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 30px 0px;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
`;
const SearchInput = styled.input`
  padding: 12px 16px 12px 40px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  transition: 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }
`;
const ItemPerPageSelector = styled.select`
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 16px;
  max-width: 200px;
  background-color: white;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #007bff;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }
`;

const ToolRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 12px rgba(0, 86, 179, 0.3);
  }

  span {
    white-space: nowrap;
  }
`;
const PaginatedTable = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [itemPerPage, setItemPerPage] = useState(50);
  const [selectedGenome, setSelectedGenome] = useState(null);
  const [dataset, setDataset] = useState();
  const [isDownloading, setIsDownloading] = useState(false);
  const { showNotice } = useNotice();

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredData = datasetFolder.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    return sortOrder === "asc" ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
  });
  const itemsPerPage =
    itemPerPage === "all" ? sortedData.length : parseInt(itemPerPage) || 50;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const buttons = [];

    buttons.push(
      <PageButton
        key="prev"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {t("datasetAB.pagination.previous")}
      </PageButton>
    );

    buttons.push(
      <PageButton
        key={1}
        onClick={() => handlePageClick(1)}
        active={currentPage === 1}
      >
        1
      </PageButton>
    );

    if (currentPage > 3) {
      buttons.push(<PageButton disabled={true}>...</PageButton>);
    }

    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PageButton
          key={i}
          onClick={() => handlePageClick(i)}
          active={currentPage === i}
        >
          {i}
        </PageButton>
      );
    }

    if (currentPage < totalPages - 3) {
      buttons.push(<PageButton disabled={true}>...</PageButton>);
    }

    if (totalPages > 1) {
      buttons.push(
        <PageButton
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          active={currentPage === totalPages}
        >
          {totalPages}
        </PageButton>
      );
    }

    buttons.push(
      <PageButton
        key="next"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {t("datasetAB.pagination.next")}
      </PageButton>
    );

    return buttons;
  };
  useEffect(() => {
    if (selectedGenome) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedGenome]);
  const handleShowDatasetPopup = async(item) => {
    try {
      let data = await apiGetFolderInfo(item.downloadUrl);
      setSelectedGenome(data);
      setDataset(item);
    } catch (error) {
      console.log(error)
    }
  }

  const handleDownloadFolder = async (e,url) => {
    e.preventDefault();
    try {
      setIsDownloading(true);
      await apiDownloadFolder(url);
      showNotice(1, t('datasetAB.downloadSuccess'));
    } catch (error) {
      console.error("Download failed:", error);
      showNotice(0, t('datasetAB.downloadFail'))
    }
    finally {
      setIsDownloading(false);
    }
  }
  return (
    <TableWrapper>
      <Title>{t("datasetAB.title")}</Title>
      <Tool>
        <SearchWrapper>
          <SearchIcon size={20} />
          <SearchInput
            placeholder={t("datasetAB.filterPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>
        <ItemPerPageSelector
          value={itemPerPage}
          onChange={(e) => setItemPerPage(e.target.value)}
        >
          <option value="50">{t("datasetAB.default")} (50)</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="all">{t("datasetAB.all")}</option>
        </ItemPerPageSelector>
        <ToolRight
          onClick={(e) => handleDownloadFolder(e, '/')}
          title={t("datasetAB.downloadAll")}
        >
          <Download size={20} />
          <span>{t("datasetAB.downloadAll")}</span>
        </ToolRight>
      </Tool>
      <StyledTable>
      <TableHead>
        <TableRow>
          <TableHeaderCell>{t("datasetAB.index")}</TableHeaderCell>
          <TableHeaderCell onClick={() => handleSort("name")}>
            {t("datasetAB.column.id")}
          </TableHeaderCell>
          <TableHeaderCell>{t("datasetAB.column.name")}</TableHeaderCell>
          <TableHeaderCell>{t("datasetAB.column.description")}</TableHeaderCell>
          <TableHeaderCell>{t("datasetAB.download")}</TableHeaderCell>
        </TableRow>
      </TableHead>
      <tbody>
        {paginatedData.map((item, index) => (
          <TableRow key={item.name} onClick={() => handleShowDatasetPopup(item)}>
            <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
            <TableCell>
              <a href={item.ncbiUrl} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </TableCell>
            <TableCell>{item.bacteria}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell
              onClick={(e) => handleDownloadFolder(e,item.downloadUrl)}
              style={{ textAlign: "center", cursor: "pointer" }}
            >
              <Download size={18} />
            </TableCell>
          </TableRow>
        ))}
      </tbody>
      </StyledTable>

      <Pagination>{renderPageNumbers()}</Pagination>
      {selectedGenome && (
        <DatasetPopup
          dataset={dataset}
          genome={selectedGenome}
          onClose={() => setSelectedGenome(null)}
        />
      )}
      {isDownloading && <LoadingSpinner />}
    </TableWrapper>
  );
};

export default PaginatedTable;