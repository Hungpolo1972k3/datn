import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const ListContainer = styled.div`
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const Title = styled.h3`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const TotalText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: #666;
`;

const RecordGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
`;

const RecordField = styled.div`
  font-size: 16px;
  word-break: break-word;
`;

const FullWidthField = styled.div`
  grid-column: span 2;
  font-size: 16px;
  margin-top: 10px;
`;

const EyeIcon = styled.span`
  cursor: pointer;
  font-size: 18px;
  color: #007bff;
  margin-left: 8px;
  &:hover {
    text-decoration: underline;
  }
`;

const RecordContainer = styled.div`
  width: 100%;
  background: #f9f9f9;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const NucleicContainer = styled.div`
  margin-top: 8px;
  word-break: break-word;
  width: 100%;
  font-family: monospace;
  background: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
`;

const DownloadButton = styled.button`
  margin-top: 12px;
  padding: 6px 12px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const VirulenceListResult = ({ label, data }) => {
  const { t } = useTranslation();
  const [visibleRows, setVisibleRows] = useState({});

  const groups = {
    [t("virulenceList.groups.nucleoid")]: ["Quorum sensing", "BfmRS"], 
    [t("virulenceList.groups.ribosomes")]: [],
    [t("virulenceList.groups.cytoplasm")]: ["HemO cluster", "AdeFGH efflux pump"], 
    [t("virulenceList.groups.plasmid")]: ["T2SS", "TFP"],
    [t("virulenceList.groups.pili")]: ["Csu fimbriae", "TFP"],
    [t("virulenceList.groups.inclusion")]: [], 
    [t("virulenceList.groups.flagellum")]: [], 
    [t("virulenceList.groups.cytoplasmicMembrane")]: ["AdeFGH efflux pump", "Phospholipase D", "Phospholipase C", "OmpA"], 
    [t("virulenceList.groups.cellWall")]: ["OmpA", "PNAG"], 
    [t("virulenceList.groups.capsule")]: ["Capsule", "Bap", "PNAG", "Acinetobactin", "LPS"]
  };

  const group = groups[label] || [];
  const filterdata = group.flatMap((item) =>
    data.filter((dataItem) => dataItem.group === item)
  );

  const toggleNucleic = (index) => {
    setVisibleRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const downloadCSV = (item, index) => {
    const protein = translateDNAtoProtein(item.nucleic);
  
    const fields = [
      [t("virulenceList.fields.index"), index + 1],
      [t("virulenceList.fields.sequence"), item.sequence],
      [t("virulenceList.fields.gene"), item.gene],
      [t("virulenceList.fields.start"), item.start],
      [t("virulenceList.fields.stop"), item.stop],
      [t("virulenceList.fields.strand"), item.strand],
      [t("virulenceList.fields.identity"), item.identity],
      [t("virulenceList.fields.coverage"), item.coverage],
      [t("virulenceList.fields.accession"), item.accession],
      [t("virulenceList.fields.description"), item.description || "N/A"],
      [t("virulenceList.fields.group"), item.group || "N/A"],
      [t("virulenceList.fields.vfdb_id"), item.vfdb_id || "N/A"],
      [t("virulenceList.fields.function_group"), item.function_group || "N/A"],
      [t("virulenceList.fields.function_group_id"), item.function_group_id || "N/A"],
      [t("virulenceList.fields.nucleic"), item.nucleic || "N/A"],
      [t("virulenceList.fields.protein"), protein || "N/A"],
    ];
  
    const csvContent =
      "data:text/csv;charset=utf-8," +
      fields.map(([k, v]) => `"${k}","${v}"`).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `virulence_record_${index + 1}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const [visibleProteinRows, setVisibleProteinRows] = useState({});

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
  
  const translateDNAtoProtein = (dna) => {
    if (!dna) return '';
    const sequence = dna.toUpperCase().replace(/[^ATCG]/g, '');
    let protein = [];
    for (let i = 0; i < sequence.length - 2; i += 3) {
      const codon = sequence.slice(i, i + 3);
      const amino = geneticCode[codon] || '?';
      protein.push(amino);
    }
    return protein.join(' - '); 
  };
  

  const toggleProtein = (index) => {
    setVisibleProteinRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  
  
  return (
    <ListContainer>
      <Title>{label}</Title>
      <TotalText>
        {t("virulenceList.total")}: {filterdata.length}
      </TotalText>
      {filterdata.map((item, index) => (
        <RecordContainer key={index}>
          <RecordGrid>
            <RecordField><strong>{t("virulenceList.fields.index")}:</strong> {index + 1}</RecordField>
            <RecordField><strong>{t("virulenceList.fields.sequence")}:</strong> {item.sequence}</RecordField>
            <RecordField><strong>{t("virulenceList.fields.gene")}:</strong> {item.gene}</RecordField>
            <RecordField><strong>{t("virulenceList.fields.start")}:</strong> {item.start}</RecordField>
            <RecordField><strong>{t("virulenceList.fields.stop")}:</strong> {item.stop}</RecordField>
            <RecordField><strong>{t("virulenceList.fields.strand")}:</strong> {item.strand}</RecordField>
            <RecordField><strong>{t("virulenceList.fields.identity")}:</strong> {item.identity}</RecordField>
            <RecordField><strong>{t("virulenceList.fields.coverage")}:</strong> {item.coverage}</RecordField>
            <RecordField><strong>{t("virulenceList.fields.accession")}:</strong> {item.accession}</RecordField>
            <RecordField><strong>{t("virulenceList.fields.description")}:</strong> {item.description || "N/A"}</RecordField>
            <RecordField><strong>{t("virulenceList.fields.group")}:</strong> {item.group || "N/A"}</RecordField>
            <RecordField><strong>{t("virulenceList.fields.vfdb_id")}:</strong> {item.vfdb_id || "N/A"}</RecordField>
            <RecordField><strong>{t("virulenceList.fields.function_group")}:</strong> {item.function_group || "N/A"}</RecordField>
            <RecordField><strong>{t("virulenceList.fields.function_group_id")}:</strong> {item.function_group_id || "N/A"}</RecordField>

            <FullWidthField>
              <strong>{t("virulenceList.fields.nucleic")}:</strong>
              <EyeIcon onClick={() => toggleNucleic(index)}>
                {visibleRows[index] ? "🙈" : "👁️"}
              </EyeIcon>
              {visibleRows[index] && (
                <>
                  <NucleicContainer>{item.nucleic || "N/A"}</NucleicContainer>

                  <strong style={{ display: 'block', marginTop: 8 }}>
                    {t("virulenceList.fields.protein")}:
                    <EyeIcon onClick={() => toggleProtein(index)}>
                      {visibleProteinRows[index] ? "🙈" : "👁️"}
                    </EyeIcon>
                  </strong>

                  {visibleProteinRows[index] && (
                    <NucleicContainer>
                      {translateDNAtoProtein(item.nucleic)}
                    </NucleicContainer>
                  )}
                </>
              )}
            </FullWidthField>
          </RecordGrid>
          <DownloadButton onClick={() => downloadCSV(item, index)}>
            {t("virulenceList.download_csv")}
          </DownloadButton>
        </RecordContainer>
      ))}
    </ListContainer>
  );
};

export default VirulenceListResult;
