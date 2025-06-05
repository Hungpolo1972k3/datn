import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const GridBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 20px;
`;

const DetailWrapper = styled.div`
  flex: 1 1 48%;
  min-width: 300px;
  max-width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const Th = styled.th`
  background-color: #f1f5f9;
  color: #1e293b;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  text-align: left;
  color: #334155;
  vertical-align: top;
`;

const Row = styled.tr`
  cursor: pointer;
  &:nth-child(even) {
    background-color: #f8fafc;
  }
  &:hover {
    background-color: #e2e8f0;
  }
  &.selected {
    background-color: #bae6fd;
  }
`;

const DetailBox = styled.div`
  border: 1px solid #cbd5e1;
  padding: 16px;
  background-color: #f1f5f9;
  color: #1e293b;
  border-radius: 6px;
`;

const DetailTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  margin-bottom: 20px;
`;

const DetailTh = styled.th`
  background-color: #bfdbfe;
  padding: 8px 14px;
  border: 1px solid #93c5fd;
  text-align: left;
  color: #1e40af;
  width: 30%;
`;

const DetailTd = styled.td`
  padding: 8px 14px;
  border: 1px solid #93c5fd;
  background-color: #eff6ff;
  color: #1e293b;
  word-break: break-word;
`;

const DetailRow = styled.tr`
  &:nth-child(even) {
    background-color: #e0f2fe;
  }
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  color: #2563eb;
  font-weight: 500;
  font-size: 0.95rem;
`;

const NoData = styled.div`
  color: #94a3b8;
  font-style: italic;
  padding: 6px 0;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 8px;
`;
const TableWrapper = styled.div`
  margin-top: 20px;
  overflow-x: auto;
`;

const MainTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
`;

const ThMain = styled.th`
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  background-color: #f1f5f9;
  text-align: left;
`;

const TdMain = styled.td`
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  color: #334155;
`;

const TrMain = styled.tr`
  cursor: pointer;
  &:nth-child(even) {
    background-color: #f8fafc;
  }
  &:hover {
    background-color: #e2e8f0;
  }
  &.selected {
    background-color: #bae6fd;
  }
`;
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  flex-wrap: wrap;
  gap: 10px;
`;

const PageControl = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 500;
`;

const PageButton = styled.button`
  background-color: #e2e8f0;
  color: #1e293b;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Select = styled.select`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  background-color: white;
`;

const SortButton = styled.button`
  margin-left: 12px;
  padding: 6px 10px;
  border-radius: 4px;
  border: none;
  font-size: 15px;
  cursor: pointer;
  font-weight: 500;
`;

const geneticCode = {
  TTT: 'Phenylalanine', TTC: 'Phenylalanine',
  TTA: 'Leucine', TTG: 'Leucine',
  CTT: 'Leucine', CTC: 'Leucine', CTA: 'Leucine', CTG: 'Leucine',
  ATT: 'Isoleucine', ATC: 'Isoleucine', ATA: 'Isoleucine',
  ATG: 'Methionine',
  GTT: 'Valine', GTC: 'Valine', GTA: 'Valine', GTG: 'Valine',
  TCT: 'Serine', TCC: 'Serine', TCA: 'Serine', TCG: 'Serine',
  AGT: 'Serine', AGC: 'Serine',
  CCT: 'Proline', CCC: 'Proline', CCA: 'Proline', CCG: 'Proline',
  ACT: 'Threonine', ACC: 'Threonine', ACA: 'Threonine', ACG: 'Threonine',
  GCT: 'Alanine', GCC: 'Alanine', GCA: 'Alanine', GCG: 'Alanine',
  TAT: 'Tyrosine', TAC: 'Tyrosine',
  TAA: 'Stop', TAG: 'Stop', TGA: 'Stop',
  CAT: 'Histidine', CAC: 'Histidine',
  CAA: 'Glutamine', CAG: 'Glutamine',
  AAT: 'Asparagine', AAC: 'Asparagine',
  AAA: 'Lysine', AAG: 'Lysine',
  GAT: 'Aspartic acid', GAC: 'Aspartic acid',
  GAA: 'Glutamic acid', GAG: 'Glutamic acid',
  TGT: 'Cysteine', TGC: 'Cysteine',
  TGG: 'Tryptophan',
  CGT: 'Arginine', CGC: 'Arginine', CGA: 'Arginine', CGG: 'Arginine',
  AGA: 'Arginine', AGG: 'Arginine',
  GGT: 'Glycine', GGC: 'Glycine', GGA: 'Glycine', GGG: 'Glycine',
};

const VirulenceCompare = ({ virulence = [], virulenceDataset = [] }) => {
  const { t } = useTranslation();
  const [selectedGene, setSelectedGene] = useState(null);
  const [showNucleic, setShowNucleic] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");

  const uploadedMap = new Map(virulence.map((v) => [v.gene, v]));
  const referenceMap = new Map(virulenceDataset.map((v) => [v.gene, v]));

  let allGenes = Array.from(new Set([...uploadedMap.keys(), ...referenceMap.keys()]));
  allGenes.sort((a, b) => sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a));

  const totalPages = Math.ceil(allGenes.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentGenes = allGenes.slice(startIdx, startIdx + itemsPerPage);

  const toggleNucleic = (gene, type) => {
    setShowNucleic((prev) => ({
      ...prev,
      [`${gene}-${type}`]: !prev[`${gene}-${type}`],
    }));
  };

  const translateNucleicToProteinFullName = (sequence = "") => {
    const codons = sequence.match(/.{1,3}/g) || [];
    const aminoAcids = codons.map((c) => geneticCode[c.toUpperCase()] || "Unknown");
    return aminoAcids.join(" - ");
  };

  const renderInfo = (info) => {
    if (!info) return <NoData>{t("virulenceCompare.noData")}</NoData>;
    return (
      <InfoBox>
        <span>✔️</span>
        <h4>
          {info.sequence} | {t("virulenceCompare.position")}: {info.start} - {info.stop} | {t("virulenceCompare.strand")}: {info.strand}
        </h4>
      </InfoBox>
    );
  };

  const selectedUploaded = selectedGene ? uploadedMap.get(selectedGene) : null;
  const selectedReference = selectedGene ? referenceMap.get(selectedGene) : null;

  const renderDetailTable = (obj, gene, type) => {
    if (!obj) return <NoData>{t("virulenceCompare.noData")}</NoData>;
    const excluded = ["vfdb_id", "function_group", "function_group_id"];
    const keys = Object.keys(obj)
      .filter((key) => !excluded.includes(key))
      .sort((a, b) => (a === "nucleic" ? 1 : b === "nucleic" ? -1 : 0));

    return (
      <DetailTable>
        <tbody>
          {keys.map((key) => (
            <DetailRow key={key}>
              <DetailTh>{key}</DetailTh>
              <DetailTd>
                {key === "nucleic" ? (
                  <>
                    <ToggleButton onClick={() => toggleNucleic(gene, type)}>
                      {showNucleic[`${gene}-${type}`] ? "🙈" : "👁️"}
                    </ToggleButton>
                    {showNucleic[`${gene}-${type}`] && (
                      <div style={{ marginTop: 6 }}>
                        <div>
                          <strong>{t("virulenceCompare.nucleic")}:</strong>
                          <div style={{ marginTop: 4, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{obj[key]}</div>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <strong>{t("virulenceCompare.protein")}:</strong>
                          <div style={{ marginTop: 4 }}>{translateNucleicToProteinFullName(obj[key])}</div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  String(obj[key])
                )}
              </DetailTd>
            </DetailRow>
          ))}
        </tbody>
      </DetailTable>
    );
  };

  const handlePageChange = (dir) => {
    if (dir === "prev" && currentPage > 1) setCurrentPage((p) => p - 1);
    if (dir === "next" && currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <div>
      <h1 style={{ marginBottom: "10px", fontSize: "40px" }}>{t("virulenceCompare.virulenceTitle")}</h1>

      {selectedGene && (
        <div>
          <h3>{t("virulenceCompare.detailFor")}: {selectedGene}</h3>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <DetailWrapper>
              <h4>{t("virulenceCompare.uploadedData")}</h4>
              {renderDetailTable(selectedUploaded, selectedGene, "uploaded")}
            </DetailWrapper>
            <DetailWrapper>
              <h4>{t("virulenceCompare.referenceData")}</h4>
              {renderDetailTable(selectedReference, selectedGene, "reference")}
            </DetailWrapper>
          </div>
        </div>
      )}

      <h3>{t("virulenceCompare.title")}</h3>

      <PaginationWrapper>
        <div>
          {t("virulenceCompare.itemsPerPage") || "Rows per page"}:
          <Select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
            {[10, 20, 50].map((size) => <option key={size} value={size}>{size}</option>)}
          </Select>
        </div>
        <SortButton onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? "🔼 A-Z" : "🔽 Z-A"}
        </SortButton>
      </PaginationWrapper>

      <TableWrapper>
        {allGenes.length === 0 ? (
          <NoData>{t("virulenceCompare.noGene")}</NoData>
        ) : (
          <MainTable>
            <thead>
              <tr>
                <ThMain>STT</ThMain>
                <ThMain>{t("virulenceCompare.gene")}</ThMain>
                <ThMain>{t("virulenceCompare.uploaded")}</ThMain>
                <ThMain>{t("virulenceCompare.reference")}</ThMain>
              </tr>
            </thead>
            <tbody>
              {currentGenes.map((gene, index) => {
                const uploaded = uploadedMap.get(gene);
                const reference = referenceMap.get(gene);
                return (
                  <TrMain
                    key={gene}
                    onClick={() => setSelectedGene(gene)}
                    className={selectedGene === gene ? "selected" : ""}
                    title={t("virulenceCompare.clickToDetail")}
                  >
                    <TdMain>{startIdx + index + 1}</TdMain>
                    <TdMain>{gene}</TdMain>
                    <TdMain>{uploaded ? renderInfo(uploaded) : t("virulenceCompare.noData")}</TdMain>
                    <TdMain>{reference ? renderInfo(reference) : t("virulenceCompare.noData")}</TdMain>
                  </TrMain>
                );
              })}
            </tbody>
          </MainTable>
        )}
      </TableWrapper>

      <PaginationWrapper>
        <PageControl>
          <PageButton onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
            ⬅️ {t("virulenceCompare.prev") || "Prev"}
          </PageButton>
          <span>
            {t("virulenceCompare.page") || "Page"} {currentPage}/{totalPages}
          </span>
          <PageButton onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>
            {t("virulenceCompare.next") || "Next"} ➡️
          </PageButton>
        </PageControl>
      </PaginationWrapper>
    </div>
  );
};

export default VirulenceCompare;