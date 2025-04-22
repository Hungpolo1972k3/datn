import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, Download, X, Link } from "lucide-react";
import FileViewer from "../components/FileViewer";
const TableWrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f0f0f0;
`;

const TableRow = styled.tr``;

const TableHeaderCell = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
  cursor: pointer;
`;

const TableCell = styled.td`
  padding: 15px;
  border: 1px solid #ddd;
  cursor: pointer;
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
  width: 100%;
`;
const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 60%;
`;
const ItemPerPageSelector = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  max-width: 200px;
`;

const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: white;
  z-index: 1000;
  padding: 24px;
  overflow: auto;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const SectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;
const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;
const generateData = () => {
  const genomes = Array.from({ length: 850 }, (item, i) => ({
    index: i + 1,
    genomeId: `GID${i + 1}`,
    name: `Genome ${i + 1}`,
    sraLink: `https://sra-link.com/data/${i + 1}`,
    amr: `gene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistancegene,resistance
blaTEM,ampicillin
mecA,methicillin
blaNDM-1,carbapenems,
mecA,methicillin,
mecA,methicillin,
mecA,methicillin,
mecA,methicillin,
mecA,methicillin,
mecA,methicillin`,
    virulence: `gene,effect
hlyA,hemolysis
stx,shiga-toxin`,
    resistance: `antibiotic,result
penicillin,Resistant
tetracycline,Susceptible`,
  }));
  return genomes;
};

const PaginatedTable = () => {
  const { t } = useTranslation();
  const data = generateData();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [itemPerPage, setItemPerPage] = useState(50);

  const [selectedGenome, setSelectedGenome] = useState(null);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredData = data.filter((item) =>
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
  const GenomePopup = ({ genome, onClose }) => {
    const [visibleSections, setVisibleSections] = useState({
      amr: false,
      virulence: false,
      resistance: false,
    });

    const toggleSection = (key) => {
      setVisibleSections({ ...visibleSections, [key]: !visibleSections[key] });
    };

    return (
      <PopupOverlay>
        <PopupHeader>
          <CloseButton onClick={onClose}>
            <X />
          </CloseButton>
        </PopupHeader>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {genome.name} - {genome.genomeId}
        </h2>

        <div>
          <SectionRow>
            <span>contig.fasta</span>
            <CloseButton>
              <Download />
            </CloseButton>
          </SectionRow>

          <SectionRow>
            <span>AMR Genes</span>
            <ActionButtons>
              <CloseButton onClick={() => toggleSection("amr")}>
                {visibleSections.amr ? <EyeOff /> : <Eye />}
              </CloseButton>
              <CloseButton>
                <Download />
              </CloseButton>
            </ActionButtons>
          </SectionRow>

          <SectionRow>
            <span>Virulences</span>
            <ActionButtons>
              <CloseButton onClick={() => toggleSection("virulence")}>
                {visibleSections.virulence ? <EyeOff /> : <Eye />}
              </CloseButton>
              <CloseButton>
                <Download />
              </CloseButton>
            </ActionButtons>
          </SectionRow>

          <SectionRow>
            <span>Kháng sinh (CSV)</span>
            <ActionButtons>
              <CloseButton onClick={() => toggleSection("resistance")}>
                {visibleSections.resistance ? <EyeOff /> : <Eye />}
              </CloseButton>
              <CloseButton>
                <Download />
              </CloseButton>
            </ActionButtons>
          </SectionRow>

          <div style={{ marginTop: "24px" }}>
            {visibleSections.amr && <FileViewer content={genome.amr} />}
            {visibleSections.virulence && (
              <FileViewer content={genome.virulence} />
            )}
            {visibleSections.resistance && (
              <FileViewer content={genome.resistance} />
            )}
          </div>
        </div>
      </PopupOverlay>
    );
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
  return (
    <TableWrapper>
      <Title>{t("datasetAB.title")}</Title>
      <Tool>
        <SearchInput
          placeholder={t("datasetAB.filterPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
      </Tool>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableHeaderCell onClick={() => handleSort("index")}>
              Index
            </TableHeaderCell>
            <TableHeaderCell onClick={() => handleSort("genome_id")}>
              GenomeId
            </TableHeaderCell>
            <TableHeaderCell onClick={() => handleSort("name")}>
              {t("datasetAB.column.name")}
            </TableHeaderCell>
            <TableHeaderCell>SRA LINK</TableHeaderCell>
          </TableRow>
        </TableHead>
        <tbody>
          {paginatedData.map((item) => (
            <TableRow key={item.id} onClick={() => setSelectedGenome(item)}>
              <TableCell>{item.index}</TableCell>
              <TableCell>{item.genomeId}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <a
                  href={item.sraLink}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    justifyContent: "center",
                  }}
                >
                  <Link size={16} />
                  SRA
                </a>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>

      <Pagination>{renderPageNumbers()}</Pagination>
      {selectedGenome && (
        <GenomePopup
          genome={selectedGenome}
          onClose={() => setSelectedGenome(null)}
        />
      )}
    </TableWrapper>
  );
};

export default PaginatedTable;
