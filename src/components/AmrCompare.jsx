import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// Styled Components
const GridBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 20px;
`;

const DetailWrapper = styled.div`
  flex: 1 1 48%;
  min-width: 300px;
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
  border-radius: 6px;
`;

const DetailTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
`;

const DetailTh = styled.th`
  background-color: #bfdbfe;
  padding: 8px 14px;
  border: 1px solid #93c5fd;
  color: #1e40af;
  width: 30%;
  text-align: left;
`;

const DetailTd = styled.td`
  padding: 8px 14px;
  border: 1px solid #93c5fd;
  background-color: #eff6ff;
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
  font-size: 1.3rem;
  margin-left: 8px;
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0 16px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
`;

const SortButton = styled(Button)`
  background-color: #fffff;
  color: #1f2937;
  font-size: 15px;
`;

const Select = styled.select`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  background-color: #fff;
  font-size: 1rem;
`;

const geneticCode = {
  TTT: 'Phenylalanine', TTC: 'Phenylalanine',
  TTA: 'Leucine', TTG: 'Leucine', CTT: 'Leucine', CTC: 'Leucine', CTA: 'Leucine', CTG: 'Leucine',
  ATT: 'Isoleucine', ATC: 'Isoleucine', ATA: 'Isoleucine', ATG: 'Methionine',
  GTT: 'Valine', GTC: 'Valine', GTA: 'Valine', GTG: 'Valine',
  TCT: 'Serine', TCC: 'Serine', TCA: 'Serine', TCG: 'Serine', AGT: 'Serine', AGC: 'Serine',
  CCT: 'Proline', CCC: 'Proline', CCA: 'Proline', CCG: 'Proline',
  ACT: 'Threonine', ACC: 'Threonine', ACA: 'Threonine', ACG: 'Threonine',
  GCT: 'Alanine', GCC: 'Alanine', GCA: 'Alanine', GCG: 'Alanine',
  TAT: 'Tyrosine', TAC: 'Tyrosine', TAA: 'Stop', TAG: 'Stop', TGA: 'Stop',
  CAT: 'Histidine', CAC: 'Histidine', CAA: 'Glutamine', CAG: 'Glutamine',
  AAT: 'Asparagine', AAC: 'Asparagine', AAA: 'Lysine', AAG: 'Lysine',
  GAT: 'Aspartic acid', GAC: 'Aspartic acid', GAA: 'Glutamic acid', GAG: 'Glutamic acid',
  TGT: 'Cysteine', TGC: 'Cysteine', TGG: 'Tryptophan',
  CGT: 'Arginine', CGC: 'Arginine', CGA: 'Arginine', CGG: 'Arginine', AGA: 'Arginine', AGG: 'Arginine',
  GGT: 'Glycine', GGC: 'Glycine', GGA: 'Glycine', GGG: 'Glycine',
};

const AmrCompare = ({ amr = [], amrDataset = [] }) => {
  const { t } = useTranslation();
  const [selectedGene, setSelectedGene] = useState(null);
  const [showNucleic, setShowNucleic] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");

  const uploadedMap = new Map(amr.map((g) => [g.gene_symbol, g]));
  const referenceMap = new Map(amrDataset.map((g) => [g.gene_symbol, g]));

  const sortedGenes = Array.from(new Set([...uploadedMap.keys(), ...referenceMap.keys()]))
    .sort((a, b) => (sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a)));

  const matchedCount = sortedGenes.filter((gene) => uploadedMap.has(gene) && referenceMap.has(gene)).length;
  const unmatchedCount = sortedGenes.length - matchedCount;

  const totalPages = Math.ceil(sortedGenes.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentGenes = sortedGenes.slice(indexOfFirst, indexOfLast);

  const toggleNucleic = (gene, type) => {
    setShowNucleic((prev) => ({
      ...prev,
      [`${gene}-${type}`]: !prev[`${gene}-${type}`],
    }));
  };

  const translateNucleicToProteinFullName = (sequence = "") => {
    const codons = sequence.match(/.{1,3}/g) || [];
    return codons.map((c) => geneticCode[c.toUpperCase()] || "Unknown").join(" - ");
  };

  const renderInfo = (info) => {
    if (!info) return <NoData>{t("amrCompare.noData")}</NoData>;
    return (
      <InfoBox>
        <span>✔️</span>
        <h4>{info.contig_id} | {t("amrCompare.position")}: {info.start} - {info.stop}</h4>
      </InfoBox>
    );
  };

  const renderDetailTable = (obj, gene, type) => {
    if (!obj) return <NoData>{t("amrCompare.noData")}</NoData>;
    const excluded = ["protein_identifier", "reference_length", "alignment_length"];
    const keys = Object.keys(obj).filter((key) => !excluded.includes(key));
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
                        <strong>{t("amrCompare.nucleic")}:</strong>
                        <div style={{ marginTop: 4 }}>{obj[key]}</div>
                        <strong style={{ marginTop: 8, display: "block" }}>{t("amrCompare.protein")}:</strong>
                        <div style={{ marginTop: 4 }}>{translateNucleicToProteinFullName(obj[key])}</div>
                      </div>
                    )}
                  </>
                ) : String(obj[key])}
              </DetailTd>
            </DetailRow>
          ))}
        </tbody>
      </DetailTable>
    );
  };

  const selectedUploaded = selectedGene ? uploadedMap.get(selectedGene) : null;
  const selectedReference = selectedGene ? referenceMap.get(selectedGene) : null;

  return (
    <div>
      <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>{t("amrCompare.amrTitle")}</h1>

      {selectedGene && (
        <DetailBox>
          <h2>{t("amrCompare.detailsForGene")}: <em>{selectedGene}</em></h2>
          <GridBox>
            <DetailWrapper>
              <strong>{t("amrCompare.inFileUpload")}:</strong>
              {renderDetailTable(selectedUploaded, selectedGene, "upload")}
            </DetailWrapper>
            <DetailWrapper>
              <strong>{t("amrCompare.inReferenceDataset")}:</strong>
              {renderDetailTable(selectedReference, selectedGene, "reference")}
            </DetailWrapper>
          </GridBox>
        </DetailBox>
      )}

      <h2 style={{ marginBottom: '10px' }}>{t("amrCompare.title")}</h2>

      <InfoBox style={{ marginBottom: "20px", fontSize: "1rem", gap: "16px" }}>
        <span>💊 {t("amrCompare.amrCompare")} <strong>{matchedCount}</strong> / {sortedGenes.length}</span>
        <span>❌ {t("amrCompare.amrNoCompare")} <strong>{unmatchedCount}</strong> / {sortedGenes.length}</span>
      </InfoBox>
      <ControlsWrapper>
        <SortButton onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? "🔼 A-Z" : "🔽 Z-A"}
        </SortButton>

        <div>
          {t("amrCompare.itemsPerPage")}:&nbsp;
          <Select value={itemsPerPage} onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}>
            {[10, 20, 50].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </Select>
        </div>
      </ControlsWrapper>

      <Table>
        <thead>
          <tr>
            <Th>No.</Th>
            <Th>{t("amrCompare.gene")}</Th>
            <Th>{t("amrCompare.inFileUpload")}</Th>
            <Th>{t("amrCompare.inReference")}</Th>
          </tr>
        </thead>
        <tbody>
          {currentGenes.map((gene, index) => (
            <Row
              key={gene}
              className={selectedGene === gene ? "selected" : ""}
              onClick={() => setSelectedGene(gene)}
            >
              <Td>{indexOfFirst + index + 1}</Td>
              <Td>{gene}</Td>
              <Td>{renderInfo(uploadedMap.get(gene))}</Td>
              <Td>{renderInfo(referenceMap.get(gene))}</Td>
            </Row>
          ))}
        </tbody>
      </Table>

      <PaginationWrapper>
        <Button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          ◀️ {t("amrCompare.prev")}
        </Button>
        <span>{t("amrCompare.page")} {currentPage}/{totalPages}</span>
        <Button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
          {t("amrCompare.next")} ▶️
        </Button>
      </PaginationWrapper>
    </div>
  );
};

export default AmrCompare;
