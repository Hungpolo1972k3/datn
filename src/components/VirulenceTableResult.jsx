import React, { useState } from "react";
import styled from "styled-components";

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
  const [visibleRows, setVisibleRows] = useState({});

  const groups = {
    "Nucleoid (DNA) (Vùng nhân - DNA)": ["Quorom sensing", "T6SS"],
    "Ribosomes (Ribosome)": ["Capsule", "Phospholipase C"],
    "Cytoplasm (Tế bào chất)": ["LPS", "HemO cluster"],
    "Plasmid (Plasmid)": ["TFP", "T2SS"],
    "Pili (Pili)": ["PbpG", "Acinetobactin"],
    "Inclusion Bodies (Thể vùi)": ["Csu fimbriae", "Phospholipase D"],
    "Flagellum (Lông roi)": ["PNAG", "Bap"],
    "Cytoplasmic Membrane (Màng tế bào chất)": ["BfmRS", "AdeFGH efflux pump"],
    "Cell Wall (Màng tế bào)": ["OmpA"]
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
    const fields = [
      ["Index", index + 1],
      ["Sequence", item.sequence],
      ["Gene", item.gene],
      ["Start", item.start],
      ["Stop", item.stop],
      ["Strand", item.strand],
      ["Identity", item.identity],
      ["Coverage", item.coverage],
      ["Accession", item.accession],
      ["Description", item.description || "N/A"],
      ["Group", item.group || "N/A"],
      ["VFDB ID", item.vfdb_id || "N/A"],
      ["Function Group", item.function_group || "N/A"],
      ["Function Group ID", item.function_group_id || "N/A"],
      ["Nucleic", item.nucleic || "N/A"],
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

  return (
    <ListContainer>
      <Title>{label}</Title>
      <TotalText>Tổng số bản ghi: {filterdata.length}</TotalText>
      {filterdata.map((item, index) => (
        <RecordContainer key={index}>
          <RecordGrid>
            <RecordField><strong>Index (Số thứ tự):</strong> {index + 1}</RecordField>
            <RecordField><strong>Sequence (Chuỗi):</strong> {item.sequence}</RecordField>
            <RecordField><strong>Gene (Gen):</strong> {item.gene}</RecordField>
            <RecordField><strong>Start (Vị trí bắt đầu):</strong> {item.start}</RecordField>
            <RecordField><strong>Stop (Vị trí kết thúc):</strong> {item.stop}</RecordField>
            <RecordField><strong>Strand (Chuỗi):</strong> {item.strand}</RecordField>
            <RecordField><strong>Identity (%) (Độ giống nhau):</strong> {item.identity}</RecordField>
            <RecordField><strong>Coverage (%) (Độ phủ):</strong> {item.coverage}</RecordField>
            <RecordField><strong>Accession (Mã truy xuất):</strong> {item.accession}</RecordField>
            <RecordField><strong>Description (Mô tả):</strong> {item.description || "N/A"}</RecordField>
            <RecordField><strong>Group (Nhóm):</strong> {item.group || "N/A"}</RecordField>
            <RecordField><strong>VFDB ID (Mã VFDB):</strong> {item.vfdb_id || "N/A"}</RecordField>
            <RecordField><strong>Function Group (Nhóm chức năng):</strong> {item.function_group || "N/A"}</RecordField>
            <RecordField><strong>Function Group ID (Mã nhóm chức năng):</strong> {item.function_group_id || "N/A"}</RecordField>

            <FullWidthField>
              <strong>Nucleic (Trình tự nucleic):</strong>
              <EyeIcon onClick={() => toggleNucleic(index)}>
                {visibleRows[index] ? "🙈" : "👁️"}
              </EyeIcon>
              {visibleRows[index] && (
                <NucleicContainer>{item.nucleic || "N/A"}</NucleicContainer>
              )}
            </FullWidthField>

            <FullWidthField>
              <DownloadButton onClick={() => downloadCSV(item, index)}>
                Tải xuống CSV
              </DownloadButton>
            </FullWidthField>
          </RecordGrid>
        </RecordContainer>
      ))}
    </ListContainer>
  );
};

export default VirulenceListResult;
